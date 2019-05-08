import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      hasBeenCreated: false
    };
  }

renderRedirect(){
  if(this.state.hasBeenCreated){
    return <Redirect to='/login' />
  }
}

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
  const newUser = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };
  axios.post('/signup', newUser)
  .then(res => {
    if(res.data.error){
      window.alert(res.data.error)
    } 
    else{
      window.alert("User Created");
      this.setState({ hasBeenCreated: true });
    }
  })
  .catch(err => {
    console.log("ERROR!!")
    console.log(err)
  })
};

render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.name}
                  id="username"
                  type="text"
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                />
                <label htmlFor="password2">Confirm Password</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
                {this.renderRedirect()}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
