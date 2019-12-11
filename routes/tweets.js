const express = require("express");
const router = express.Router();

const $ = require("cheerio");
const rp = require("request-promise");
// var url = "https://twitter.com/ohteenquotes";
var tweetsScrapped;

//render
// router.get("/", (req, res) =>  res.render("tweets"));

// submit tweets button
router.post("/", (req, res) => {
  const { inputURL } = req.body;
  console.log(inputURL);
  //   res.send("You have entered: " + '');

  rp(inputURL)
    .then(response => {
      tweetsScrapped = $(".js-tweet-text-container", response)
        .text()
        .trim()
        .replace(/\s\s+/g, "\n\n");

      console.log("tweets scrapped... Succesfully!!");
      //   console.log(tweetsScrapped);
      //   res.send("hello tweets will load here:" + '' + tweetsScrapped);
      res.render("tweets", {inputURL, tweetsScrapped });
    })
    .catch(err => console.log(err));
});

module.exports = router;
