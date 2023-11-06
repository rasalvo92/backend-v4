const Product = require ('../models/product');

const getProducts = async (req, res) => {
    const products = await Product.find();
    
    if(products) {
        res.json({products});
    }else{
        res.json({message:'No hay productos'});
    }
};

module.exports = getProducts;