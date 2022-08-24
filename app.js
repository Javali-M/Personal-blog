//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { response } = require("express");
const _ = require('lodash');
const homeStartingContent = "Hey there! Welcome to your personal blog. Here you can write your heart out, rant about life, gossip about people and just let yourself free. <br>So flex your fingers and get typing!";
const aboutContent = "This is a simple blog website made using MERN stack.";
const contactContent="Hey there! if you wanna contact me, here's my Linkedin : <br> And yeah, you're awesome, keep going!";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get('/',function(req,res){

  res.render('home.ejs',{home: homeStartingContent,post: posts})
});
app.get('/about',function(res,res){
  res.render('about.ejs',{about: aboutContent})
});
app.get('/contact',function(req,res){
  res.render('contact.ejs',{cont: contactContent})
});
app.get('/compose',function(req,res){
  res.render('compose.ejs')
});
let posts=[];

app.post('/compose',function(req,res){
  
  var item={
    title:req.body.title,
    post:req.body.post
  }
  posts.push(item);
  res.redirect('/');
});

app.get('/posts/:x', (req, res) => {
  
  const reqtitle = _.lowerCase(req.params.x);
  for(let i=0;i<posts.length;i++){
    
    const artitle=_.lowerCase(posts[i].title);
    if(reqtitle == artitle){
    res.render('post.ejs',{dispost:posts[i]})
    console.log("Match found!")}
    else {
    console.log("Not found")}
  }
});







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
