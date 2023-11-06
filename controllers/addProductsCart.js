const Cart = require('../models/cart');
const Product = require ('../models/product');

//destructuring
const addProductCart = async (req, res) => {
    const {name, img, price} = req.body;

    //Si existe el prod:
    const findProduct = await Product.findOne({name});

    //Values Not empty 
    const infoProduct = name !== "" && img !== "" && price !== "";

    //Si esta en el cart:
    const findProductCart = await Cart.findOne({name});

    //Si no esta:
    if(!findProduct) {
        res.status(400).json({
            message:'Producto no encontrado'
        });
    }
    else if (infoProduct && !findProductCart) {
        const newProductCart = new Cart ({name, img, price, amount: 1});
    
        //Refresh Carrito props: true productos-*
        await Product.findByIdAndUpdate(
        findProductCart?._id,
        {inCart: true, name, img, price},
        {new: true}
        )
    .then((product) => {
        newProductCart.save();
        res.json({message:'Producto agregado al carrito exitosamente',
        product,
        });
    })
    .catch((error) => console.error(error));
    }
    else if (estaEnElCarrito){
        res.status(400).json({
            message: 'Producto ya se encuentra en el carrito'
        });
    }
};