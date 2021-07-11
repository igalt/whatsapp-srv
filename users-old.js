// users' Data
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

module.exports.getAll = (req, res) => {
  res.json(users);
};

module.exports.getById = (req, res) => {
  let user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send(`404: user #${req.params.id} wasn't found`);
  }
};

module.exports.createNew = (req, res) => {
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
};

module.exports.update = (req, res) => {
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
};

module.exports.delete = (req, res) => {
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
};
