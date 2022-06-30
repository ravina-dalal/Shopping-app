const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const helmet = require('helmet');
const MongoStore=require('connect-mongo');



// Routes
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes =require('./routes/cart');

// api
const productApis=require('./routes/api/productapi');



const dbUrl = process.env.dbUrl || 'mongodb://localhost:27017/shopping-app'

mongoose.connect(dbUrl)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(helmet({contentSecurityPolicy:false}));

const store=MongoStore.create({
    secret:'weneedsomebettersecret',
    mongoUrl:dbUrl,
    touchAfter:24*60*60,
})


const sessionConfig = {
    store,
    secret: 'weneedsomebettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000* 60 * 60 * 24 * 7 * 1,
        maxAge:1000* 60 * 60 * 24 * 7 * 1
    }
}

app.use(session(sessionConfig));
app.use(flash());


// Initialising middleware for passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Telling the passport to check for username and password using authenticate method provided by the passport-local-mongoose package
passport.use(new LocalStrategy(User.authenticate())); 

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})






app.get('/',(req,res)=>{
    res.render('home');
});


app.use('/products',productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(productApis);
app.use(cartRoutes);

app.all('*',(req,res)=>{
    res.render('error',{err:'wrong url'})
})


const port = 5000;

app.listen(port, () => {
    console.log(`server running at port ${port}`);
});