import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '././MisLandingPage.css';
import Logo from './SAND 1 logo.png'; // Ensure this path is correct




const MisLandingPage = () => {
  const userId = '123'; 
  const navigate = useNavigate();
  const handleLogout = () => {
    // Confirm logout, then redirect to login
    if (window.confirm('Are you sure you want to log out?')) {
      navigate('/'); // Redirect to login page
    }
  };

  return (
    <div className="landing-page-container">
      <div className="sidebar">
        <div className="navbar">
          <img src={Logo} alt="Logo" className="logo" />
          <NavLink to=""  className="nav-link">
            Overview
          </NavLink>
          {/* <NavLink to="newClient"  className="nav-link">
            New Client
          </NavLink> */}
          <NavLink to="viewClients"  className="nav-link">
            View Clients
          </NavLink>
          <NavLink to="profile" className="nav-link">
            Profile
          </NavLink>
          {/* <NavLink to="newUser"  className="nav-link">
            New User
          </NavLink> */}
          <NavLink to="promoterAttendance"  className="nav-link">
            Promoter Attendance
          </NavLink>
          <input type="button" value="Logout" onClick={handleLogout} className="logout-button" />
        </div>
      </div>
    </div>
  );
};




export default MisLandingPage;
