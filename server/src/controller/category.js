const { validationResult } = require("express-validator");
// model
const categoryModel = require("../model/category");

async function addCategory(req, res) {
  const category = req.body.category;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ validation: errors.mapped() });
  }

  const categoryExist = await categoryModel.findOne({ category });
  if (categoryExist) {
    return res
      .status(422)
      .json({ message: `Kategori ${category} sudah tersedia` });
  }

  try {
    await new categoryModel({
      category,
    }).save();
    return res
      .status(200)
      .json({ message: `${category} berhasil ditambahkan` });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi Kesalahan" });
  }
}

async function getCategory(req, res) {
  const category = await categoryModel.find({}).sort({ category: 1 });
  try {
    return res.status(200).json({ data: category });
  } catch (error) {
    res.status(500).json({ message: "Terjadi Kesalahan" });
  }
}

async function detailCategory(req, res) {
  try {
    const category = await categoryModel.findById({ _id: req.params.id });
    if (!category) {
      return res.status(404).json({ message: "Kategori tidak tersedia" });
    } else {
      return res.status(200).json({ data: category });
    }
  } catch (error) {
    return res.status(500).json({ message: "Terjadi Kesalahan" });
  }
}

async function updateCategory(req, res) {
  const id = req.params.id;
  const category = req.body.category;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ validation: errors.mapped() });
  }

  try {
    const categoryExist = await categoryModel.findOne({ _id: id });
    if (categoryExist) {
      await categoryModel.findByIdAndUpdate(
        { _id: categoryExist._id },
        {
          category,
        },
        { new: true }
      );
      return res.status(200).json({ message: `Berhasil mengubah data` });
    } else {
      return res.status(404).json({ message: "Kategori tidak tersedia" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi Kesalahan" });
  }
}

async function deleteCategory(req, res) {
  try {
    const category = await categoryModel.findById({ _id: req.params.id });
    if (!category) {
      return res.status(404).json({ message: "Kategori tidak tersedia" });
    } else {
      await categoryModel.findByIdAndDelete({ _id: req.params.id });
      return res
        .status(200)
        .json({ message: `Topik ${category.category} berhasil dihapus` });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi Kesalahan" });
  }
}

module.exports = {
  addCategory,
  getCategory,
  updateCategory,
  detailCategory,
  deleteCategory,
};
