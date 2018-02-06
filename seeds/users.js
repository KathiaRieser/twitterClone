const mongoose = require('mongoose');
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const User = require('../models/User');
mongoose.connect("mongodb://localhost/twitter-ironhack");
var salt = bcrypt.genSaltSync(bcryptSalt);
const password1 = "ironhack";
const password2 = "ironhack2";
const password3 = "ironhack3";


const users = [
 {
   username: 'theboss1',
   password: bcrypt.hashSync(password1, salt),
 },
 {
   username: 'theboss2',
   password: bcrypt.hashSync(password2, salt),
 },
 {
   username: 'theboss3',
   password: bcrypt.hashSync(password3, salt),
 }
];

User.collection.drop();

User.create(users, (err, docs)=>{
 if (err) { throw err };
   docs.forEach( (course) => {
     console.log(course.username)
   })
   mongoose.connection.close();
});