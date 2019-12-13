const $ = require("cheerio");
const rp = require("request-promise");
const session = require('express-session');
const express = require("express");
const app = express();

const expressLayouts = require("express-ejs-layouts");

const flash = require('connect-flash');

// EJS middleware

app.use(expressLayouts);

// we need to set ejs view engine

app.set("view engine", "ejs");

// body parser to read the data from front end

app.use(express.urlencoded({ extended: false }));


// express session middleware

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
     
  }));

// using flash //middleware

app.use(flash());
// our own middleware to handle errors//global variables

app.use( (req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})




// Routes //

app.use('/', require('./routes/index'));
// app.use('/tweets', require('./routes/tweets'));

 

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started and listening at ${PORT}`));
