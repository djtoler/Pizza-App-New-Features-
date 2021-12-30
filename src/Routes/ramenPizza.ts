import express from "express";
const ramenPizza = express.Router();




ramenPizza.get('/', (req, res) => {
    res.render('remanPizza')
})






export default ramenPizza;