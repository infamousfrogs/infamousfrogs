import React from 'react';

const Nav = (props) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <h3>Recipe-O-Maker</h3>
      </div>
      <p className="navbar-text navbar-center">Welcome 'Enter Username'!</p>
      <div className="btn-group pull-right">
        <button className="btn navbar-btn btn-success">Sign Up</button>
        <button className="btn navbar-btn btn-success">Log In</button>
      </div>
    </div>
  </nav>
);

export default Nav;