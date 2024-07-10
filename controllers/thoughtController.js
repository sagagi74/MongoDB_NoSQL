const { Thought, User } = require('../models');

// Exporting all the functions as a module
module.exports = {
  // Get all thoughts from the database
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts)) 
      .catch((err) => res.status(500).json(err)); // If there's an error, send a 500 status with the error
  },
  
  // Get a single thought by its ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v') 
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' }) // If no thought, send a 404 status
          : res.json(thought) // Otherwise, send the thought back as JSON
      )
      .catch((err) => res.status(500).json(err)); // If there's an error, send a 500 status with the error
  },
  
  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        // Find the user and add this thought to their list of thoughts
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Thought created, but found no user with that ID' }) // If no user, send a 404 status
          : res.json('Created the thought!') 
      )
      .catch((err) => res.status(500).json(err)); // If there's an error, send a 500 status with the error
  },
  
  // Update a thought by its ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' }) // If no thought, send a 404 status
          : res.json(thought) 
      )
      .catch((err) => res.status(500).json(err)); // If there's an error, send a 500 status with the error
  },
  
  // Delete a thought by its ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' }) // If no thought, send a 404 status
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Thought deleted but no user with this id!' }) // If thought deleted but no user found, send a 404 status
          : res.json({ message: 'Thought successfully deleted!' }) 
      )
      .catch((err) => res.status(500).json(err)); 
  },
  
  // Add a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' }) 
          : res.json(thought) // Otherwise, send the updated thought back as JSON
      )
      .catch((err) => res.status(500).json(err));
  },
  
  // Remove a reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' }) 
          : res.json(thought) 
      )
      .catch((err) => res.status(500).json(err));
  },
};
