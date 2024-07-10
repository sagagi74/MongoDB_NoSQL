const { Schema, model, Types } = require('mongoose');

// Schema for reactions (like replies to thoughts)
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId() // Automatically create a new ObjectId
  },
  reactionBody: {
    type: String,
    required: true, // This field is required
    maxlength: 280 // Maximum length of 280 characters
  },
  username: {
    type: String,
    required: true // This field is required
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current timestamp
    get: (timestamp) => new Date(timestamp).toISOString() // Format the timestamp
  }
}, {
  toJSON: {
    getters: true, // Enable getters when converting to JSON
  },
  id: false // Disable the id field
});

// Schema for thoughts
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true, // This field is required
    minlength: 1, // Minimum length of 1 character
    maxlength: 280 // Maximum length of 280 characters
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current timestamp
    get: (timestamp) => new Date(timestamp).toISOString() // Format the timestamp
  },
  username: {
    type: String,
    required: true // This field is required
  },
  reactions: [reactionSchema] // Array of reactions
}, {
  toJSON: {
    virtuals: true, // Enable virtuals when converting to JSON
    getters: true // Enable getters when converting to JSON
  },
  id: false // Disable the id field
});

// Virtual property to get the number of reactions
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length; // Return the length of the reactions array
});

// Create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// Export the Thought model
module.exports = Thought;
