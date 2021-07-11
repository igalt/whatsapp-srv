const express = require("express");

// Initializing Server
const app = express(); // express is a function that returns an instance
app.use(express.json()); // this makes it easier to process JSON requests
app.listen(8080, () => console.log("Our server is listening on port 8080... ")); // Now we're live!

// Our Data
let users = [
  {
    id: 1,
    userName: "igaltar",
    phoneNumber: "31613613",
    firstName: "Igal",
    lastName: "Tar",
    picURL: "igal.jpg",
  },
  {
    id: 2,
    userName: "jos",
    phoneNumber: "159072521",
    firstName: "John",
    lastName: "Smith",
    picURL: "john.jpg",
  },
  {
    id: 3,
    userName: "dubig",
    phoneNumber: "124172095712",
    firstName: "Dubi",
    lastName: "Gal",
    picURL: "dubi.jpg",
  },
];

// *********
// Routing
// *********

// request to 'home'
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the NetApp server!</h1><p>hope you enjoy :))</p>"); // send = write + end
});

// requesting all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// request one user by id
app.get("/api/users/:id", (req, res) => {
  let user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send(`404: user #${req.params.id} wasn't found`);
  }
});

// post request - create new user
app.post("/api/users", (req, res) => {
  let newUser = {
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    picURL: req.body.picURL,
  };

  // creating a new ID
  let latestId = users[users.length - 1].id;
  newUser.id = latestId + 1;
  users.push(newUser);

  res.status(201).json(newUser); // 201 = created
});

// put request - update existing user
app.put("/api/users/:id", (req, res) => {
  let updatedUser = users.find((u) => u.id === parseInt(req.params.id));

  if (updatedUser) {
    updatedUser.userName = req.body.userName;
    updatedUser.phoneNumber = req.body.phoneNumber;
    updatedUser.firstName = req.body.firstName;
    updatedUser.lastName = req.body.lastName;
    updatedUser.picURL = req.body.picURL;

    res.json(updatedUser);
  } else {
    res
      .status(404)
      .send(`404: user #${req.params.id} wasn't found and cannot be updated`);
  }
});

// delete request to a specific user
app.delete("/api/users/:id", (req, res) => {
  let user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    let idx = users.indexOf(user);
    users.splice(idx, 1); // deleting the user by array index
    res.json(user);
  } else {
    res
      .status(404)
      .send(`404: user #${req.params.id} wasn't found and cannot be deleted`);
  }
});
