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
          <Link to="/friends">Friends</Link>
        </li>
        {/* <li>      this will remain here for future development
          <Link to="/analytics">Analytics</Link>
        </li> */}
        <li>
          <Link to="/meals">Meal Plan</Link>
        </li>
        <li>
          <Link to="/workouts">Workouts</Link>
        </li>
        <li>
          <Link to="/calendar">Calendar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
