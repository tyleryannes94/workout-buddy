const Friend = require('../../models/Friend');
const io = require('../../utils/socket').getIO(); // Ensure you export and initialize io in your server setup

exports.sendFriendRequest = async (req, res) => {
    const { requesterId, recipientId } = req.body;
    try {
        if (requesterId === recipientId) {
            return res.status(400).json({ message: 'You cannot send a friend request to yourself.' });
        }

        const existingRequest = await Friend.findOne({
            $or: [
                { requester: requesterId, recipient: recipientId },
                { requester: recipientId, recipient: requesterId },
            ],
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already exists or has been processed.' });
        }

        const newRequest = new Friend({
            requester: requesterId,
            recipient: recipientId,
            status: 'pending',
        });

        await newRequest.save();
        res.status(201).json({ message: 'Friend request sent successfully.', data: newRequest });

        // Emit an event to notify the recipient in real-time
        io.to(recipientId).emit('friendRequestReceived', { from: requesterId, request: newRequest });

    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).json({ message: 'Error sending friend request.' });
    }
};

exports.acceptFriendRequest = async (req, res) => {
    const { requestId } = req.body;
    try {
        const request = await Friend.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Friend request not found.' });
        }
        if (request.status !== 'pending') {
            return res.status(400).json({ message: 'This request has already been processed.' });
        }
        request.status = 'accepted';
        await request.save();
        res.json({ message: 'Friend request accepted.', data: request });

        // Emit an event to notify the requester in real-time
        io.to(request.requester).emit('friendRequestAccepted', { by: request.recipient, request });

    } catch (error) {
        console.error('Error accepting friend request:', error);
        res.status(500).json({ message: 'Error accepting friend request.' });
    }
};

exports.listFriendRequests = async (req, res) => {
    const { userId } = req.params;
    try {
        const requests = await Friend.find({ recipient: userId, status: 'pending' })
            .populate('requester', 'firstName lastName')
            .exec();
        res.json({ data: requests });
    } catch (error) {
        console.error('Error listing friend requests:', error);
        res.status(500).json({ message: 'Error listing friend requests.' });
    }
};

exports.listAllFriends = async (req, res) => {
  const { userId } = req.params;
  try {
      const friends = await Friend.find({
          $or: [
              { requester: userId, status: "accepted" },
              { recipient: userId, status: "accepted" }
          ]
      }).populate('requester recipient', 'firstName lastName email -_id') // Adjust the fields to match your User model
        .exec();

      // Transform the data to return a list of friends' information
      const allFriends = friends.map(friend => {
          return friend.requester._id.toString() === userId ? friend.recipient : friend.requester;
      });

      res.json({ success: true, friends: allFriends });
  } catch (error) {
      console.error('Error listing all friends:', error);
      res.status(500).json({ success: false, message: 'Error listing all friends.' });
  }
};

// const Friend = require('../../models/Friend'); 

// exports.sendFriendRequest = async (req, res) => {
//     const { requesterId, recipientId } = req.body;
//     try {
//       const existingRequest = await Friend.findOne({
//         $or: [
//           { requester: requesterId, recipient: recipientId },
//           { requester: recipientId, recipient: requesterId },
//         ],
//       });
  
//       if (existingRequest) {
//         return res.status(400).json({ message: 'Friend request already exists.' });
//       }
  
//       const newRequest = new Friend({
//         requester: requesterId,
//         recipient: recipientId,
//         status: 'pending',
//       });
  
//       await newRequest.save();
//       res.status(201).json({ message: 'Friend request sent successfully.', data: newRequest });
//     } catch (error) {
//       console.error('Error sending friend request:', error);
//       res.status(500).json({ message: 'Error sending friend request.' });
//     }
//   };
  
//   exports.acceptFriendRequest = async (req, res) => {
//     const { requestId } = req.body;
//     try {
//       const request = await Friend.findById(requestId);
//       if (!request) {
//         return res.status(404).json({ message: 'Friend request not found.' });
//       }
//       request.status = 'accepted';
//       await request.save();
//       res.json({ message: 'Friend request accepted.', data: request });
//     } catch (error) {
//       console.error('Error accepting friend request:', error);
//       res.status(500).json({ message: 'Error accepting friend request.' });
//     }
//   };
  
//   exports.listFriendRequests = async (req, res) => {
//     const { userId } = req.params;
//     try {
//       const requests = await Friend.find({ recipient: userId, status: 'pending' })
//         .populate('requester', 'firstName lastName')
//         .exec();
//       res.json({ data: requests });
//     } catch (error) {
//       console.error('Error listing friend requests:', error);
//       res.status(500).json({ message: 'Error listing friend requests.' });
//     }
//   };
  
