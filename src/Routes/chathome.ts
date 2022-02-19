import express from "express";


const chathome = express.Router();


chathome.get('/chat', (req, res) => {
    console.log("in the chat");
    res.render('chatindex')
});

chathome.get('/chat.hbs', (req, res) => {
    // console.log("in the room");

    // console.log("1st Set");
    // console.log(req.query);
    // console.log( "line 14" + req.query);

    // console.log("2nd Set");
    // console.log(req.query);
    // console.log( "line 16" + req.query);
    console.log(req.body.message);

    console.log( "request" + req.body.message);
    

    let chatName: string = req.query.username as string;
    let chatRoom: string = req.query.room as string;

    if (chatName && chatRoom) {
        // console.log("3rd Set");
        // console.log( "line 25" + req.query);
        // console.log(req.query);
    }
    res.render('chat.hbs')
    
});

chathome.post("/", (req, res) => {
    console.log("hi");
    
})






export default chathome;