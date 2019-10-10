import React from "react";
import { Route, withRouter } from "react-router-dom";
import "./css/Login.css";
import LoginForm from "./LoginForm";
import App from "./App";
import API from "./API"

class Login extends React.Component {
  state = {
    username: ""
  };

  signIn = user => {
    this.setState({ username: user.username });
    localStorage.setItem("token", user.token);
  };

  signOut = () => {
    this.setState({ username: "" });
    localStorage.removeItem("token");
  };

  componentDidMount() {
    if (localStorage.getItem("token") !== undefined) {
      API.validate()
        .then(data => {
          if (data.error) {
            throw Error(data.error);
          } else {
            this.signIn(data);
            this.props.history.push("/app");
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  }

  render() {
    return (
      <div>
        <Route
          exact
          path="/signin"
          component={routerProps => {
            return <LoginForm {...routerProps} signIn={this.signIn} />;
          }}
        />
        <Route
          exact
          path="/app"
          component={routerProps => (
            <App
              {...routerProps}
              username={this.state.username}
              signOut={this.signOut}
              signIn={this.signIn}
            />
          )}
        />{" "}
      </div>
    );
  }
}

export default withRouter(Login);
