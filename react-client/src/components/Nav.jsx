import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Modal from 'react-modal';
import $ from 'jquery';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';


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

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: -10,
    width: 150,
  },
};



class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalIsOpen2: false,
      allergens: []
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.userChange = this.userChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.openModal2 = this.openModal2.bind(this);
    this.formSubmit2 = this.formSubmit2.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  // ****** JEE ADDED FEATURE ******   
    onCheckPeanut(e) {
      if (e.target.checked) {
        this.state.allergens.push('peanut');
      } else {
        var index = this.state.allergens.indexOf('peanut');
        this.state.allergens.splice(index, 1);
      }
      console.log('Allergens:', this.state.allergens);
    }
    onCheckGluten(e) {
      if (e.target.checked) {
        this.state.allergens.push('gluten');
      } else {
        var index = this.state.allergens.indexOf('gluten');
        this.state.allergens.splice(index, 1);
      }
      console.log('Allergens:', this.state.allergens);
    }
    onCheckSesame(e) {
      if (e.target.checked) {
        this.state.allergens.push('sesame');
      } else {
        var index = this.state.allergens.indexOf('sesame');
        this.state.allergens.splice(index, 1);
      }
      console.log('Allergens:', this.state.allergens);
    }
    onCheckSulfite(e) {
      if (e.target.checked) {
        this.state.allergens.push('sulfite');
      } else {
        var index = this.state.allergens.indexOf('sulfite');
        this.state.allergens.splice(index, 1);
      }
      console.log('Allergens:', this.state.allergens);
    }
    onCheckTreeNut(e) {
      if (e.target.checked) {
        this.state.allergens.push('tree nut');
      } else {
        var index = this.state.allergens.indexOf('tree nut');
        this.state.allergens.splice(index, 1);
      }
      console.log('Allergens:', this.state.allergens);
    }
    onCheckDairy(e) {
      if (e.target.checked) {
        this.state.allergens.push('dairy');
      } else {
        var index = this.state.allergens.indexOf('dairy');
        this.state.allergens.splice(index, 1);
      }
      console.log('Allergens:', this.state.allergens);
    }
    onCheckEgg(e) {
      if (e.target.checked) {
        this.state.allergens.push('egg');
      } else {
        var index = this.state.allergens.indexOf('egg');
        this.state.allergens.splice(index, 1);
      }
      console.log('Allergens:', this.state.allergens);
    }
    onCheckWheat(e) {
      if (e.target.checked) {
        this.state.allergens.push('wheat');
      } else {
        var index = this.state.allergens.indexOf('wheat');
        this.state.allergens.splice(index, 1);
      }
      console.log('Allergens:', this.state.allergens);
    }
    onCheckSoy(e) {
      if (e.target.checked) {
        this.state.allergens.push('soy');
      } else {
        var index = this.state.allergens.indexOf('soy');
        this.state.allergens.splice(index, 1);
      }
      console.log('Allergens:', this.state.allergens);
    }
    onCheckSeafood(e) {
      if (e.target.checked) {
        this.state.allergens.push('seafood');
      } else {
        var index = this.state.allergens.indexOf('seafood');
        this.state.allergens.splice(index, 1);
      }
      console.log('Allergens:', this.state.allergens);
    }
    onCheckShellfish(e) {
      if (e.target.checked) {
        this.state.allergens.push('shellfish');
      } else {
        var index = this.state.allergens.indexOf('shellfish');
        this.state.allergens.splice(index, 1);
      }
      console.log('Allergens:', this.state.allergens);
    } // ****** END OF JEE ADDED FEATURE ******

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
      password: this.state.password,
      allergens: this.state.allergens.join(', ') // ****** JEE ADDED *******
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

  logOut() {
    $.ajax({
      type: 'DELETE',
      url: '/logout',
      success: (data) => {
        console.log('successfully logged out');
      },
      error: (data) => {
        console.log('error logging out');
      }
    });
  }

  render() {
    let userMessage;
    let formType;
    if (this.props.user) {
      userMessage = (
        `Welcome ${this.props.user.username}!`
      );
    } else {
      userMessage = (
        'Log in to customize your favorites!'
      );
    }

    return (
     <MuiThemeProvider>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <h3 className="app-name">What's In The Pantry™</h3>
          </div>
          <p className="navbar-text navbar-center centerTitle"> {userMessage} </p>
          <div className="btn-group pull-right logButton">
            {this.props.user ?
              <RaisedButton label="Log Out" onClick={this.props.handleLogout} role="button"> </RaisedButton> :
              <div>
                <RaisedButton label="Sign Up" onClick = {this.openModal2} role="button"> </RaisedButton>
                <RaisedButton label="Log In" onClick = {this.openModal} role="button"> </RaisedButton>
              </div>
            }
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
                          <RaisedButton className="submitButton" label="Login" onClick = {this.formSubmit}></RaisedButton>
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
                          <p>Sign up now for access to thousands of recipes!</p>
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

                        { /******* JEE ADDED FEATURE ******/ }
                            <br/>
                            <label>
                                Any food allergies we should know about? We'll filter your recipes for safe choices.
                            </label>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                              <Checkbox style={styles.checkbox} label='Peanut' type="checkbox" onCheck={this.onCheckPeanut.bind(this)} value="ingredient1"/>
                              <Checkbox style={styles.checkbox} label='Tree Nut' type="checkbox" onCheck={this.onCheckTreeNut.bind(this)} value="ingredient1"/> 
                              <Checkbox style={styles.checkbox} label='Dairy' type="checkbox" onCheck={this.onCheckDairy.bind(this)} value="ingredient1"/> 
                              <Checkbox style={styles.checkbox} label='Egg' type="checkbox" onCheck={this.onCheckEgg.bind(this)} value="ingredient1"/> 
                              <Checkbox style={styles.checkbox} label='Gluten' type="checkbox" onCheck={this.onCheckGluten.bind(this)} value="ingredient1"/>
                              <Checkbox style={styles.checkbox} label='Sesame' type="checkbox" onCheck={this.onCheckSesame.bind(this)} value="ingredient1"/>  
                            </div>
                            <br />
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                              <Checkbox style={styles.checkbox} label='Wheat' type="checkbox" onCheck={this.onCheckWheat.bind(this)} value="ingredient1"/> 
                              <Checkbox style={styles.checkbox} label='Soy' type="checkbox" onCheck={this.onCheckSoy.bind(this)} value="ingredient1"/> 
                              <Checkbox style={styles.checkbox} label='Seafood' type="checkbox" onCheck={this.onCheckSeafood.bind(this)} value="ingredient1"/> 
                              <Checkbox style={styles.checkbox} label='Shellfish' type="checkbox" onCheck={this.onCheckShellfish.bind(this)} value="ingredient1"/> 
                              <Checkbox style={styles.checkbox} label='Sulfite' type="checkbox" onCheck={this.onCheckSulfite.bind(this)} value="ingredient1"/> 
                            </div>
                            <br/>
                        { /******* END OF JEE ADDED FEATURE ******/ }

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
