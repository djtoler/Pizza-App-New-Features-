import express from "express";
const hotdogPizza = express.Router();


hotdogPizza.get('/', (req, res) => {
    res.render('hotdogPizza')
})






export default hotdogPizza;