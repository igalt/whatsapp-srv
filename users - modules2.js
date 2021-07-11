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

class Users {
  static getAll() {
    return users;
  }

  static getById(id) {
    return users.find((u) => u.id === id);
  }

  static createNew(newUser) {
    let latestId = users[users.length - 1].id;
    newUser.id = latestId + 1;
    users.push(newUser);

    return newUser;
  }

  static update(id, updatedUser) {
    let user = users.find((u) => u.id === id);
    if (user) {
      user.userName = updatedUser.userName;
      user.phoneNumber = updatedUser.phoneNumber;
      user.firstName = updatedUser.firstName;
      user.lastName = updatedUser.lastName;
      user.picURL = updatedUser.picURL;
    }
    console.log(user);

    return user;
  }

  static delete(id) {
    let user = users.find((u) => u.id === id);
    if (user) {
      let idx = users.indexOf(user);
      users.splice(idx, 1);
    }
    return user;
  }
}

module.exports = Users;
