const router = require('express').Router();
const {
  getUsers,       // Function to get all users
  getSingleUser,  // Function to get a single user by ID
  createUser,     // Function to create a new user
  updateUser,     // Function to update a user by ID
  deleteUser,     // Function to delete a user by ID
  addFriend,      // Function to add a friend to a user's friend list
  removeFriend    // Function to remove a friend from a user's friend list
} = require('../../controllers/userController');

// Route to get all users or create a new user
router.route('/').get(getUsers).post(createUser);

// Route to get, update, or delete a single user by ID
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// Route to add a friend to a user's friend list
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// Export the router
module.exports = router;
