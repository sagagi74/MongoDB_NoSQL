const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB
const { User, Thought } = require('../models'); // Import User and Thought models
const { users, thoughts } = require('./data'); // Import the seed data

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
});

// Function to seed the database with initial data
const seedData = async () => {
  try {
    await mongoose.connection.dropDatabase(); // Drop the existing database

    // Insert seed users into the database
    const createdUsers = await User.insertMany(users);
    // Insert seed thoughts into the database
    const createdThoughts = await Thought.insertMany(thoughts);

    // Loop through the created users and thoughts to link them
    for (let i = 0; i < createdUsers.length; i++) {
      const user = createdUsers[i];
      const thought = createdThoughts[i];

      // Add thoughts and friends to the user
      await User.findOneAndUpdate(
        { _id: user._id },
        { 
          $addToSet: { 
            thoughts: thought._id, 
            friends: createdUsers.filter(u => u._id !== user._id).map(u => u._id) // Add all other users as friends
          } 
        },
        { new: true } // Return the updated document
      );
    }

    console.log('Database seeded!'); // Log success message
  } catch (error) {
    console.error(error); // Log any errors
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
};

// Call the function to seed the data
seedData();
