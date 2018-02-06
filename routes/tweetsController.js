const express          = require("express");
const tweetsController = express.Router();
const User = require('../models/User');
const Tweet = require('../models/Tweet');

tweetsController.get("/", (req, res, next) => {
  console.log(req.user.username);
  Tweet.find({}).exec((err, tweets) => {
    res.render (
      "tweets/index",
      { username: req.user.username, tweets: tweets}
    );
  });
});

tweetsController.get("/new", (req, res, next) => {
  res.render("tweets/new",
    { username: req.user.username });
 });
 
 tweetsController.post("/new", (req, res, next) => {
  const user  = req.user;
 
  User.findOne({ username: user.username }).exec((err, user) => {
    if (err) { return; }
 
    const newTweet = new Tweet({
      user_id:   user._id,
      user_name: user.username,
      tweet:     req.body.tweetText
    });
 
    newTweet.save((err) => {
      if (err) {
        res.render("tweets/new",
          {
            username: user.username,
            errorMessage: err.errors.tweet.message
          });
      } else {
        res.redirect("/tweets");
      }
    });
  });
 });
   

 tweetsController.use((req, res, next) => {
  if (req.user) { next(); }
  else { res.redirect("/login"); }
 });


module.exports = tweetsController;