import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Vote from '../../../src/Images/vote.png'
class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container">
          <img src={Vote} height="70px"/>
          <b> <Link className="navbar-brand" style={{ color: "#d9534f" }} to={"/login"}>Digital Voting</Link>
          </b>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {this.props.auth.isAuthenticated === true ?
              <span>
                <li className="nav-item">
                <Link className="nav-link" to={"/dashboard"}>{this.props.auth.user.email.substring(0,10)}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"} onClick={() => this.props.logoutUser()}>Logout</Link>
                </li>
                </span>
                :
                <span>
                <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>Sign up</Link>
              </li>
              </span>
              }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);