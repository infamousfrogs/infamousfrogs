import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';


const Nav = (props) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <h3>Recipe-O-Maker</h3>
      </div>
      <p className="navbar-text navbar-center">Welcome 'Enter Username'!</p>
      <div className="btn-group pull-right">
        <Link className="btn navbar-btn btn-success" role="button" to="/signup">Sign Up</Link>
        <Link className="btn navbar-btn btn-success" role="button" to="/login">Log In</Link>
      </div>
    </div>
  </nav>
);

export default Nav;
