import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import loginPage from './viewComponents/loginPage.jsx';
import homePage from './viewComponents/homePage.jsx';
import signUpPage from './viewComponents/signUpPage.jsx';

render(
  <BrowserRouter>
    <main>
    <Switch>
      <Route exact path = "/" component = {homePage}/>
      <Route path = "/login" component = {loginPage}/>
      <Route path = "/signup" component = {signUpPage}/>
    </Switch>
  </main>
  </BrowserRouter>,
  document.getElementById('app')
);