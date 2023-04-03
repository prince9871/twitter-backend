const tweetModel = require('../models/tweetModel');
const userModel = require('../models/userModel')
exports.createTweet = async (req, res) => {
    try {
        const { content, hashtags } = req.body;
        const tweet = await tweetModel.create({ content, hashtags, userId: req.userId });
        res.status(201).json(tweet);
    } catch (err) {
        res.status(500).json({ message: 'Tweet creation failed', err: err.message });
    }
};


exports.getTweetsByUser = async (req, res) => {
    try {
        const tweets = await tweetModel.find({ userId: req.userId });
        res.status(200).json(tweets);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get tweets by user', err: err.message });
    }
};

exports.getTweetsByFollowedUsers = async (req, res) => {
    try {
        const currentUser = await userModel.findById(req.userId)
        const followedUsers = currentUser.following;
        const tweets = await tweetModel.find({ user: { $in: followedUsers } });
        if (tweets.length == 0) res.status(404).send({ status: false, message: "No tweets found from followed users" })
        res.status(200).json(tweets);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get tweets by followed users', err: err.message });
    }
};

exports.searchTweets = async (req, res) => {
    try {
        const query = req.query.q;
        const tweets = await tweetModel.find({ $or: [{ content: { $regex: query, $options: 'i' } }, { hashtags: { $regex: query, $options: 'i' } }] });
        res.status(200).json(tweets);
    } catch (err) {
        res.status(500).json({ message: 'Failed to search tweets', err: err.message });
    }
};

exports.getTweetsWithPagination = async (req, res) => {
    try {
        const { page, limit } = req.query;
        if (page || limit == 0) return res.status(400).send({ status: false, message: 'please change input as page 1 or limit 1' })
        const tweets = await tweetModel.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        res.status(200).json(tweets);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get tweets with pagination', err: err.message });
    }
};    