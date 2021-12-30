import express, { request } from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
const mongoose = require("mongoose");
const flash = require('connect-flash')
const session = require('express-session');
const passport = require('passport');
import {Request} from 'express';

// declare module "express" {
//   export interface Request {
//     user: any,
//     flash: any,
//     login: any
//   }
// }

import byopizza from "./Routes/byopizza";
import byoPizzaCon from "./Routes/byoPizzaCon";
import home from "./Routes/home";
import hotdogPizza from "./Routes/hotdogPizza";
import liverPizza from "./Routes/liverPizza";
import ramenPizza from "./Routes/ramenPizza";
import review from "./Routes/review";
import reviewCon from "./Routes/reviewCon";
import Reviewer from "./Models/Reviewer";
import dbindex from "./Routes/dbindex";
import dbusers from "./Routes/dbusers";
import dbdashboard from "./Routes/dbdashboard";
// import dbmessages from "./Views/Partials/dbmessages";





const app = express();
require('./Config/passport')(passport);

// set up for the database access and use
// const db  = process.env.Mongo_URI
// connect to MongoDB
mongoose
  .connect('mongodb+srv://djtoler:alphagpc@cluster0.rwafh.mongodb.net/todo?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err: any) => console.log(err));

// // Since mongoose's Promise is deprecated, we override it with Node's Promise
// mongoose.Promise = global.Promise;

app.set("views", path.join(__dirname, "Views"));
app.set("partials", path.join(__dirname, "Views/Partials"));

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "Pulic")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'dj',
  resave: true,
  saveUninitialized: true
}));



app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});






app.use("/", home);
app.use("/hotdogPizza", hotdogPizza);
app.use("/liverPizza", liverPizza);
app.use("/ramenPizza", ramenPizza);
app.use("/review", review);
app.use("/reviewCon", reviewCon);
app.use("/byopizza", byopizza);
app.use("/byoPizzaCon", byoPizzaCon);
app.use("/dbindex", dbindex);
app.use("/dbusers", dbusers);
app.use("/dbdashboard", dbdashboard);
// app.use("/dbmessages",  dbmessages)


// app.get('/', (req, res)=>{
//     res.render('fruit')
// })

const port = 4444;

app.listen(port, () => {
  console.log("Listening On PORT: " + port);
});
