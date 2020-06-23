import React from 'react';
import { Link } from 'react-router-dom';

const SidebarMenu = () => {
  return (
    <div className='SidebarMenu'>
      <nav
        id='sidebarMenu'
        class='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'
      >
        <div class='sidebar-sticky pt-3'>
          <ul class='nav flex-column'>
            <li class='nav-item'>
              <Link class='nav-link' to='/dashboard'>
                <i class='fas fa-home'></i> Dashboard
              </Link>
            </li>
            <li class='nav-item'>
              <Link class='nav-link' to='/students'>
                <i class='fas fa-users'></i> Students
              </Link>
            </li>
            <li class='nav-item'>
              <Link class='nav-link' to='/lessons'>
                <i class='fas fa-music'></i> Lessons
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default SidebarMenu;
