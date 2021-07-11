const express = require("express");
const Users = require("./users");

// Initializing Server
const app = express(); // express is a function that returns an instance
app.use(express.json()); // this makes it easier to process JSON requests
app.listen(8080, () => console.log("Our server is listening on port 8080... ")); // Now we're live!

// *********
// Routing
// *********
app.get("/", (req, res) => {
  res.write("<h1>Welcome to the NetApp server!</h1>");
  res.end();
});

app.get("/api/users", (req, res) => {
  res.json(Users.getAll());
});

app.get("/api/users/:id", (req, res) => {
  let user = Users.getById(parseInt(req.params.id));
  if (user) {
    res.send(JSON.stringify(user));
  } else {
    res.status(404).send(`404: user #${req.params.id} wasn't found`);
  }
});

app.post("/api/users", (req, res) => {
  let newUser = {
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    picURL: req.body.picURL,
  };

  let user = Users.createNew(newUser);
  if (user) {
    res.status(201).json(user);
  }
});

app.put("/api/users/:id", (req, res) => {
  let updatedUser = {
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    picURL: req.body.picURL,
  };
  let user = Users.update(parseInt(req.params.id), updatedUser);
  if (user) {
    res.send(JSON.stringify(user));
  } else {
    res
      .status(404)
      .send(`404: user #${req.params.id} wasn't found and cannot be updated`);
  }
});

app.delete("/api/users/:id", (req, res) => {
  let user = Users.delete(parseInt(req.params.id));
  if (user) {
    res.send(JSON.stringify(user));
  } else {
    res
      .status(404)
      .send(`404: user #${req.params.id} wasn't found and cannot be deleted`);
  }
});
