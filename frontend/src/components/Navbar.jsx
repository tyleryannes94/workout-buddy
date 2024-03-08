import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul >
        <li>
          {/* add link  */}
          <a href="#">Dash</a>
        </li>
        <li>
          {/* add link  */}
          <a href="#">Friends</a>
        </li>
        <li>
          {/* add link  */}
          <a href="#">Analytics</a>
        </li>
        <li>
          {/* add link  */}
          <a href="#">Meal Plan</a>
        </li>
        <li>
          {/* add link  */}
          <a href="#">Workouts</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
