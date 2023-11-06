const mongoose = require ('mongoose');
const {model, Schema} = require ('mongoose');


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default:0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true 
    },
    countInStock: {
        type: Number,
        required: true,
        min:0,
        max:300,
    }
});



//Virtuals para sacarle el _ al _id:
productSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
// virtuals options:
productSchema.set('toJSON', {
    virtuals:true
});



//Exportando el 'product' mismo:  (importar con {ej:product})
exports.Product = mongoose.model('Product', productSchema);






// search *** schema-type-OPTIONS *** https://www.mongodb.com/docs/atlas/app-services/schemas/types/


// const Product = mongoose.model('Product', productSchema);

// const productSchema = mongoose.Schema({
//     name: String,
//     category: String, //category?
//     price: Number,
//     countInStock: {
//         type: Number,
//         required: true
//     }
// });
// obteniendo/check error: 
//countInStock: {
//     type: Number,
//     required: true
// };

//category: podr[ia hacerla {req: false.} 
