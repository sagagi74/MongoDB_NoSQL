const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const { users, thoughts } = require('./data');

mongoose.connect('mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    await mongoose.connection.dropDatabase();

    const createdUsers = await User.insertMany(users);
    const createdThoughts = await Thought.insertMany(thoughts);

    for (let i = 0; i < createdUsers.length; i++) {
      const user = createdUsers[i];
      const thought = createdThoughts[i];

      await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { thoughts: thought._id, friends: createdUsers.filter(u => u._id !== user._id).map(u => u._id) } },
        { new: true }
      );
    }

    console.log('Database seeded!');
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
