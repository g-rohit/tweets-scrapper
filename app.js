const $ = require("cheerio");
const rp = require("request-promise");

const express = require("express");
const app = express();

const expressLayouts = require("express-ejs-layouts");

// EJS middleware

app.use(expressLayouts);

// we need to set ejs view engine

app.set("view engine", "ejs");

// body parser to read the data from front end

app.use(express.urlencoded({ extended: false }));

// Routes //

app.use('/', require('./routes/index'));
app.use('/tweets', require('./routes/tweets'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started and listening at ${PORT}`));
