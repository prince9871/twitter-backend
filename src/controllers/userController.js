const userModel = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};


exports.followUser = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.userId } },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    await userModel.findByIdAndUpdate(
      req.userId,
      { $push: { following: req.body.followId } },
      { new: true }
    ).select('-password');

    res.status(200).send({ message: "user followed successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
}

exports.unfollowUser = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.body.unfollowId,
      { $pull: { followers: req.userId } },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    await userModel.findByIdAndUpdate(
      req.userId,
      { $pull: { following: req.body.unfollowId } },
      { new: true }
    ).select('-password');

    res.status(200).send({ message: "user unfollowed successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
}

exports.getDetailsFollowersFollowing = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId)
      .populate('followers', '_id name username') // populate followers with selected fields
      .populate('following', '_id name username'); // populate following with selected fields

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const numFollowers = user.followers.length;
    const numFollowing = user.following.length;

    res.status(200).send({ message: 'Success', data: { numFollowers, numFollowing, user } });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
}