
const mongoose=require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const homeStartingContent = "Hello! Welcome to my blog. I am so happy that you came to visit my blog. I have reviewed books of different genres which you might like. I am inclined towards reading non-fiction books though I ocassionally enjoy reading Fiction-Classics, sci-fi, thrillers, etc. I post one book review each month. Check out my book reviews below";
const aboutContent = "So I hope that hopefully you have checked out some of my book reviews by now. Now, I understand that you might ask-'So what's new here? What can I get here that others don't offer? Firstly, my reviews are non-poitical...Secondly, I read books randomly. I don't follow authors. I had to Google J.K. Rowling...no just kidding. I just googled Arvind Adiga :P. I like to focus on the book in my hand rather than who wrote it, what his religious, political, philosophical or any other views are. And lastly, I just love to read despite getting very less time to read. My dream is to read one book every day but I know it's very difficult. In spite of that, I read some book, blog, twitter thread, etc. whenever I get time so you might seldomly find a blog review, tweet review, etc. So, stay tuned!";
const contactContent = "If you wish to contact me you can email me at ishandpvt@gmail.com. I would have added my address too...but I am not expecting any hand-written letters nor any pizza deliveries. Cheers ;)";

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
const password = process.env.PASSWORD;
mongoose.connect("mongodb+srv://Ishan01:PASSWORD@cluster0.xnonp.mongodb.net/blogDB", {useNewUrlParser: true});
const postSchema = {
 author: String,
 released: String,
 title: String,
 content: String,
 rating: String
};

const Post = mongoose.model("Post", postSchema);
app.get('/',function(req,res){
  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
})
app.get('/about',function(req,res){
  res.render("about",{aboutContent: aboutContent});
})
app.get('/contact',function(req,res){
  res.render("contact",{contactContent: contactContent});
})
app.get("/compose",function(req,res){
  res.render("compose");
})
app.post("/compose",function(req,res){
  const post = new Post ({
    author: req.body.postAuthor,
    released: req.body.postRelease,
    title: req.body.postTitle,
    content: req.body.postBody,
    rating: req.body.postRating
  });
  post.save(function(err){
     if (!err){
       res.redirect("/");
     }
  });
})

app.get("/posts/:postId",function(req,res){
    const requestedPostId = req.params.postId;
    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        author: post.author,
        released: post.released,
        title: post.title,
        content: post.content,
        rating: post.rating
      });
    });
})
let port = process.env.PORT;
if(port==NULL||port==""){
  port=3000;
}
app.listen(port, function() {
  console.log("Server started on port successfully");
});
