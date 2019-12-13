const express = require('express');
const router = express.Router();
 const $ = require("cheerio");
const rp = require("request-promise");
 
var inputURL, tweetsScrapped;


// to show any msg on home page
// router.get('/', (req, res) => {
//     res.send('Welcome');
// })


// to render anything from the views folder
 
router.get('/', (req, res) => res.render('welcome', {inputURL, tweetsScrapped }));

 
// submit tweets button
router.post("/", (req, res) => {
  var { inputURL } = req.body;
  console.log(inputURL);

  if (inputURL.includes("https://twitter.com/")) {
  
  console.log("inputURL is Valid: " + inputURL);

    rp(inputURL)
      .then(response => {


        tweetsScrapped = $(".js-tweet-text-container", response)
          .text()
          .trim()
          .replace(/\s\s+/g, "\n\n");

        console.log("tweets scrapped... Succesfully!!");

        if (tweetsScrapped == '') {

          req.flash("error_msg", "Oops, looks like the account doesn't exist or it has no tweets, kindly check the twitter account");
          res.redirect("/");          
        } else {
          res.render("welcome", { inputURL, tweetsScrapped });

        }

      })
      .catch(err => {
        // console.log(err);
        req.flash("error_msg", "Oops, looks like the account doesn't exist or it has no tweets, kindly check the twitter account");
        res.status(301).redirect('/');
        // res.redirect( inputURL , "/"); 
        // res.render("welcome", { inputURL, tweetsScrapped });
      });
  } else {
    console.log("inputURL is not Valid: " + inputURL);
    req.flash("error_msg", "Please enter a valid twitter account URL");
    res.redirect("/");
  }
   console.log('inputURL is: ' + inputURL);
});

 

module.exports = router;