var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var hbs = require("hbs");
var exphbs = require("express-handlebars");

var indexRouter = require("./routes/index");
var session = require("express-session");
var bodyParser = require("body-parser");
var flash = require("connect-flash");

var app = express();
//for BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set("views", "app/views");
app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "",
    layoutsDir: "",
    partialsDir: ["app/views"]
  })
);
app.set("view engine", "hbs");

app.use(
  session({
    secret: "cuarto-sistemas-A",
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash()); // use connect-flash for flash messages stored in session

require("dotenv").config();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

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
