const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const config = require("./config");
const Users = require("./users-next");
const Messages = require("./messages-next");
const Chats = require("./chats-next");

// Initializing Server
const app = express(); // express is a function that returns an instance
app.use(express.json()); // this makes it easier to process JSON requests
app.use(
  //enable cross-origin requests
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser()); // enable working with cookies

app.listen(config.app.port, () =>
  console.log(`Our server is listening on port ${config.app.port}... `)
); // Now we're live!

// connecting to MongoDB
const mongoURL = config.db.connectionString;

mongoose.set("useUnifiedTopology", true); // use Mongo's new connection drivers

mongoose
  .connect(mongoURL, { useNewUrlParser: true })
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.error(err));

// *********
// Routing
// *********
app.get("/", (req, res) => {
  res.write("<h1>Welcome to the NetApp server!</h1>");
  res.end();
});

// Users

app.get("/api/users", Users.getAll);

app.get("/api/users/:id", Users.getById);

app.get("/api/me", Users.getCurrentUserFromCookie);

app.post("/api/users", Users.createNew);

app.put("/api/users/:id", Users.update);

app.delete("/api/users/:id", Users.delete);

// Messages

app.get("/api/messages", Messages.getAll);

app.get("/api/messages/:id", Messages.getById);

//app.post("/api/messages", Messages.createNew);

app.put("/api/messages/:id", Messages.update);

app.delete("/api/messages/:id", Messages.delete);

// Chats

app.get("/api/chats", Chats.getAll);

app.get("/api/chats/:id", Chats.getById);

app.get("/api/chats/:id/messages/", Messages.getByChat);

app.post("/api/chats", Chats.createNew);

app.post("/api/chats/:id/messages", Messages.createNew);

//app.get("/api/friends/", Chats.getFriends);

/*
app.put("/api/chats/:id", Chats.update);

app.delete("/api/chats/:id", Chats.delete);*/
