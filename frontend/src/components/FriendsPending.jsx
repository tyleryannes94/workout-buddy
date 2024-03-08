const PendingRequests = ({ requests, onAccept }) => {
    return (
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            {request.firstName} {request.lastName}
            {/* Assuming you have an endpoint to accept friend requests */}
            <button onClick={() => onAccept(request._id)}>Accept</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default PendingRequests;