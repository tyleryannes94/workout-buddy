const express = require('express');
const router = express.Router();
const friendRequestController = require('../controllers/api/friendController');

router.post('/send', friendRequestController.sendFriendRequest);
router.post('/accept', friendRequestController.acceptFriendRequest);
router.get('/list/:userId', friendRequestController.listFriendRequests);
router.get('/all/:userId', friendRequestController.listAllFriends);


module.exports = router;