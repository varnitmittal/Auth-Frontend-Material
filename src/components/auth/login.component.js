import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
      email: "",
      id: "",
      isLoggedIn: false
    }
  }

componentDidMount(){
    //checking if already logged in using jwt Token
    const lsToken = localStorage.getItem('token');
    if(lsToken){
      //decoding token to extract payload data
      const decoded = jwtDecode(lsToken);
      this.setState({
        username: decoded.username,
        email: decoded.email,
        id: decoded.id,
        isLoggedIn: true
      });
    }
  }

renderDashboard(){
  if(this.state.isLoggedIn){
    return <Redirect to={{
      pathname: "/dashboard",
      state: {
        id: this.state.id,
        username: this.state.username,
        isLoggedIn: this.state.isLoggedIn
      }
    }} />
  }
}

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
  e.preventDefault();
  const userData = {
    username: this.state.username,
    password: this.state.password
  };
  axios.post('/login', userData)
  .then(res => {
    if(res.data.error){
      window.alert(res.data.error)
    }
    else{
      console.log(res);      
      //setter
      localStorage.setItem('token', res.data.token)

/*       //getter
      const lsToken = localStorage.getItem('token');
        console.log(lsToken);
 */
      this.setState({
        id: res.data.userData.id,
        username: res.data.userData.username,
        isLoggedIn: true
      });
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
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="text"  
                />
                <label htmlFor="email">Username</label>
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
                  Login
                </button>
                {this.renderDashboard()}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
