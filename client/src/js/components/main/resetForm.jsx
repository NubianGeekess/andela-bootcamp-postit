import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { connect } from "react-redux";
import Api from '../../utils/api';
import { Welcome } from './../partials/';
import '../../../styles/index.scss';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.onRequestReset = this.onRequestReset.bind(this);
    this.closeError = this.closeError.bind(this);    
    this.state = {
      responseMessage: "",
      requestButtonClassName: "btn waves-effect waves-light",
      hasStatus: false
    };
  }

  onRequestReset(e) {
    e.preventDefault();
    if (this.state.responseMessage === `password reset link sent,
         please check your email`) {
      this.setState({
        responseMessage: "",
        requestButtonClassName: "btn waves-effect waves-light"
      });
      return null;
    }
    const email = `email=${this.email.value}`;
    Api(email, "/api/v1/users/reset/request/", "POST", null).then(
        (response) => {
          console.log(response);
          if (response.data.error === undefined) {
            this.setState({
              responseMessage: "password reset link sent, please check your email",
              hasStatus: true,
              requestButtonClassName: "btn waves-effect waves-light disabled"
            });
          }
        }
    );
  }

  onChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  closeError(e) {
    e.preventDefault();
    this.setState({
      hasStatus: false
    });
  }

  render() {
    return (
        <div id="indexContainer" className="teal lighten-5">
            <div id="mainContainer" className="row">
                <Welcome />
                <div className="col s12 m6 indexSideTwo flexCentered">
                    <div id="authCapsules">
                        <Link to="/register" className="capsule btn teal">
                            Sign Up
                        </Link>
                        <Link to="/login" className="capsule btn cyan">
                            Sign In
                        </Link>
                    </div>
                    <p>Forgot Password?</p>
                    <form id="forgotPass" className="row">
                        <p className="flow-text center-align">
                            It&rsquo;s normal for humans to forget
                        </p>
                        {this.state.hasStatus &&
                        <div className="chip green white-text center" style={{ 
                            width: "100%",
                            fontSize: "12px"
                         }}>
                          {this.state.responseMessage}
                          <i className="close material-icons">close</i>
                        </div>}
                        <div className="input-field col s12">
                            <input className="center"
                                    type="email"
                                    id="email_forgot"
                                    ref={(input) => { this.email = input; } }/>
                            {/* <!-- you can apply autofocus here,
                                its gives an awesome user experience  --> */}
                            <label htmlFor="email_forgot"
                                className="amber-text">
                                What&rsquo;s your email?
                            </label>
                            <div className="input-field col s12 center center-align">
                                <button onClick={this.onRequestReset}
                                className={this.state.requestButtonClassName}
                                        type="submit">Reset my password
                                </button>
                                <p className="center">
                                <Link to="/login"><span>SIGN IN</span></Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  }
}

export default ResetPassword;