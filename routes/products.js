const {Product} = require ('../models/product');
const {Category} = require ('../models/category');
const express = require ('express');
const router = express.Router();
const mongoose = require ('mongoose');
//const multer = require ('multer');



//ProductList *filtrar por cat / Query Parameters:                                                                 (Sin: `${api}/product  xq se puede interpretar como un .children)
router.get('/', async (req, res) => {
    // localhost:4000/api/v1/products?categories=123123131,1231313
    let filter = {};                                                                            //si esta vacio muestra todos los prod
    if(req.query.categories){
        const filter = {category: req.query.categories.split(',')}
    }  
    
    const productList = await Product.find(filter).populate('category');
    //const productList = await Product.find({category: filter}).select('name price -_id');     //mongoose sabe qe esos valores de 'ID' tienen que estar en la cat

    if(!productList){
        res.status(500).json({success: false})
    }
    res.send(productList);
});         //(err) definir prodlist
    


//Producto x id  '/:xy' url parameter-*
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');

    if(!product){
        res.status(500).json({success: false})
    }
    res.send(product);
}); 

    

// Post REQ  req.body para enviar al body.frontend  
router.post('/', async (req, res) => {
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Categor[ia inv[alida')


    let product = new Product ({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    product = await product.save();  //new Product creado dps de guardar
    
    if(!product)
    return res.status(500).send('Producto no puede ser creado')

    res.send(product);
});



//Update Prod
router.put('/:id', async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('ID de Producto Inv[alido')
    }
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Categor[ia inv[alida')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            image: req.body.image,
            countInStock: req.body.countInStock
        },
        {new: true}
    )
    if(!product)
    return res.status(500).send('Producto no puede ser actualizado')

    res.send(product);
});



//Delete Product
router.delete('/:id', (req,res) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        if(product) {
            return res.status(200).json({success: true, message: 'Producto eliminado.'});
            } else {
                return res.status(404).json({success:false, message: 'Producto No Encontrado'})
            }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err})
    })
});



//mongooose++ para todo>
router.get(`/get/count`, async (req, res)=>{
    const productCount = await Product.countDocuments((count) => count)

    if(!productCount) {
        res.status(500).json({success: false})
    }
    res.send({
        productCount: productCount 
    })
});



//exportando el m[odulo]
module.exports = router;



//GEt Request
// const product = {
//     id:1, (no, mongoose)
//     name:"oficio",
//     category: String, Category
//     price: Number,
//     image:'imagen_url',
// }


