import React from 'react';
import Friend from './Friend'; 


const FriendCard = ({ searchTerm, users, pendingRequests, workouts, searchUsers, sendFriendRequest, acceptFriendRequest }) => {
  return (
    <div className="friend-card">
        <h3>Search users by name or email:</h3>
        <div className="search-container">
            
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '90%' }}
            />
            <button className='search-button' onClick={searchUsers}>Search</button>
        </div>
            
        {users.map(user => (
            <div key={user._id}>
                {user.first_name} {user.last_name} - {user.email}
                <button onClick={() => sendFriendRequest(user._id)}>Add Friend</button>
            </div>
        ))}

        <h2>Pending Requests</h2>
        {pendingRequests.map(request => (
            <div key={request._id}>
                From: {request.requester.email}
                <button onClick={() => acceptFriendRequest(request._id)}>Accept</button>
            </div>
        ))}

        <h2>Friend Workouts</h2>
        {workouts
        .filter(workout => workout.workout_date != null) 
        .map((workout, index) => (
            <div key={index}>
                <h3>{workout.userId.first_name}'s Logged Workouts</h3>
                <p>Type: {workout.workout_type}</p>
                <p>Date: {workout.workout_date}</p>
                <p>Calories Burned: {workout.calories_burned}</p>
            </div>
        ))}
    </div>
  );
};

export default FriendCard;