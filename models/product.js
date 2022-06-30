const mongoose=require('mongoose');
const Review=require('./review');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true
    },
    img:{
        type:String,
        trim:true 
    },
    price:{
        type:Number,
        min:0,
        default:0
    },
    desc:{
        type:String,
        trim:true
    },
    avgRating: {
        type: Number,
        default:0 
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
     reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
     ]
});

ProductSchema .post('findOneAndDelete',async function(product) {
    if (product.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: product.reviews } });
    }
});


const Product= mongoose.model('Product',ProductSchema);
module.exports=Product;