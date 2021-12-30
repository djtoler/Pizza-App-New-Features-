import express from "express";
const byoPizzaCon = express.Router();




byoPizzaCon.get('/', (req, res) => {
    res.render('byoPizzaCon')
})





export default byoPizzaCon;