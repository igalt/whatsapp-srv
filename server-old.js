const express = require("express");

// require return us whatever we put inside of 'module.exports' in our module file
const users = require("./users"); // because we want a local file, we need to specify a path (./ = this folder)

// Initializing Server
const app = express(); // express is a function that returns an instance
app.use(express.json()); // this makes it easier to process JSON requests
app.listen(8080, () => console.log("Our server is listening on port 8080... ")); // Now we're live!

// *********
// Routing
// *********

// request to 'home'
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the NetApp server!</h1><p>hope you enjoy :))</p>"); // send = write + end
});

// requesting all users
app.get("/api/users", users.getAll);

// request one user by id
app.get("/api/users/:id", users.getById);

// post request - create new user
app.post("/api/users", users.createNew);

// put request - update existing user
app.put("/api/users/:id", users.update);

// delete request to a specific user
app.delete("/api/users/:id", users.delete);
