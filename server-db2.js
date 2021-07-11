const express = require("express");
const Users = require("./users-db");
const mongoose = require("mongoose");

// Initializing Server
const app = express(); // express is a function that returns an instance
app.use(express.json()); // this makes it easier to process JSON requests
app.listen(8080, () => console.log("Our server is listening on port 8080... ")); // Now we're live!

// connecting to MongoDB
const mongoURL =
  "mongodb+srv://igal:12081982@mycluster-lgiw8.mongodb.net/netAppDB"; // connection string

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

app.get("/api/users", (req, res) => {
  Users.getAll().then((result) => res.json(result));
});

app.get("/api/users/:id", (req, res) => {
  let user = Users.getById(req.params.id).then((user) => {
    if (user) {
      res.send(JSON.stringify(user));
    } else {
      res.status(404).send(`404: user #${req.params.id} wasn't found`);
    }
  });
});

app.post("/api/users", (req, res) => {
  let newUser = {
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    picURL: req.body.picURL,
  };

  Users.createNew(newUser)
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Internal server error: ${err}`);
    });
});

app.put("/api/users/:id", (req, res) => {
  let updatedUser = {
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    picURL: req.body.picURL,
  };

  Users.update(req.params.id, updatedUser)
    .then((user) => {
      if (user) {
        res.send(JSON.stringify(user));
      }
    })
    .catch((err) => {
      // TODO: investigate error
      res
        .status(404)
        .send(`404: user #${req.params.id} wasn't found and cannot be updated`);
    });
});

app.delete("/api/users/:id", (req, res) => {
  let user = Users.delete(req.params.id)
    .then((user) => {
      if (user) {
        res.send(JSON.stringify(user));
      } else {
        res
          .status(404)
          .send(
            `404: user #${req.params.id} wasn't found and cannot be deleted`
          );
      }
    })
    .catch((err) => {
      // TODO: investigate error
    });
});
