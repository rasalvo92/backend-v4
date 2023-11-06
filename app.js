const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const path = require('path');
const app = express();
const cors = require('cors'); //permitir http req de cualquier origen

const controllers = require('./controllers');


//.env
require('dotenv/config');
const api = process.env.API_URL;


const productsRouter = require('./routes/products');

//Cors:  *-HTTP options Method-*
app.use(cors());
app.options('*', cors);

//middleware controlar los req res 
app.use(bodyParser.json());
app.use(morgan('tiny'));



//Routes
app.use(`${api}/products`, productsRouter)


//const Product = require ('/models/product.js');



//fixed: Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
mongoose.connect(process.env.CONNECTION_STRING, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // dbName: 'webstoredb'
})
.then(() => {
    console.log('db conexion lista');
})
.catch(err => {
    console.log(err)
});



app.listen(4040, () => {
    console.log(api);
    console.log('server funcionando en http://localhost:4040/');
}); 



//Carrito
//Get
app.get('/products', controllers.getProducts);
app.get('/products-cart', controllers.getProductsCart);

//Post
app.post('/products-cart', controllers.addProductsCart);

//Put
app.put('products-cart/:productId', controllers.putProduct)

//Delete
app.delete('/products-cart/:productId', controllers.deleteProduct);




// Http method options ==> '*' 
// The HTTP OPTIONS method requests permitted communication options for a given URL or server. A client can specify a URL with this method, or an asterisk (*) to refer to the entire server.


// //Config  *servicio de la nube ooo  port '3000'
// app.set ('port', process.env.PORT || 3000);

// //Middlewares
// app.use(morgan('dev'));
// app.use(express.json());    

// //Routes
// app.use('/', require('./routes/tareas-routes'));

// //Static Files
// app.use(express.static(path.join(__dirname, 'public')));

// //Starting Server
// app.listen(app.get('port'), () => {
//     console.log(`Server funcionando en el puerto ${app.get('port')}`);
// });

// mongoose
//     .connect('mongodb+srv://salvo92:salvo92@cluster0.455lqzc.mongodb.net/?retryWrites=true&w=majority')
//     .then(() =>{
//         app.listen(3000);
//     })
//     .catch(err => {
//         console.log(err)
//     });