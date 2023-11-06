const getProducts = require('./controllers/getProducts');
const getProductsCart = require('./controllers/getProductsCart');
const addProductsCart = require('./controllers/addProductsCart');
const putProduct = require('./controllers/putProduct');
const deleteProduct = require('./controllers/deleteProduct');


module.exports = {
    getProducts,
    getProductsCart,
    addProductsCart,
    putProduct,
    deleteProduct
};




