const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  text: { type: String, required: true },
  date: Date, // this will always be set to Date.now()
  picURL: String,
});

let Message = mongoose.model("Message", messageSchema);

module.exports.getAll = (req, res) => {
  Message.find()
    .populate("author", "userName")
    .then((result) => res.json(result));
};

module.exports.getByChat = (req, res) => {
  Message.find({ chat: req.params.id })
    .populate("author", "userName")
    .then((result) => res.json(result));
};

module.exports.getById = (req, res) => {
  Message.findById(req.params.id)
    .populate("author")
    //.populate("chat")
    /* multi-level population */
    .populate({
      path: "chat",
      populate: {
        path: "userIds",
        model: "User",
      },
    })
    .then((message) => {
      if (message) {
        res.send(JSON.stringify(message));
      } else {
        res.status(404).send(`404: message #${req.params.id} wasn't found`);
      }
    });
};

module.exports.createNew = (req, res) => {
  let message = new Message({
    author: req.body.author,
    chat: req.params.id,
    text: req.body.text,
    date: Date.now(),
    picURL: req.body.picURL,
  });

  message
    .save()
    .then((user) => res.status(201).json(message))
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Internal server error: ${err}`);
    });
};

module.exports.update = (req, res) => {
  Message.findById(req.params.id).then((message) => {
    if (message) {
      // there's no point in updating the author/chat...

      message.text = req.body.text;
      message.date = Date.now();
      message.picURL = req.body.picURL;

      message
        .save()
        .then((message) => {
          if (message) {
            res.json(message);
          }
        })
        .catch((err) => {
          // TODO: investigate error
          res.status(500).send(`internal server error: ${err}`);
        });
    } else {
      res
        .status(404)
        .send(
          `404: message #${req.params.id} wasn't found and cannot be updated`
        );
    }
  });
};

module.exports.delete = (req, res) => {
  Message.findByIdAndRemove(req.params.id)
    .then((message) => {
      if (message) {
        res.send(JSON.stringify(message));
      } else {
        res
          .status(404)
          .send(
            `404: message #${req.params.id} wasn't found and cannot be deleted`
          );
      }
    })
    .catch((err) => {
      // TODO: investigate error
    });
};
