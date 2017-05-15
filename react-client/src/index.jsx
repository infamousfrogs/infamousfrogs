import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import homePage from './viewComponents/homePage.jsx';


render(
  <Router>
    <Switch>
      <Route exact path = "/" component = {homePage}/>
    </Switch>
  </Router>,
  document.getElementById('app')
);
