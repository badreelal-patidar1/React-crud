import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Colleges from './containers/College/Colleges';
import CollegeForm from './containers/College/CollegeForm';
import Marksheet from './containers/Marksheet/Marksheet';
import Role from './containers/Role/Role';
import User from './containers/User/User';
import Student from './containers/Student/Student';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
            <Container>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/colleges' component={Colleges} />
                <Route exact path='/college/new' component={CollegeForm} />
                <Route exact path='/marksheet' component={Marksheet} />
                <Route exact path='/role' component={Role} />
                <Route exact path="/user" component={User} />
                <Route exact path="/student" component={Student} />
              </Switch>
            </Container>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
