const commentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    onWorkout: { type: Schema.Types.ObjectId, ref: 'Workout' }, 
    createdAt: { type: Date, default: Date.now },
  });
  
  const Comment = mongoose.model('Comment', commentSchema);
  