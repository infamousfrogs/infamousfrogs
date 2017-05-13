import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Modal from 'react-modal';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};



class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalIsOpen2: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.userChange = this.userChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.openModal2 = this.openModal2.bind(this);
    this.formSubmit2 = this.formSubmit2.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  openModal2() {
    this.setState({modalIsOpen2: true});
  }

  afterOpenModal() {

  }

  closeModal() {
    this.setState({modalIsOpen: false});
    this.setState({modalIsOpen2: false});
  }

  passwordChange(e) {
    e.preventDefault();
    this.setState({password: e.target.value});
  }

  userChange(e) {
    e.preventDefault();
    this.setState({username: e.target.value});
  }

  formSubmit(e) {
    e.preventDefault();
    var obj = {
      username: this.state.username,
      password: this.state.password
    };
    var self = this;
    $.ajax({
      type: 'POST',
      url: '/login',
      contentType: 'application/json',
      data: JSON.stringify(obj),
      dataType: 'text',
      success: (data) => {
        data = JSON.parse(data);
        if (data.id) {
          self.props.handleLogin(data);
          self.setState({user: data});
          self.closeModal();
        } else if (data.userdoesnotexist) {
          alert('User does not exist! Try again!');
        } else if (data.incorrectpassword) {
          alert('Password is Incorrect! Try again!');
        }
      }
    });

  }

  formSubmit2(e) {
    e.preventDefault();
    var obj = {
      username: this.state.username,
      password: this.state.password
    };
    var self = this;
    $.ajax({
      type: 'POST',
      url: '/register',
      contentType: 'application/json',
      data: JSON.stringify(obj),
      dataType: 'text',
      success: (data) => {
        data = JSON.parse(data);
        if (data.id) {
          self.props.handleLogin(data);
          self.setState({user: data});
          self.closeModal();
        } else if (data.useralreadyexists) {
          alert('User already exists! Try another username!');
        }
      }
    });
  }

  render() {
    let userMessage;
    let formType;
    if (this.state.user) {
      userMessage = (
        `Welcome ${this.state.user.username}!`
      );
    } else {
      userMessage = (
        'Log in in to customise your favorites!'
      );
    }

    return (
     <MuiThemeProvider>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <h3 className="app-name"> Simply Recipes </h3>
          </div>
          <p className="navbar-text navbar-center"> {userMessage} </p>
          <div className="btn-group pull-right">
            <RaisedButton label="Sign Up" onClick = {this.openModal2} role="button"> </RaisedButton>
            <RaisedButton label="Log In" onClick = {this.openModal} role="button"> </RaisedButton>
          </div>
          <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Modal"
            >

            <div className="container">
                <div className="row">
                <div className="span12">
                  <div className="form-horizontal">
                    <fieldset>
                      <div id="legend">
                        <legend className="">Login</legend>
                      </div>
                      <div className="control-group">
                        <label className="control-label" htmlFor="username">Username</label>
                        <div className="controls">
                          <input onChange = {this.userChange} type="text" id="username" name="username" placeholder="" className="input-xlarge" />
                        </div>
                      </div>
                      <div className="control-group">
                        <label className="control-label" htmlFor="password">Password</label>
                        <div className="controls">
                          <input onChange = {this.passwordChange} type="password" id="password" name="password" placeholder="" className="input-xlarge" />
                        </div>
                      </div>
                      <div className="control-group">
                        <div className="controls">
                          <RaisedButton label="Login" onClick = {this.formSubmit}></RaisedButton>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
            </Modal>
            <Modal
                isOpen={this.state.modalIsOpen2}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Modal"
              >

              <div className="container">
                  <div className="row">
                  <div className="span12">
                    <div className="form-horizontal">
                      <fieldset>
                        <div id="legend">
                          <legend className="">Sign Up</legend>
                        </div>
                        <div className="control-group">
                          <label className="control-label" htmlFor="username">Username</label>
                          <div className="controls">
                            <input onChange = {this.userChange} type="text" id="username" name="username" placeholder="" className="input-xlarge" />
                          </div>
                        </div>
                        <div className="control-group">
                          <label className="control-label" htmlFor="password">Password</label>
                          <div className="controls">
                            <input onChange = {this.passwordChange} type="password" id="password" name="password" placeholder="" className="input-xlarge" />
                          </div>
                        </div>
                        <div className="control-group">
                          <div className="controls">
                            <RaisedButton label="Sign Up" onClick = {this.formSubmit2}></RaisedButton>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
              </Modal>
        </div>
      </nav>
     </MuiThemeProvider>
    );
  }
}

export default Nav;
