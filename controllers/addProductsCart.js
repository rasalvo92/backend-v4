const Cart = require('../models/cart');
const Product = require('../models/product');

// Destructuring
const addProductCart = async (req, res) => {
  const { name, img, price } = req.body;

  // Si existe el producto:
  const findProduct = await Product.findOne({ name });

  // Si los valores no están vacíos
  const infoProduct = name !== "" && img !== "" && price !== "";

  // Si está en el carrito:
  const findProductCart = await Cart.findOne({ name });

  if (!findProduct) {
    res.status(400).json({
      message: 'Producto no encontrado',
    });
  } else if (infoProduct && !findProductCart) {
    const newProductCart = new Cart({ name, img, price, amount: 1 });

    // Actualizar propiedades del carrito
    await Product.findByIdAndUpdate(findProductCart?._id, { inCart: true, name, img, price }, { new: true })
      .then((product) => {
        newProductCart.save();
        res.json({
          message: 'Producto agregado al carrito exitosamente',
          product,
        });
      })
      .catch((error) => console.error(error));
  } else if (findProductCart) {
    res.status(400).json({
      message: 'Producto ya se encuentra en el carrito',
    });
  }
};

module.exports = addProductCart;
