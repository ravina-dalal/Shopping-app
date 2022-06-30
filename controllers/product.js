
const Product=require('../models/product');

module.exports.showAllProducts=async(req,res)=>{

    try{
        const products=await Product.find({});
        res.render('products/index',{products});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
   
}


module.exports.productForm=(req,res)=>{

    try{
        res.render('products/new');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
   
}

module.exports.createProduct=async(req,res)=>{

    try{
        const {name,img,price,desc}=req.body;
        await Product.create({name,img,price:parseFloat(price),desc,author:req.user._id});
        req.flash('success','Added your product successfully!');
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
   
}

module.exports.showProduct=async(req,res)=>{

    try{
        const {id}=req.params;
        const product=await Product.findById(id).populate('reviews');
        res.render('products/show',{product});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
   

}

module.exports.editProductForm=async(req,res)=>{

    try{
        const {id}=req.params;
        const product=await Product.findById(id);
        res.render('products/edit',{product});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
    

}

module.exports.updateProduct=async(req,res)=>{

    try{
        const {id}=req.params;
        const {name,img,price,desc}=req.body;

        req.flash('success','Edit your product successfully!');
        await Product.findByIdAndUpdate(id,{name,img,price,desc})
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
}

module.exports.deleteProduct=async(req,res)=>{

    try{
        const {id}=req.params;
    
        await Product.findByIdAndDelete(id);
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
}