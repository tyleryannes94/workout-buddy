import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        </li>
        <li>
          <Link to="/friends" className="hover:text-gray-300">Friends</Link>
        </li>
        <li>
          <Link to="/analytics" className="hover:text-gray-300">Analytics</Link>
        </li>
        <li>
          <Link to="/meals" className="hover:text-gray-300">Meal Plan</Link>
        </li>
        <li>
          <Link to="/workouts" className="hover:text-gray-300">Workout Plans</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
