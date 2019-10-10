import React from "react";
import { Route, withRouter } from 'react-router-dom'
import "./css/Login.css";
import LoginForm from './LoginForm'
import App from './App'

class Login extends React.Component {

    state = {
        username: ''
    }

    signIn = username => {
        this.setState({ username })
    }

    signOut = () => {
        this.setState({ username: '' })
    }

  render() {
    return (
        <div>
        <Route
          exact
          path='/signin'
          component={routerProps => {
            return (
              <LoginForm {...routerProps}/> 
            )
          }}
        />
        <Route
          exact
          path='/app'
          component={props => (
            <App {...props} />
          )}
        />{' '}
      </div>
      
    );
  }
}

export default withRouter(Login);


