// import React, { useState, useEffect } from 'react';
// import FriendsList from './FriendsList';
// import FriendsPending from './FriendsPending';
// import FriendsSearch from './FriendsSearch';
// import Navbar from './Navbar';

// const Friends = () => {
//   const [friends, setFriends] = useState([]);
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     fetchFriends();
//     fetchPendingRequests();
//   }, []);

//   const fetchFriends = async () => {
//     const response = await fetch('/api/friends');
//     const data = await response.json();
//     setFriends(data);
//   };

//   const fetchPendingRequests = async () => {
//     const response = await fetch('/api/friends/pending');
//     const data = await response.json();
//     setPendingRequests(data);
//   };

//   const handleSearch = async (query) => {
//     const response = await fetch(`/api/users/search?query=${query}`);
//     const data = await response.json();
//     setSearchResults(data);
//   };

//   const sendFriendRequest = async (userId) => {
//     try {
//       const response = await fetch('/api/friends/requests', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId }),
//       });
//       if (!response.ok) throw new Error('Failed to send friend request');
//       alert('Friend request sent!');
//       // Optionally refresh search results or pending requests
//     } catch (error) {
//       console.error('Error sending friend request:', error);
//     }
//   };

//   return (
//     <div>
//         <Navbar/>
//       <FriendsSearch onSearch={handleSearch} />
//       <div>
//         <h2>My Friends</h2>
//         <FriendsList friends={friends} />
//       </div>
//       <div>
//         <h2>Pending Requests</h2>
//         <FriendsPending requests={pendingRequests} onAccept={fetchFriends} />
//       </div>
//       {searchResults.length > 0 && (
//         <div>
//           <h2>Search Results</h2>
//           {searchResults.map(user => (
//             <div key={user._id}>
//               {user.firstName} {user.lastName} - {user.email}
//               <button onClick={() => sendFriendRequest(user._id)}>Add Friend</button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Friends;

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import FriendsList from './FriendsList';
// import FriendsPending from './FriendsPending';
import FriendsSearch from './FriendsSearch';
import Navbar from './Navbar';

const socket = io(); // Adjust this to target your server's URI if needed

const Friends = () => {
  // Re-initializing the commented states to avoid reference errors
//   const [friends, setFriends] = useState([]);
//   const [pendingRequests, setPendingRequests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Removed complex logic for testing. Just console log on socket events.
    socket.on('friendRequestReceived', (data) => {
      console.log('Friend request received:', data);
    });

    socket.on('friendRequestAccepted', (data) => {
      console.log('Friend request accepted:', data);
    });

    return () => {
      socket.off('friendRequestReceived');
      socket.off('friendRequestAccepted');
    };
  }, []);

  const handleSearch = async (query) => {
    console.log('Searching for:', query);
    setSearchResults([]); // Adjust as needed for testing
  };

  const sendFriendRequest = (userId) => {
    console.log('Sending friend request to:', userId);
    // Simulate sending a friend request for testing
    alert('Friend request sent!');
  };

  return (
    <div>
      <Navbar/>
      <FriendsSearch onSearch={handleSearch} />
      <div>
        <h2>My Friends</h2>
        {/* Pass friends state to FriendsList for rendering */}
        <FriendsList friends={friends} />
      </div>
      <div>
        <h2>Pending Requests</h2>
        {/* Pass pendingRequests state to FriendsPending for rendering */}
        {/* <FriendsPending requests={pendingRequests} onAccept={() => console.log('Accepted')} /> */}
      </div>
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          {searchResults.map(user => (
            <div key={user._id}>
              {user.firstName} {user.lastName} - {user.email}
              <button onClick={() => sendFriendRequest(user._id)}>Add Friend</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Friends;

