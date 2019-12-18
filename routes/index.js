const express = require("express");
const router = express.Router();
// const {inputURL, tweetsScrapped} = require('./tweets');

const $ = require("cheerio");
const rp = require("request-promise");

var userinput, tweetsScrapped;


// The code is really messy :|  hopefully will refactor soon :(

// to show any msg on home page
// router.get('/', (req, res) => {
//     res.send('Welcome');
// })

// to render anything from the views folder


router.get("/", (req, res) =>
  res.render("welcome", { userinput, tweetsScrapped })
);


// submit tweets button
router.post("/", (req, res) => {
  var inputURL = "https://twitter.com/";
  var { userinput } = req.body; //this will get the user input from form
  console.log("user input is: " + userinput);

  if (
    userinput == "https://twitter.com/" ||
    userinput == "https://twitter.com" ||
    userinput == "https://mobile.twitter.com/" ||
    userinput == "https://mobile.twitter.com"
  ) {
    req.flash(
      "error_msg",
      "Kindly enter a valid twitter account username or full URL; example: adgpi or https://twitter.com/adgpi"
    );
    res.redirect("/");
    return;
  }

  if (userinput.length > 15) {
    // userinput is longer than 15 letter and
    console.log(
      "user input is: " + userinput + " and is " + userinput.length + " long"
    );
    if (userinput.includes("twitter.com")) {
      if (userinput.includes("/mobile.")) {
        console.log("userinput link is mobile link");

        inputURL = userinput.replace("/mobile.", "/");

        console.log("After cleaning mobile url, inputURL: is " + inputURL);
      } else {
        inputURL = userinput;
      }

      if (userinput.includes("/status/")) {
        console.log("user input might be a status link: " + userinput);
        // example user input url: https://mobile.twitter.com/delhichatter/status/1207377625179508737

        rp(inputURL)
          .then(response => {
            console.log("inputURL is: ");
            console.log(inputURL);

            tweetsScrapped = $(
              ".TweetTextSize.TweetTextSize--jumbo.js-tweet-text.tweet-text",
              response
            )
              .text()
              .trim()
              .replace(/\s\s+/g, "\n");

            console.log("response is: ");
            console.log("tweetsScrapped is: ");
            console.log(tweetsScrapped);

            // console.log("tweets scrapped... Succesfully!!");

            if (tweetsScrapped == "") {
              req.flash(
                "error_msg",
                "Oops, looks like the account doesn't exist or it has no tweets, kindly enter a valid twitter account username or url"
              );
              res.redirect("/");
            } else {
              console.log("inputURL is: ");
              console.log(inputURL);
              console.log("tweetsScrapped is: ");
              console.log(tweetsScrapped);

              res.render("welcome", { userinput, tweetsScrapped });
            }
          })
          .catch(err => {
            console.log(err);
            req.flash(
              "error_msg",
              "Oops, looks like the account doesn't exist or it has no tweets, kindly enter a valid twitter account username or url"
            );
            res.status(301).redirect("/");
            // res.redirect( inputURL , "/");
            // res.render("welcome", { userinput, tweetsScrapped });
          });
      } else {
        //its a valid twitter link
        console.log("user input is: " + userinput);

        // inputURL = userinput;
        rp(inputURL)
          .then(response => {
            console.log("inputURL is: ");
            console.log(inputURL);

            tweetsScrapped = $(".js-tweet-text-container", response)
              .text()
              .trim()
              .replace(/\s\s+/g, "\n\n");

            console.log("response is: ");
            // console.log(response);

            console.log("tweetsScrapped is: ");
            console.log(tweetsScrapped);

            // console.log("tweets scrapped... Succesfully!!");

            if (tweetsScrapped == "") {
              req.flash(
                "error_msg",
                "Oops, looks like the account doesn't exist or it has no tweets, kindly enter a valid twitter account username or url"
              );
              res.redirect("/");
            } else {
              console.log("inputURL is: ");

              console.log(inputURL);
              console.log("tweetsScrapped is: ");
              console.log(tweetsScrapped);

              res.render("welcome", { userinput, tweetsScrapped });
            }
          })
          .catch(err => {
            console.log(err);
            req.flash(
              "error_msg",
              "Oops, looks like the account doesn't exist or it has no tweets, kindly enter a valid twitter account username or url"
            );
            res.status(301).redirect("/");
            // res.redirect( userinput , "/");
            // res.render("welcome", { userinput, tweetsScrapped });
          });
      }
    } else {
      //its NOT a  valid twitter link and hence throw error msgs
      inputURL = userinput;

      console.log("user enterted: " + userinput);

      console.log("inputURL is not Valid: " + inputURL);
      req.flash("error_msg", "Please enter a valid twitter account URL");
      res.redirect("/");
    }
  } else {
    // input length less than 15
    // assuming its a user name
    // append with twitter link and check if profile exists or not
    // take the username and append to url
    inputURL = inputURL + userinput;
    console.log("inputURL is Valid: " + inputURL);
    rp(inputURL)
      .then(response => {
        tweetsScrapped = $(".js-tweet-text-container", response)
          .text()
          .trim();
        // // .replace(/\s\s+/g, "\n\n");

        console.log("tweets scrapped... Succesfully!!");

        if (tweetsScrapped == "") {
          req.flash(
            "error_msg",
            "Oops, looks like the account doesn't exist or it has no tweets, kindly enter a valid twitter account username or url"
          );
          res.redirect("/");
        } else {
          console.log("inputURL is: ");
          console.log(inputURL);
          console.log("tweetsScrapped is: ");
          console.log(tweetsScrapped);
          userinput = inputURL;
          res.render("welcome", { userinput, tweetsScrapped });
        }
      })
      .catch(err => {
        // console.log(err);
        req.flash(
          "error_msg",
          "Oops, looks like the account doesn't exist or it has no tweets, kindly enter a valid twitter account username or url"
        );
        res.status(301).redirect("/");
         
      });
  }
});

module.exports = router;
