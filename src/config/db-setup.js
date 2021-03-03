const mongoose = require('mongoose');

// connect to mongo db
const uri = process.env.MONGODB_TEST_URI || 'leetcodeapi';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

module.exports = mongoose.connection;
