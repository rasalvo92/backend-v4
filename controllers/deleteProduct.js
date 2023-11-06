const Cart = require ('../models/cart');
const Product = require ('../models/product');

const deleteProduct = async (req, res) => {
    const {productId} = req.params;

    //Producto en carrito? :
    const productInCart = await Cart.findById(productId);

    //Producto en DB x .name in cart :
    const {name, img, price, _id} = await Product.findOne({
        name: productInCart.name
    });

    //Search y Del prod x id:
    await Cart.findByIdAndDelete(productId);

    await Product.findByIdAndUpdate(
        _id,
        {inCart: false, name, img, price},
        {new:true}
    )
    .then((product) => {
        res.json({message:`El producto ${product.name} fue eliminado correctamente`});
    })
    .catch((error) => res.json({message:'Hubo un error al eliminar'}));
};

module.exports = deleteProduct;
