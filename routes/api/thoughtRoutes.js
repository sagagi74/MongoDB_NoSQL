const router = require('express').Router();
const {
  getThoughts,       // Function to get all thoughts
  getSingleThought,  // Function to get a single thought by ID
  createThought,     // Function to create a new thought
  updateThought,     // Function to update a thought by ID
  deleteThought,     // Function to delete a thought by ID
  addReaction,       // Function to add a reaction to a thought
  removeReaction     // Function to remove a reaction from a thought
} = require('../../controllers/thoughtController');

// Route to get all thoughts or create a new thought
router.route('/').get(getThoughts).post(createThought);

// Route to get, update, or delete a single thought by ID
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// Route to add a reaction to a thought
router.route('/:thoughtId/reactions').post(addReaction);

// Route to remove a reaction from a thought by reaction ID
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// Export the router
module.exports = router;
