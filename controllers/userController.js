const { User, Thought } = require('../models');

// Exporting all the functions as a module
module.exports = {
  // Get all users from the database
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users)) // Send back all users as JSON
      .catch((err) => res.status(500).json(err)); // If there's an error, send a 500 status with the error
  },

  // Get a single user by their ID
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v') // Don't include the version key in the result
      .populate('thoughts') // Include thoughts associated with the user
      .populate('friends') // Include friends associated with the user
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' }) // If no user, send a 404 status
          : res.json(user) // Otherwise, send the user back as JSON
      )
      .catch((err) => res.status(500).json(err)); // If there's an error, send a 500 status with the error
  },

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user)) // Send back the newly created user as JSON
      .catch((err) => res.status(500).json(err)); // If there's an error, send a 500 status with the error
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
          ? res.status(404).json({ message: 'No user with this id!' }) // If no user, send a 404 status
          : res.json(user) // Otherwise, send the updated user back as JSON
      )
      .catch((err) => res.status(500).json(err)); // If there's an error, send a 500 status with the error
  },

  // Delete a user by their ID
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' }) // If no user, send a 404 status
          : Thought.deleteMany({ _id: { $in: user.thoughts } }) // Delete all thoughts associated with this user
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' })) // Send a success message
      .catch((err) => res.status(500).json(err)); // If there's an error, send a 500 status with the error
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
          ? res.status(404).json({ message: 'No user with this id!' }) // If no user, send a 404 status
          : res.json(user) // Otherwise, send the updated user back as JSON
      )
      .catch((err) => res.status(500).json(err)); // If there's an error, send a 500 status with the error
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
          ? res.status(404).json({ message: 'No user with this id!' }) // If no user, send a 404 status
          : res.json(user) // Otherwise, send the updated user back as JSON
      )
      .catch((err) => res.status(500).json(err)); // If there's an error, send a 500 status with the error
  },
};
