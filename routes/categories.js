const {Category} = require ('../models/category');

const express = require ('express');
const router = express.Router();


//Listado:
router.get('/', async (req, res) => {
    const categoryList = await Category.find();
    if(!categoryList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(categoryList);
});



router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    
    if(!category) {
        res.status(500).json({message: 'Categoria con ese ID incorrecta'})
    }
    res.status(200).send(category);
});



//Add Cat
router.post(`/`, async (req, res) => {
    let category = new Category({
        name: req.body.name,
        //color: req.body.color
    })
    category = await category.save();   //espero hasta que guarde la cat. y me devuelve promise con la categor[ia]

    if(!category)
    return res.status(400).send('No se puede crear la categor[ia');
    res.send(category);
});
//si hay categoria la mando, si no: err.



router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon || category.icon,
            color: req.body.color
        },
        {new: true}
    )
    if(!category)
    return res.status(400).send('Categor[a no puede ser creada')
    res.send(category);
});


                //api/v1/id
router.delete('/:id', (req,res) => {
    Category.findByIdAndRemove(req.params.id)
    .then(category => {
        if(category) {
            return res.status(200).json({success: true, message: 'Categor[ia eliminada.'});
            } else {
                return res.status(404).json({success:false, message: 'Categor[ia No Encontrada'})
            }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err})
    })
});

module.exports = router; 











// router.get('/', async (req, res) => {
//     const categoryList = await Category.find();

//     if(!categoryList) {
//         res.status(500).json({success:false})
//     }
//     res.status(200).send(categoryList);
// });

// //Cat x id:   
// router.get(':id', async (req, res) =>{
//     const category = await Category.findById(req.params.id);

//     if(!category){
//         res.status(500).json({message:'Categoria con ese ID no encontrada'})
//     }
//     res.status(200).send(category) 
// });

// //act info 
// router.put('/:id', async (req, res) => {
//     const category = await Category.findByIdAndUpdate(
//         req.params.id, {
//             name: req.body.name,
//         },
//         {new:true}
//         )
//     if(!category)
//     return res.status(400).send('Categor[ia imposible de crear')

//     res.send(category);

// });

// //Agreg Cat
// router.post('/', async (req, res) => {
//     let category = new Category({
//         name: req.body.name,
//     })
//     category = await category.save();

//     if(!category)
//     return res.status(400).send('Categor[ia imposible de crear')

//     res.send(category);
// });

// // del cat *url id   api/ /deletecategoryID   si cambio el ':id' por 'catId' por ej tmb debo de los param requeridos
// router.delete('/:id', (req, res) => {
//     Category.findByIdAndRemove(req.params.id)
//     .then(category => {
//         if(category) {
//             return res.status(200).json({success: true, message: 'Categor[ia eliminada'})
//         } else {
//             return res.status(404).json({success:false, message: 'Categor[ia no encontrada'})
//         }
//     }).catch(err =>{
//         return res.status(400).json({success:false, error: err})
//     })
// });

// module.exports = router;