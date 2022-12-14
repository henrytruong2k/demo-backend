import Product from "../models/productModel.js";

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      return res.status(200).json({ products });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getProduct: async (req, res) => {
    try {
      console.log(req.params.slug);
      const product = await Product.findOne({ slug: req.params.slug });
      if (!product) {
        return res.status(404).json({ msg: "Sản phẩm này không tồn tại" });
      }
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addProduct: async (req, res) => {
    try {
      const { title, image, price, description, countInStock } = req.body;

      const newProduct = new Product({
        title,
        image,
        price,
        description,
        countInStock,
      });
      await newProduct.save();

      return res.status(200).json(newProduct);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default productCtrl;
