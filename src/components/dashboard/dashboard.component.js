import React from 'react';
import jwtDecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    console.log(props)
    this.state = {
/*       username: this.props.location.state.username,
      email: this.props.location.state.email,
      id: this.props.location.state.id,
 */      isLoggedIn: false,
      didLogOut: false
    }
    this.logout = this.logout.bind(this);
  }
  componentDidMount(){
     axios.get('/checkToken')
    .then(res => {
//      console.log(res);
    })
    .catch(err => {
//      console.log(err)
    }) 

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

  logout(){
    //removing local storage token
    localStorage.removeItem('token');    
    this.setState({ didLogOut: true })
  }

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? 
          <div>
            <h3>{this.state.username}, welcome to your dashboard!!</h3>
            <button onClick={this.logout}>Logout</button>
          </div> :
          <div>
            <h5> You're not Logged in. Please login first...</h5>
          </div>
        }

        {this.state.didLogOut ? <Redirect to="/" /> : null}
      </div>
    )
  }
}

export default Dashboard;