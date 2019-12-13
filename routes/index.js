const express = require('express');
const router = express.Router();
// const {inputURL, tweetsScrapped} = require('./tweets');

const $ = require("cheerio");
const rp = require("request-promise");
 
var inputURL, tweetsScrapped;


// to show any msg on home page
// router.get('/', (req, res) => {
//     res.send('Welcome');
// })


// to render anything from the views folder

console.log('inputURL is: ' + inputURL);

router.get('/', (req, res) => res.render('welcome'));



router.get('/tweets', (req, res) => res.render('tweets', {inputURL, tweetsScrapped }));



// submit tweets button
router.post("/tweets", (req, res) => {
  var { inputURL } = req.body;
  console.log(inputURL);

  if (inputURL.includes("https://twitter.com/")) {
  //  alert('...Tweets...loading... !!!');
  console.log("inputURL is Valid: " + inputURL);

    rp(inputURL)
      .then(response => {


        tweetsScrapped = $(".js-tweet-text-container", response)
          .text()
          .trim()
          .replace(/\s\s+/g, "\n\n");

        console.log("tweets scrapped... Succesfully!!");

        res.render("tweets", { inputURL, tweetsScrapped });
      })
      .catch(err => {
        console.log(err);

        res.render("welcome", { inputURL, tweetsScrapped });
      });
  } else {
    console.log("inputURL is not Valid: " + inputURL);
    req.flash("error_msg", "Please enter a valid twitter account URL");
    res.redirect("/");
  }
   console.log('inputURL is: ' + inputURL);
});

 

module.exports = router;