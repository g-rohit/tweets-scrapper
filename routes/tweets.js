// const express = require("express");
// const router = express.Router();

// const $ = require("cheerio");
// const rp = require("request-promise");
// // var url = "https://twitter.com/ohteenquotes";
// var inputURL, tweetsScrapped;

// // submit tweets button
// router.post("/", (req, res) => {
//   var { inputURL } = req.body;
//   console.log(inputURL);

//   if (inputURL.includes("https://twitter.com/")) {
//     console.log("inputURL is Valid: " + inputURL);

//     rp(inputURL)
//       .then(response => {

//         tweetsScrapped = $(".js-tweet-text-container", response)
//           .text()
//           .trim()
//           .replace(/\s\s+/g, "\n\n");

//         console.log("tweets scrapped... Succesfully!!");

//         res.render("tweets", { inputURL, tweetsScrapped });
//       })
//       .catch(err => {
//         console.log(err);

//         res.render("welcome", { inputURL, tweetsScrapped });
//       });
//   } else {
//     console.log("inputURL is not Valid: " + inputURL);
//     req.flash("error_msg", "Please enter a valid twitter account URL");
//     res.redirect("/");

//     // res.send('Invalid URL');
//   }

//   // rp(inputURL)
//   //   .then(response => {
//   //     tweetsScrapped = $(".js-tweet-text-container", response)
//   //       .text()
//   //       .trim()
//   //       .replace(/\s\s+/g, "\n\n");

//   //     console.log("tweets scrapped... Succesfully!!");
//   //     //   console.log(tweetsScrapped);
//   //     //   res.send("hello tweets will load here:" + '' + tweetsScrapped);
//   //     res.render("tweets", {inputURL, tweetsScrapped });
//   //   })
//   //   .catch(err => console.log(err));
// });

// console.log("inputURL from tweets page");
// console.log(inputURL);
// console.log("tweetsScrapped from tweets page");
// console.log(tweetsScrapped);
// //render
// // router.post("/tweets", (req, res) =>  res.render("tweets", {tweetsScrapped}));

// module.exports = { inputURL: "inputURL", tweetsScrapped: "tweetsScrapped" };

// module.exports = router;
