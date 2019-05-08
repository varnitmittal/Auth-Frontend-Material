import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar.component";
import Landing from "./components/layout/landing.component";
import Register from "./components/auth/register.component";
import Login from "./components/auth/login.component";
import Dashboard from "./components/dashboard/dashboard.component";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard}/>
        </div>
      </Router>
    );
  }
}
export default App;