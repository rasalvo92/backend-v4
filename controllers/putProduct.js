const Cart = require ('../models/cart');
const { search } = require('../routes/products');

const putProduct = async (req, res) => {
    const {productId} = req.params;
    const {query} = req.query;
    const body = req.body;

    //Buscar Prod en Cart
    const searchProduct = await Cart.findById(productId);

    //Si no hay consulta 'add' o 'del':
    if (!query) {
        res.status(404).json({message:'Falta enviar Consulta'});

        //Producto en Carrito y quiero add:
    }else if
        (searchProduct && query === 'add') {
            body.amount = body.amount +1;
        
            await Cart.findByIdAndUpdate(productId, body, {
                new:true,
            })
            .then((product) => {
                res.json({message:`El producto ${product.name} ha sido actualizado`,
                product
            });
        });
    }
    //Sacar prod de Cart:
    else if (searchProduct && query === 'del') {
        body.amount = body.amount -1;

        await Cart.findByIdAndUpdate(productId, body, {
            new:true,
        })
        .then((product) => 
            res.json({message:'El producto ${product.name} ha sido actualizado', product})
        );
    }else {
        res.status(400).json({message:'Ocurri[o un error'});
    }
};

module.exports = putProduct;
