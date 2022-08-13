const authModel = require("../model/auth");
const articlesModel = require("../model/articles");
const authHistoryModel = require("../model/authHistory");

async function getUsers(req, res) {
  const id = req.decode.id;
  try {
    const auth = await authModel.findById({ _id: id });
    if (auth) {
      return res.status(200).json({ data: auth });
    } else {
      return res.status(404).json({ message: "Terjadi Kesalahan" });
    }
  } catch (error) {
    return res.status(404).json({ message: "Terjadi Kesalahan" });
  }
}

async function getArticlesByUsers(req, res) {
  const id = req.decode.id;
  const sort = req.query.sort || -1;

  // pagination
  const limit = parseInt(req.query.limit) || 5;
  const page = parseInt(req.query.page) || 1;

  const articles = await articlesModel
    .find({ authourId: id })
    .sort({ createdAt: sort });

  const startPage = (page - 1) * limit;
  const endPage = page * limit;

  const pagination = {
    current_page: page,
    total_page: articles.length,
    from_page: page,
    to_page: endPage > articles.length ? articles.length : endPage,
  };

  if (endPage < articles.length) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startPage > 0) {
    pagination.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  try {
    if (articles.length === 0) {
      return res.status(404).json({ message: "Tidak ada data tersedia" });
    } else {
      return res.status(200).json({
        data: articles.slice(startPage, endPage),
        pagination,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: "Terjadi Kesalahan" });
  }
}

async function getArticlesTrends(req, res) {
  const filter = req.query.filter;
  const id = req.decode.id;
  try {
    const articles = await articlesModel
      .find({ authourId: id })
      .sort({ [filter]: -1 });
    return res.status(200).json({ data: articles });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi Kesalahan" });
  }
}

async function getHistoryLogin(req, res) {
  const id = req.decode.id;
  try {
    const login = await authHistoryModel
      .find({ authId: id })
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: login });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi Kesalahan" });
  }
}

module.exports = {
  getUsers,
  getArticlesByUsers,
  getArticlesTrends,
  getHistoryLogin,
};
