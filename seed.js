const mongoose=require('mongoose');
const Product=require('./models/product');


mongoose.connect('mongodb://localhost:27017/shopping-app')
.then(()=>console.log('DB Connect'))
.catch((err)=>console.log(err));

const products=[
    {
        name:'Iphone 11',
        img:'https://images.unsplash.com/photo-1578321311107-4804d8816b53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8aXBob25lMTF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        price:'3000',
        desc:'alien capable of taking on any form. The Thing was released on June 25, 1982, to very negative reviews'
    },
    {
        name:'Shoes',
        img:'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        price:'4000',
        desc:'alien capable of taking on any form. The Thing was released on June 25, 1982, to very negative reviews'
    },
    {
        name:'Watch',
        img:'https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHdhdGNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price:'1000',
        desc:'alien capable of taking on any form. The Thing was released on June 25, 1982, to very negative reviews'
    },
    {
        name:'Laptop',
        img:'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhcHRvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        price:'9000',
        desc:'alien capable of taking on any form. The Thing was released on June 25, 1982, to very negative reviews'
    },
];

async function seedDB(){
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Product Seed');
}
seedDB();


// Product.insertMany(products)
// .then(()=>{
//   console.log('Product Seed');
// });

