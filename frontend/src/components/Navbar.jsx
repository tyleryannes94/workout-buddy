import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link to="/dashboard">Dash</Link>
        </li>
        <li>
          {/* Assuming you will have a route for friends in the future */}
          <Link to="/friends">Friends</Link>
        </li>
        <li>
          {/* Assuming you will have a route for analytics in the future */}
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
          <Link to="/meals">Meal Plan</Link>
        </li>
        <li>
          <Link to="/workouts">Workouts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
