if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// require("dotenv").config();

const express = require("express");
const methodOverride = require("method-override");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();

const connectDB = require("./db/connect");
const authRoutes = require("./routes/auth");
const { checkAuthenticated } = require("./milddlewares/authenticated");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.get("/", checkAuthenticated, async (req, res) => {
  const user = await req.user;
  res.render("index.ejs", { name: user.name });
});
app.use("/auth", authRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log(`Sever is running on http://www.localhost:3000`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
