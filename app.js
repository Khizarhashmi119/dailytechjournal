const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.set("view engine", "ejs");
app.use(express.static("public"));
mongoose.connect(
  "mongodb+srv://khizarhashmi119:khizar119131@cluster0-ns5fj.mongodb.net/blogDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  post: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const Post = mongoose.model("Post", postSchema);

const detailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Detail = mongoose.model("Detail", detailSchema);

const homeStartingContent = "Welcome to my Blog.";
const aboutContent =
  "Hello. My name is Mohd. Khizar Hashmi. and this is my personal blog. if you are interested in tech news and updates, then visit my website daily.";
const contactContent =
  "If you want to contact me and want to give any feedback then you can email me";

app.get("/", function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) {
      console.log("Error");
    } else {
      res.render("index", {
        homeStartingContent: homeStartingContent,
        posts: posts
      });
    }
  });
});

app
  .route("/auth")
  .get(function(req, res) {
    res.render("auth");
  })

  .post(function(req, res) {
    Detail.findOne(
      {
        name: req.body.username
      },
      function(err, result) {
        if (err) {
          console.log("Error");
        } else {
          if (result) {
            if (result.password === md5(req.body.password)) {
              res.render("compose");
            } else {
              console.log("Incorrect password");
            }
          } else {
            console.log("Incorrect username");
          }
        }
      }
    );
  });

app.post("/compose", function(req, res) {
  let date = new Date();
  let option = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
  };
  date = date.toLocaleDateString("en-us", option);
  const newPost = new Post({
    title: req.body.title,
    post: req.body.post.slice(0, 1000),
    date: date
  });
  newPost.save();
  res.redirect("/");
});

app.get("/post/:postName", function(req, res) {
  Post.findOne({ title: req.params.postName }, function(err, post) {
    if (err) {
      console.log("Error");
    } else {
      res.render("post", {
        post: post
      });
    }
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has been started at port no. 3000!");
});
