import express from "express";
const dbdashboard = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/dbauthenticate');

// Welcome Page
dbdashboard.get("/welcome", forwardAuthenticated, (req, res) =>
  res.render("dbwelcome")
);

// Dashboard
dbdashboard.get('/', ensureAuthenticated, (req, res) =>
  res.render('dbdashboard', {
    user: req.user
  })
);

export default dbdashboard;
