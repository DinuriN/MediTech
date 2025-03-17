import React from 'react';
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <div>
      <ul className='nav'>
        <li className='nav-li'>
            <Link to ="/" className="active home-a">
            <h1>Book an appointment</h1>
            </Link>
        </li>

        <li className='nav-li'>
            <Link to ="/" className="active home-a">
            <h1>Online Pharmacy</h1>
            </Link>
        </li>

        <li className='nav-li'>
            <Link to ="/" className="active home-a">
            <h1>Patient Registration</h1>
            </Link>
        </li>

        <li className='nav-li'>
            <Link to ="/" className="active home-a">
            <h1>Doctor Profiles</h1>
            </Link>
        </li>

        <li className='nav-li'>
            <Link to ="/" className="active home-a">
            <h1>Lab Inventory</h1>
            </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
