const FriendsList = ({ friends }) => {
    return (
      <ul>
        {friends.map((friend) => (
          <li key={friend._id}>{friend.firstName} {friend.lastName}</li>
        ))}
      </ul>
    );
  };
  
  export default FriendsList;