const express = require('express');
const http = require('http');
const socketio = require('socket.io');

import cors from "cors";
import path from "path";
import "dotenv/config";

const mongoose = require("mongoose");
const flash = require('connect-flash')
const session = require('express-session');
const passport = require('passport');

const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');



import byopizza from "./Routes/byopizza";
import byoPizzaCon from "./Routes/byoPizzaCon";
import home from "./Routes/home";
import hotdogPizza from "./Routes/hotdogPizza";
import liverPizza from "./Routes/liverPizza";
import ramenPizza from "./Routes/ramenPizza";
import review from "./Routes/review";
import reviewCon from "./Routes/reviewCon";
// import Reviewer from "./Models/reviewer";
import dbindex from "./Routes/dbindex";
import dbusers from "./Routes/dbusers";
import dbdashboard from "./Routes/dbdashboard";
import chathome from "./Routes/chathome";






const app = express();
const server = http.createServer(app);
const io = socketio(server);
require('./Config/passport')(passport);

// set up for the database access and use

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

const botName = "ChatCordBot";

io.on('connection', (socket:any) => {
  socket.on('joinRoom', ( {username, room}: {username:any, room:any} ) => {
      // create a variable for a chat user
      // userJoin is a function that creates a id, username & room for a user. Then
      // pushes it into the empty users array and returns user.
      const user = userJoin(socket.id, username, room);
      // join user to whatever room they pick based on qs query string params
      socket.join(user.room);

      socket.emit('message', formatMessage(botName, "Welcome To Food Chat"));

      // emmit to specific room that a new user has joined
      socket.broadcast
      .to(user.room)
      .emit('message', formatMessage(botName, `${user.username} has joined the chat!`));

      io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
      });


  });

  console.log('new websocket connection');

  // listen for chat message
  socket.on('chatMessage', (msg: any) => {
      const user = getCurrentUser(socket.id);
  //users message shows up on screen 
    io
    .to(user.room)
    .emit('message', formatMessage(user.username, msg));
  });

  socket.on('disconnect', () => {
      const user = userLeave(socket.id);

      if (user) {
          io.to(user.room).emit('message', 
              formatMessage(botName, `${user.username} has left the chat!`)
          );

          io.to(user.room).emit('roomUsers', 
          {
              room: user.room, 
              users: getRoomUsers(user.room)
          }
          );
      };
      
  });

});

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
app.use(function(req:any, res:any, next:any) {
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
app.use("/", dbusers);
app.use("/dbdashboard", dbdashboard);
app.use("/", chathome);
// app.use("/dbmessages",  dbmessages)


// app.get('/', (req, res)=>{
//     res.render('fruit')
// })

const port = 4444;

app.listen(port, () => {
  console.log("Listening On PORT: " + port);
});
