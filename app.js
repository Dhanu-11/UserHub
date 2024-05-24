require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const app = express();


const session = require('express-session');
//const flash = require('express-flash-message').default;
const flash = require('connect-flash');

console.log(flash);

const port = 3000 || process.env.PORT;

//connected to database
connectDB();

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true}));

// Middleware to parse JSON data
app.use(express.json());

//Middleware Method Override for PUT or DELETE
app.use(methodOverride('_method'));

//Static Folder(public folder to hold CSS, JS, Images)
app.use(express.static('public'));


//Express Session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));


//Flash Middleware
app.use(flash({ sessionKeyName: 'express-flash-message'}))



//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./server/routes/customer'));


//
app.get('*',(req, res) => {
    res.status(404).render('404');
})

app.listen(port, ()=> {
    console.log(`App is listening on Port ${port}`)
});