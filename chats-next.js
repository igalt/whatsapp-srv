const mongoose = require("mongoose");

// creating the Chat Schema
const chatSchema = new mongoose.Schema({
  userIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  /* lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },*/
});

let Chat = mongoose.model("Chat", chatSchema);

module.exports.getAll = (req, res) => {
  let filter = {};
  if (req.query.userId) {
    filter.userIds = req.query.userId;
  }

  Chat.find(filter)
    .populate("userIds", "userName")
    .then((result) => res.json(result));
};

module.exports.getById = (req, res) => {
  Chat.findById(req.params.id)
    .populate("userIds", "userName")
    .populate("messages")
    .then((result) => res.json(result));
};

/*module.exports.getFriends = (req, res) => {
  Chat.find({ userIds: req.params.id })
    .populate("userIds", "userName")
    .then((result) => res.json(result));
};*/

module.exports.createNew = (req, res) => {
  let chat = new Chat({
    userIds: req.body.userIds,
    // lastMessage: message,
  });

  chat
    .save()
    .then((chat) => res.status(201).json(chat))
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Internal server error: ${err}`);
    });
};

/*
module.exports.addMessage = (req, res) => {
  // saving the new message
  //messages.createNew()

  Chat.findById(req.params.id).then((chat) => {
    if (chat) {
      chat.messages.push(req.body.messageId);
      chat.lastMessage = req.body.messageId;

      chat
        .save()
        .then((chat) => res.json(chat))
        .catch((err) => {
          console.error(err);
          res.status(500).send(`Internal server error: ${err}`);
        });
    } else {
      res.status(404).send(`404: chat #${req.params.id} wasn't found`);
    }
  });
};
*/

/*module.exports.update = (req, res) => {
  Chat.findById(req.params.id).then((chat) => {
    if (chat) {
      chat.userIds = req.body.userIds;
      chat.save().then((chat) => {
        if (chat) {
          res.json(chat);
        } else {
          // TODO: investigate error
          res.status(500).send(`internal server error: ${err}`);
        }
      });
    }
  });
};*/
