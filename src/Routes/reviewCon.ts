import express from "express";
const reviewCon = express.Router();




reviewCon.get('/', (req, res) => {
    res.render('reviewCon')
})





export default reviewCon;