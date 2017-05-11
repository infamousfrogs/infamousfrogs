import React from 'react';
import $ from 'jquery';


class loginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  this.passwordChange = this.passwordChange.bind(this);
  this.userChange = this.userChange.bind(this);
  this.formSubmit = this.formSubmit.bind(this);

}

passwordChange(e) {
  e.preventDefault();
  this.setState({password: e.target.value})
}

userChange(e) {
  e.preventDefault();
  this.setState({username: e.target.value})
}

formSubmit(e) {
  e.preventDefault();
  var obj = {
    username: this.state.username,
    password: this.state.password
  }
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
        self.props.history.push('/')
      }
      else if (data.userdoesnotexist) {
        alert("User does not exist! Try again!")
      }
      else if (data.incorrectpassword) {
        alert("Password is Incorrect! Try again!")
      }
    }
  });

}

render() {
 return (
  <div className="container">
      <div className="row">
  		<div className="span12">
  			<div className="form-horizontal">
  			  <fieldset>
  			    <div id="legend">
  			      <legend className="">Login</legend>
  			    </div>
  			    <div className="control-group">
  			      <label className="control-label"  htmlFor="username">Username</label>
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
  			        <button onClick = {this.formSubmit} className="btn btn-success">Login</button>
  			      </div>
  			    </div>
  			  </fieldset>
  			</div>
  		</div>
  	</div>
  </div>

)
}
}

export default loginPage
