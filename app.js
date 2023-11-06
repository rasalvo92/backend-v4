const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const controllers = require('./controllers');

//.env
require('dotenv/config');
//dotenv.config();
const api = process.env.API_URL;


const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Routes:
app.use(`${api}/products`, productsRouter);

// Mongoose:
mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: 'webstoredb'
})

.then(() => {
    console.log('Conexión a la base de datos exitosa');
})
.catch(err => {
    console.error('Error en la conexión a la base de datos:', err);
});

app.listen(4040, () => {
    console.log(api);
    console.log('Servidor funcionando en http://localhost:4040/');
});

// Carrito Routes:
app.get('/products', controllers.getProducts);
app.get('/products-cart', controllers.getProductsCart);
app.post('/products-cart', controllers.addProductsCart);
app.put('/products-cart/:productId', controllers.putProduct);
app.delete('/products-cart/:productId', controllers.deleteProduct);


//app.get(`${api}/products`, controllers.getProducts);
// app.get(`${api}/products-cart`, controllers.getProductsCart);
// app.post(`${api}/products-cart`, controllers.addProductsCart);
// app.put(`${api}/products-cart/:productId`, controllers.putProduct);
// app.delete(`${api}/products-cart/:productId`, controllers.deleteProduct);



