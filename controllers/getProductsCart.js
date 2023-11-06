const Cart = require ('../models/cart');

const getProductsCart = async (req, res) => {
    const productsCart = await Cart.find();
    
    if(productsCart) {
        res.json({productsCart});
    }else{
        res.json({message:'No hay productos en el carrito'});
    }
};

module.exports = getProductsCart;