const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
mongoose.connect("mongodb://localhost/twitter-ironhack");

User.findOne({username: "kathia"}).then((usr) => {
  const id = usr._id.toString();
  const tweets = [
    {
      username: usr.username,
      tweet: "No lo reiniciees!!",
      user_id: id
    },
    {
      username: usr.username,
      tweet: "No lo reiniciees mas!!",
      user_id: id
    }
    ,
    {
      username: usr.username,
      tweet: "No lo reiniciees mas joder!!",
      user_id: id
    }
  ];
  
  Tweet.collection.drop();
  
  Tweet.create(tweets, (err, docs)=>{
   if (err) { throw err };
     docs.forEach( (course) => {
     })
     mongoose.connection.close();
  });

})



