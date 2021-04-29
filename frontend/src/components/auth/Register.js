import React, { Component } from "react";
import { Link , withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      //password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
render() {
    const { errors } = this.state;
return (
  <div className="auth-wrapper">
        <div className="auth-inner">
            <form noValidate onSubmit={this.onSubmit}>
              <h3>Sign Up</h3>
              <div className="form-group">
              <label htmlFor="name">Name</label>
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("form-control", {
                    invalid: errors.name
                  })}
                />
                
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="form-group">
              <label htmlFor="email">Email address</label>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("form-control", {
                    invalid: errors.email
                  })}
                />
                
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="form-group">
              <label htmlFor="password">Password</label>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("form-control", {
                    invalid: errors.password
                  })}
                />
                
                <span className="red-text">{errors.password}</span> 
              </div>
              {/* <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                />
                <label htmlFor="password2">Confirm Password</label>
              </div> */}
              <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
            </div>
            </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));