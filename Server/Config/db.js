const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://garvishtayal:Krih1K0a7UagEm7T@trial.j9vcaxz.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
