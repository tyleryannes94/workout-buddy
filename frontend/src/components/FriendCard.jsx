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

        {pendingRequests.length > 0 && (
        <>
            <h2>Pending Requests</h2>
            {pendingRequests.map(request => (
            <div key={request._id}>
                From: {request.requester.email}
                <button onClick={() => acceptFriendRequest(request._id)}>Accept</button>
            </div>
            ))}
        </>
        )}

        <h2>Friend Workouts</h2>
        
        {workouts
        .filter(workout => workout.workout_date != null) 
        .map((workout, index) => (
            <div key={index} className="border-accent">
                <h3 >{workout.userId.first_name}'s Logged Workouts</h3>
                <p>Type: {workout.workout_type}</p>
                <p>Date: {new Date(workout.workout_date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</p>
                <p>Calories Burned: {workout.calories_burned}</p>
            </div>
        ))}
    </div>
  );
};

export default FriendCard;