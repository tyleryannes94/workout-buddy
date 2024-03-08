const FriendsSearch = ({ onSearch }) => {
    const [query, setQuery] = useState('');
  
    const handleInputChange = (e) => {
      setQuery(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSearch(query);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  };
  
  export default FriendsSearch;
