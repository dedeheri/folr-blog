// model
const articlesModel = require("../model/articles");
const categoryModel = require("../model/category");
const authModel = require("../model/auth");
const visitorModel = require("../model/visitor");
// utils
const deletedImage = require("../utils/deleteImage");
const { validationResult } = require("express-validator");

// library
const shortId = require("shortid");

async function addArticles(req, res) {
  const id = req.decode.id;
  const title = req.body.title;
  const description = req.body.description;
  const hastag = req.body.hastag;
  const category = req.body.category;
  const reference = req.body.reference;
  const imageUrlCredit = req.body.imageUrlCredit;
  const imageUrl = req.file;

  // validasi
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (imageUrl) deletedImage(imageUrl?.path);
    return res.status(422).json({ validation: errors.mapped() });
  }

  try {
    await new articlesModel({
      authourId: id,
      title,
      description,
      reference,
      category,
      hastag,
      imageUrlCredit,
      imageUrl: imageUrl?.path,
    }).save();

    return res
      .status(200)
      .json({ message: `Artikel ${title} berhasil di tambahkan` });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi Kesalahan" });
  }
}

async function articles(req, res) {
  const filter = req.query.filter;
  const category = req.query.category;
  const limit = parseInt(req.query.limit) || 2;

  try {
    const results = [];
    const articles = await articlesModel.find({}).sort({ createdAt: -1 });
    for (let i = 0; i < articles.length; i++) {
      const auth = await authModel.findById({ _id: articles[i].authourId });
      results.push({
        _id: articles[i]._id,
        title: articles[i].title,
        imageUrl: articles[i].imageUrl,
        imageUrlCredit: articles[i].imageUrlCredit,
        authour: {
          email: auth?.email,
          fullName: auth?.fullName,
          imageUrl: auth?.imageUrl,
          role: auth?.role,
        },
        description: articles[i].description,
        category: articles[i].category,
        like: articles[i].like,
        dislike: articles[i].dislike,
        view: articles[i].view,
        reference: articles[i].reference,
        hastag: articles[i].hastag,
        published: articles[i].published,
        createdAt: articles[i].createdAt,
        updatedAt: articles[i].updatedAt,
      });
    }

    if (category) {
      const t = results.filter((i) => {
        return i.category.toLowerCase().includes(category.toLowerCase());
      });

      return res.status(200).json({
        data: t.slice(0, limit),
        hashMore: results.length >= limit ? true : false,
      });
    } else if (filter) {
      const articles = await articlesModel.find({}).sort({ [filter]: -1 });
      return res.status(200).json({ data: articles });
    } else {
      return res.status(200).json({
        data: results.slice(0, limit),
        lastData: results.slice(0, limit).length + 1,
        hashMore: results.length >= limit ? true : false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan" });
  }
}

async function articlesTrends(req, res) {
  const filter = req.query.filter;

  let sort = {};
  if (filter === "like") {
    sort.like = -1;
  } else if (filter === "dislike") {
    sort.dislike = -1;
  } else if (filter === "view") {
    sort.view = -1;
  } else if ((sort.view = -1)) console.log(sort);

  try {
    const articles = await articlesModel.find({}).sort(sort);
    return res.status(200).json({ data: articles });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi Kesalahan" });
  }
}

async function articlesSearch(req, res) {
  const searchTerm = req.body.searchTerm;

  try {
    if (searchTerm) {
      const articles = await articlesModel.find({
        title: new RegExp(searchTerm, "i"),
      });
      const category = await categoryModel.find({
        category: new RegExp(searchTerm, "i"),
      });
      res.status(200).json({ articles: articles, category: category });
    } else {
      return res
        .status(404)
        .json({ message: "Ketikan sesuatu untuk pencarian" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Terjadi Kesalahan" });
  }
}

async function FeaturedArticles(req, res) {
  const articles = await articlesModel.find({});

  try {
    const articlesCount = articles.length;

    const view = [];
    const like = [];
    const dislike = [];
    for (let i in articles) {
      view.push(articles[i].view);
      like.push(articles[i].like);
      dislike.push(articles[i].dislike);
    }

    function reduceCount(props) {
      return props.reduce((prev, cur) => prev + cur, 0);
    }

    return res.status(200).json({
      data: {
        articles: articlesCount,
        view: reduceCount(view),
        like: reduceCount(like),
        dislike: reduceCount(dislike),
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi Kesalahan" });
  }
}

async function detailArticles(req, res) {
  const id = req.params.id;
  try {
    const articles = await articlesModel.findOne({ _id: id });

    if (!articles) {
      return res.status(404).json({ message: "Artikel tidak tersedia" });
    } else {
      if (req.cookies.visitorId === undefined) {
        const visitId = shortId.generate();
        res.cookie("visitorId", visitId);

        // push visitor history
        const visitor = await visitorModel({
          visitorId: visitId,
        }).save();

        await visitorModel.updateOne(
          { visitorId: visitor.visitorId },
          { $push: { articlesId: articles._id } }
        );

        // +1 view
        await articlesModel.findByIdAndUpdate(
          { _id: articles._id },
          { view: articles.view + 1 },
          { new: true }
        );
      } else {
        const visitCount = await visitorModel.findOne({
          visitorId: req.cookies.visitorId,
        });

        if (!visitCount) {
          const visitor = await visitorModel({
            visitorId: req.cookies.visitorId,
          }).save();

          await visitorModel.updateOne(
            { visitorId: visitor.visitorId },
            { $push: { articlesId: articles._id } }
          );

          await articlesModel.findByIdAndUpdate(
            { _id: articles._id },
            { view: articles.view + 1 },
            { new: true }
          );
        } else {
          const filterView = visitCount?.articlesId?.filter(
            (_) => _ === articles._id
          );
          if (filterView?.length === 0) {
            await visitorModel.updateOne(
              { visitorId: req.cookies.visitorId },
              { $push: { articlesId: articles._id } }
            );

            await articlesModel.findByIdAndUpdate(
              { _id: articles._id },
              { view: articles.view + 1 },
              { new: true }
            );
          }
        }
      }

      const articlesAfterCount = await articlesModel
        .findOne({ _id: articles._id })
        .sort({ createdAt: -1 });

      const authour = await authModel.findById({
        _id: articlesAfterCount.authourId,
      });

      const results = {
        authour: {
          fullName: authour.fullName,
          email: authour.email,
          imageUrl: authour.imageUrl,
        },
        _id: articlesAfterCount._id,
        title: articlesAfterCount.title,
        category: articlesAfterCount.category,
        dislike: articlesAfterCount.dislike,
        like: articlesAfterCount.like,
        view: articlesAfterCount.view,
        hastag: articlesAfterCount.hastag,
        imageUrl: articlesAfterCount.imageUrl,
        imageUrlCredit: articlesAfterCount.imageUrlCredit,
        published: articlesAfterCount.published,
        reference: articlesAfterCount.reference,
        description: articlesAfterCount.description,
        description: articlesAfterCount.description,
        updatedAt: articlesAfterCount.updatedAt,
        createdAt: articlesAfterCount.createdAt,
      };

      return res.status(200).json({ data: results });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan" });
  }
}

async function deleteArticles(req, res) {
  const id = req.params.id;

  try {
    const articles = await articlesModel.findById({ _id: id });
    if (!articles) {
      return res.status(404).json({ message: "Data tidak dapat ditemukan" });
    } else {
      deletedImage(articles?.imageUrl);

      await articlesModel.findByIdAndDelete(
        { _id: articles._id },
        { new: true }
      );

      return res
        .status(404)
        .json({ message: `Artikel ${articles.title} berhasil di hapus` });
    }
  } catch (error) {
    return res.status(500).json({ message: "Data tidak dapat ditemukan" });
  }
}

async function updateArticles(req, res) {
  const id = req.params.id;

  const title = req.body.title;
  const description = req.body.description;
  const topics = req.body.topics;
  const imageUrl = req.file;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (imageUrl) deletedImage(imageUrl?.path);
    return res.status(422).json({ validation: errors.mapped() });
  }

  const articlesExist = await articlesModel.findById({ _id: id });

  if (!articlesExist) {
    if (imageUrl) deletedImage(imageUrl?.path);
    return res.status(404).json({ message: "Artikel tidak tersedia" });
  }

  function deleteDuplicateImage() {
    if (imageUrl) {
      const image = imageUrl?.path;
      deletedImage(articlesExist.imageUrl);
      return image;
    } else {
      return imageUrl?.path;
    }
  }

  try {
    await articlesModel.findByIdAndUpdate(
      { _id: id },
      { title, description, topics, imageUrl: deleteDuplicateImage() },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: `Artikel ${articlesExist.title} berhasil di ubah` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan" });
  }
}

module.exports = {
  addArticles,
  articles,
  detailArticles,
  deleteArticles,
  updateArticles,
  articlesTrends,
  articlesSearch,
  FeaturedArticles,
};
