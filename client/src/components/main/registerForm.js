import React from "react";
import { connect } from "react-redux";
// import Auth from "./../containers/";
// import registerUser from "../../actions/registerUser";
import loginUser from "../../actions/loginUser";
import Api from "../../utils/api";
import { Welcome } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
import "./../../stylesheet/Auth.css"; // Auth.scss

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.onRegisterUser = this.onRegisterUser.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = {
      error_message: ""
    };
  }

  onFocus() {
    this.setState({ error_message: "" });
  }

  onRegisterUser(e) {
    e.preventDefault();
    let { username, fullname, email, phoneNumber, password } = this;
    username = username.value.trim();
    fullname = fullname.value.trim();
    email = email.value.trim();
    phoneNumber = phoneNumber.value.trim();
    password = password.value;
    console.log(`${username},${fullname},${email},${phoneNumber},${password}`);
    if (username === ""
        || fullname === ""
        || email === ""
        || phoneNumber === ""
        || password === "") {
      this.setState({ error_message: "Error: please all field are required" });
      return;
    }
    const userString = `username=${username}&fullname=${fullname}&email=${email}
        &password=${password}&phone=${phoneNumber}`;
    Api(userString, "http://localhost:8000/api/users/signup", "POST", null).then(
      (_registerRes) => {
        if (_registerRes.error === undefined) {
          Api(userString, "http://localhost:8000/api/users/signin", "POST", null).then(
            (_loginRes) => {
              if (_loginRes.error === undefined) {
                this.props.onLoginUser(JSON.stringify(_loginRes));
                sessionStorage.setItem("user", JSON.stringify(_loginRes));
                window.location.hash = "/#/dashboard";
              } else {
                this.setState({ error_message: _loginRes.error.message });
              }
            }
          );
        } else {
          this.setState({ error_message: _registerRes.error.message });
        }
      }
    );
  }

  render() {
    return (
        <div id="indexContainer">
            <div id="mainContainer" className="row">
                <Welcome />
                <div className="col s12 m6 indexSideTwo">
                    <div id="authCapsules">
                        <a href="/#/register" className="capsule btn teal">
                            Sign Up
                        </a>
                        <a href="/#/login" className="capsule btn cyan">
                            Sign In
                        </a>
                    </div>
                    <form id="signUpForm" className="row" action="#">
                        <p className="flow-text"> &nbsp; Sign Up</p>
                        {/* this.state.error_message === "" ? "" :
                          <div className='red card' style={{ padding: "5px 10px" }}>
                            {this.state.error_message}
                          </div> */}
                        <div className="input-field col s12">
                          <input onFocus={this.onFocus}
                            type="text" id="fullname_signup"
                            ref = {(input) => { this.fullname = input; }}/>
                          <label htmlFor="fullname_signup">Fullname</label>
                        </div>
                        <div className="input-field col s12">
                        <input onFocus={this.onFocus}
                          type="text" id="username_signup"
                          ref = {(input) => { this.username = input; }}/>
                        <label htmlFor="username_signup">Username</label>
                        </div>
                        <div className="input-field col s12">
                        <input onFocus={this.onFocus}
                          type="password" id="password_signup"
                          ref = {(input) => { this.password = input; }}/>
                        <label htmlFor="password_signup">Password</label>
                        </div>
                        <div className="input-field col s12">
                        <input onFocus={this.onFocus}
                          type="email" id="email_signup"
                          ref = {(input) => { this.email = input; }}/>
                        <label htmlFor="email_signup">Email</label>
                        </div>
                         <div className="input-field col s12">
                          <input onFocus={this.onFocus}
                            type="number" id="phone_signup"
                            ref = {(input) => { this.phoneNumber = input; }}/>
                          <label htmlFor="phone_signup">Phone Number</label>
                        </div>
                        <div className="input-field col s12">
                        <button
                          onClick= { this.onRegisterUser }
                          className="btn waves-effect waves-light"
                          type="submit">
                             sign Up
                        </button>
                        <p>
                            <a href="/#/login">
                                <span>Already have an account</span>
                            </a>
                        </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
    onLoginUser: user => dispatch(loginUser(user))
  });

export default connect(null, mapDispatchToProps)(Register);
// export default Register;