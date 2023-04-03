const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  hashtags: [String]
}, {
  timestamps: true
});

const Tweet = mongoose.model('Tweet', tweetSchema);
 
module.exports = Tweet;
