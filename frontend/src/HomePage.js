import React from 'react';
import Images from './Images/logo.png';

function HomePage() {
  return (
    <div className="home-page">
      <img src={Images} className='logo' alt="My Image" style={{ width: '200px', height: '150px' }} />
      <label className='welcome-msg'>Welcome to Digitalflake Admin</label>
    </div>
  );
}

export default HomePage;