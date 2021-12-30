import express from "express";
const liverPizza = express.Router();



liverPizza.get('/', (req, res) => {
    res.render('liverPizza')
})







export default liverPizza;