let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let helmet = require("helmet");
let logger = require("morgan");
let session = require("express-session");
let passport = require("passport");

// モデルの読み込み
let User = require("./models/user");
let Task = require("./models/task");

User.sync().then(() => {
  Task.belongsTo(User, { foreignKey: "userId" });
  Task.sync();
});

let GitHubStrategy = require("passport-github2").Strategy;
let GITHUB_CLIENT_ID = "cac0e1ea2be597c4db9e";
let GITHUB_CLIENT_SECRET = "ef52ce081ef98e4c044f8f7b3be8867ccfdbaa30";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        User.upsert({
          userId: profile.id,
          username: profile.username
        }).then(() => {
          done(null, profile);
        });
      });
    }
  )
);

let indexRouter = require("./routes/index");
let loginRouter = require("./routes/login");
let logoutRouter = require("./routes/logout");
let completeRouter = require("./routes/task");
let homeRouter = require("./routes/home");

let app = express();

app.use(helmet());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/static", express.static(__dirname + "/public"));

app.use(
  session({
    secret: "d53c189b45b18f32",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/home", homeRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/task", completeRouter);

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  function(req, res) {}
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
