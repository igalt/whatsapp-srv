const mongoose = require("mongoose");

// a Schema is a way of defining how our data looks like in MongoDB
// Supported types are:
// String, Number, Date,
// Buffer (for storing binary data), Boolean and ObjectID.
// id is added automatically
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  phoneNumber: String,
  firstName: String,
  lastName: String,
  picURL: String,
});

// this duplicates the "_id" field as an "id" field in JSON
userSchema.set("toJSON", {
  virtuals: true,
});

// a Model is used to create a Class definition (not an instance!)
// based on the Schema.
// this class also helps us to communicate with the DB
// 1st parameter is the singular name of the collection in the DB
let User = mongoose.model("User", userSchema); // Product is a class

// User.init(); // when we need to create a new index

class Users {
  static getAll() {
    let result;
    return User.find(); // returns a promise
  }

  static getById(id) {
    return User.findById(id);
  }

  static createNew(newUser) {
    // creating a new user based on our Model
    let user = new User({
      userName: newUser.userName,
      phoneNumber: newUser.phoneNumber,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      picURL: newUser.picURL,
    });

    return user.save();
  }

  static update(id, updatedUser) {
    return User.findById(id).then((user) => {
      if (user) {
        user.userName = updatedUser.userName;
        user.phoneNumber = updatedUser.phoneNumber;
        user.firstName = updatedUser.firstName;
        user.lastName = updatedUser.lastName;
        user.picURL = updatedUser.picURL;
      }

      return user.save();
    });
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
