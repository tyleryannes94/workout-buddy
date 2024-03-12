import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import FriendCard from './FriendCard';

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
        // Make sure to include error handling and check for a valid response
        try {
            const response = await fetch(`/api/friends/workouts/friends?userId=${currentUserId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch workouts');
            }
            const data = await response.json();
            setWorkouts(data);
        } catch (error) {
            console.error("Error fetching workouts:", error);
        }
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
    try {
        const response = await fetch('/api/friends/accept-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ requestId }),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        fetchPendingRequests();
        fetchWorkouts();
    } catch (error) {
        console.error("Failed to accept friend request:", error);
        alert('Failed to accept friend request');
    }
};

    return (
        <div>
            <Navbar/>
            <h1 className='customSerif-bold'>Friends</h1>
            <div className='friend-card'>
                <FriendCard 
                    searchTerm={searchTerm}
                    users={users}
                    pendingRequests={pendingRequests}
                    workouts={workouts}
                    searchUsers={searchUsers}
                    sendFriendRequest={sendFriendRequest}
                    acceptFriendRequest={acceptFriendRequest}/>
            </div>
        </div>
    );
}

export default Friend;
