const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const friendSchema = new Schema({
  requester: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  status: { 
    type: String, 
    required: false,
    enum: ['pending', 'accepted', 'declined', 'blocked'], 
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

friendSchema.index({ requester: 1, recipient: 1}, { unique: true }); 

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
