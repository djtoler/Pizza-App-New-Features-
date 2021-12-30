import express from "express";
const dbdashboard = express.Router();
// const {
//   ensureAuthenticated,
//   forwardAuthenticated,
// } = require("../Config/dbauthenticate");

// Welcome Page
dbdashboard.get("/", (req, res) =>
  res.render("dbwelcome")
);

// Dashboard
// dbdashboard.get('/dbdashboard', ensureAuthenticated, (req, res) =>
//   res.render('dbdashboard', {
//     user: req.user
//   })
// );

export default dbdashboard;
