const express = require('express');
const friendController = require('../controllers/api/friendController'); 
const router = express.Router();

router.post('/send-request', friendController.sendFriendRequest);
router.post('/accept-request', friendController.acceptFriendRequest);
router.get('/workouts/:userId/:friendId', friendController.displayFriendWorkouts);
router.get('/search-users', friendController.searchUsers); 
router.get('/friend-requests/pending', friendController.fetchPendingRequests);
router.get('/workouts/friends', friendController.fetchWorkouts);

module.exports = router;