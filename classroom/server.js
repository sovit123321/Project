const express = require("express");
const app = express();
const posts = require("./routes/post.js");
const users = require("./routes/user.js");
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash"); 
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req, res) => {
//   res.cookie("madeIn", "india", {signed: true});
//   res.send("signed cookies sent");
// });

// app.get("/verify", (req, res) => {
//   console.log(req.signedCookies);
//   res.send("verified");
// });

// app.get("/getcookies", (req, res) => {
//   res.cookie("username", "john_doe");
//   res.cookie("madeIn", "india");
//   res.send("sent you some cookies");
// });

// app.get("/greet", (req, res) => {
//   let { name = "anonymous" } = req.cookies;
//   res.send(`Hello, ${name}!`);
// });

// app.get("/", (req, res) => {
//   console.log(req.cookies);
//   res.send("hi, i am root");
// });

// app.use("/users", users);
// app.use("/posts", posts);

//sessions

// app.use(session({secret: "mysupoersecretstring", resave: false, saveUninitialized: true}));

// app.get("/reqcount", (req, res) => {
//   if (req.session.count) {
//     req.session.count++;
//   }else{
//     req.session.count = 1;
//   }
//   res.send(`Request count: ${req.session.count} times`);
// });

// app.get("/test", (req, res) => {
//   res.send("test successful");
// });

//session options

const sessionOptions = {
  secret: "mysupoersecretstring",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  if(name === "anonymous"){
    req.flash("error", "user not registered");
  }else{
    req.flash("success", "You have successfully registered!");
  }
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.render("page.ejs", {name: req.session.name});
});

app.listen(3000, () => {
  console.log("server is listening to port 3000");
});