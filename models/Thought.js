const { Schema, model, Types } = require('mongoose');

// Schema for reactions
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId() // Auto-generate ObjectId
  },
  reactionBody: {
    type: String,
    required: true, 
    maxlength: 280 
  },
  username: {
    type: String,
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
    get: (timestamp) => new Date(timestamp).toISOString() // Format timestamp
  }
}, {
  toJSON: { getters: true }, // Enable getters for JSON
  id: false // Disable virtual id
});

// Schema for thoughts
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true, 
    minlength: 1, 
    maxlength: 280 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
    get: (timestamp) => new Date(timestamp).toISOString() // Format timestamp
  },
  username: {
    type: String,
    required: true 
  },
  reactions: [reactionSchema] // Array of reactions
}, {
  toJSON: { virtuals: true, getters: true }, 
  id: false 
});

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Create Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought; 

