const mongoose = require('mongoose');
const Friend = require('../../models/Friend');
const User = require('../../models/User');
const Workout = require('../../models/Workout');

// Send a friend request
exports.sendFriendRequest = async (req, res) => {
    const { requesterId, recipientId } = req.body;
    try {
        const existingRequest = await Friend.findOne({ requester: requesterId, recipient: recipientId });
        if (existingRequest) {
            return res.status(400).send('Friend request already sent.');
        }
        const newFriendRequest = new Friend({
            requester: mongoose.Types.ObjectId(requesterId),
            recipient: mongoose.Types.ObjectId(recipientId),
            status: 'pending',
        });
        await newFriendRequest.save();
        res.status(201).send('Friend request sent successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Accept a friend request
exports.acceptFriendRequest = async (req, res) => {
    const { requestId } = req.body;
    try {
        const request = await Friend.findById(requestId);
        if (!request) {
            return res.status(404).send('Friend request not found.');
        }
        request.status = 'accepted';
        await request.save();
        res.send('Friend request accepted.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Display all workouts of an accepted friend
exports.displayFriendWorkouts = async (req, res) => {
    const { userId, friendId } = req.params; 

    try {
        const friendship = await Friend.findOne({
            $or: [
                { requester: mongoose.Types.ObjectId(userId), recipient: mongoose.Types.ObjectId(friendId), status: 'accepted' },
                { requester: mongoose.Types.ObjectId(friendId), recipient: mongoose.Types.ObjectId(userId), status: 'accepted' }
            ]
        });

        if (!friendship) {
            return res.status(404).send('No accepted friend relationship found.');
        }

        const workouts = await Workout.find({ userId: mongoose.Types.ObjectId(friendId) });
        res.json(workouts);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchUsers = async (req, res) => {
    try {
        const searchTerm = req.query.query;
        const users = await User.find({
            $or: [
                { first_name: { $regex: searchTerm, $options: 'i' } },
                { last_name: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.fetchPendingRequests = async (req, res) => {
    const userId = req.query.userId;
    try {
        const pendingRequests = await Friend.find({ recipient: userId, status: 'pending' }).populate('requester');
        res.json(pendingRequests);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.fetchWorkouts = async (req, res) => {
    const userId = req.query.userId;
    try {
        const friends = await Friend.find({ 
            $or: [{ requester: userId }, { recipient: userId }],
            status: 'accepted'
        }).select('requester recipient');

        const friendIds = friends.map(friend => 
            friend.requester.toString() === userId ? friend.recipient : friend.requester
        );

        const workouts = await Workout.find({ userId: { $in: friendIds } }).populate('userId');
        res.json(workouts);
    } catch (error) {
        res.status(500).send(error.message);
    }
};