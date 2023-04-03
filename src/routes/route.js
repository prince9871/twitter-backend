const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const tweetController = require('../controllers/tweetController');
const { authenticateUser } = require('../middleware/authMiddleware');

// Authentication routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/reset-password/:userId', authController.resetPassword);

// User routes
router.get('/user', authenticateUser, userController.getDetailsFollowersFollowing);
router.post('/user/follow', authenticateUser, userController.followUser);
router.delete('/user/unfollow', authenticateUser, userController.unfollowUser);

// Tweet routes
router.post('/tweets', authenticateUser, tweetController.createTweet);
router.get('/tweets/user', authenticateUser, tweetController.getTweetsByUser);
router.get('/tweets/followed', authenticateUser, tweetController.getTweetsByFollowedUsers);
router.get('/tweets/search', tweetController.searchTweets);
router.get('/tweets/page', tweetController.getTweetsWithPagination);


module.exports = router;
