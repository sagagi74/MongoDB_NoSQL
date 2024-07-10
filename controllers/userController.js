const { User, Thought } = require('../models');

// Exporting all the functions as a module
module.exports = {
  // Get all users from the database
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users)) 
      .catch((err) => res.status(500).json(err)); 
  },

  // Get a single user by their ID
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v') 
      .populate('thoughts') // Include thoughts associated with the user
      .populate('friends') // Include friends associated with the user
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user ID' }) 
          : res.json(user) 
      )
      .catch((err) => res.status(500).json(err)); 
  },

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user)) 
      .catch((err) => res.status(500).json(err)); 
  },

  // Update a user by their ID
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user id!' }) 
          : res.json(user) 
      )
      .catch((err) => res.status(500).json(err)); 
  },

  // Delete a user by their ID
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user ID' }) 
          : Thought.deleteMany({ _id: { $in: user.thoughts } }) 
      )
      .then(() => res.json({ message: 'User thoughts deleted!' })) 
      .catch((err) => res.status(500).json(err)); 
  },

  // Add a friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user id!' }) 
          : res.json(user) 
      )
      .catch((err) => res.status(500).json(err)); 
  },

  // Remove a friend from a user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user id!' }) 
          : res.json(user) 
      )
      .catch((err) => res.status(500).json(err)); 
  },
};
