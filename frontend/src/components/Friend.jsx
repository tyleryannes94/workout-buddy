import React, { useState, useEffect } from 'react';

function Friend() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [workouts, setWorkouts] = useState([]);

    const currentUserId = localStorage.getItem('userId');

    useEffect(() => {
        fetchPendingRequests();
        fetchWorkouts();
    }, []);

    const searchUsers = async () => {
        const response = await fetch(`/api/friends/search-users?query=${searchTerm}`);
        const data = await response.json();
        setUsers(data);
    };

    const fetchPendingRequests = async () => {
        const response = await fetch(`/api/friends/friend-requests/pending?userId=${currentUserId}`);
        const data = await response.json();
        setPendingRequests(data);
    };

    const fetchWorkouts = async () => {
        const response = await fetch(`/api/friends/workouts/friends?userId=${currentUserId}`);
        const data = await response.json();
        setWorkouts(data);
    };

  const sendFriendRequest = async (recipientId) => {
    try {
        const response = await fetch('/api/friends/send-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ requesterId: currentUserId, recipientId }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        alert('Friend request sent successfully');
        // Optionally refetch data to update UI
    } catch (error) {
        console.error("Failed to send friend request:", error);
        alert('Failed to send friend request');
    }
};

    const acceptFriendRequest = async (requestId) => {
        await fetch('/api/friends/accept-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ requestId }),
        });
        fetchPendingRequests();
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search users by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={searchUsers}>Search</button>
            
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
            {workouts.map(workout => (
                <div key={workout._id}>
                    <h3>{workout.user.first_name}'s Workouts</h3>
                    {/* Iterate through workout details */}
                </div>
            ))}
        </div>
    );
}

export default Friend;
