const { Schema, model } = require('mongoose');

// Schema for users
const userSchema = new Schema({
  username: {
    type: String,
    unique: true, // Username must be unique
    required: true, // This field is required
    trim: true // Trim any extra spaces from the value
  },
  email: {
    type: String,
    required: true, // This field is required
    unique: true, // Email must be unique
    match: [/.+@.+\..+/, 'Must match a valid email address'] // Must match this regex pattern for a valid email
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId, // Array of ObjectIds referencing the Thought model
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId, // Array of ObjectIds referencing the User model (self-reference)
      ref: 'User'
    }
  ]
}, {
  toJSON: {
    virtuals: true, // Enable virtuals when converting to JSON
  },
  id: false // Disable the id field
});

// Virtual property to get the number of friends
userSchema.virtual('friendCount').get(function() {
  return this.friends.length; // Return the length of the friends array
});

// Create the User model using the userSchema
const User = model('User', userSchema);

// Export the User model
module.exports = User;
