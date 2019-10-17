import React from "react";
import { Route, withRouter } from "react-router-dom";
import "./css/App.css";
import LoginForm from "./components/LoginForm";
import StatusPage from "./components/StatusPage";
import API from "./components/API";
import { connect } from "react-redux";
import GoalsTracker from "./components/GoalsTracker";
import Journaling from "./components/Journaling";

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem("token") !== undefined) {
      API.validate()
        .then(data => {
          if (data.error) {
            throw Error(data.error);
          } else {
            this.props.signIn(data);
            this.getStatusUpdate();
          }
        })
        .catch(error => {
          this.props.history.push("/signin");
        });
    } else {
      this.props.history.push("/signin");
    }
  }

  getStatusUpdate = () => {
    API.provideMastermindUpdates()
      .then(data => {
        if (data.error) {
          throw Error(data.error);
        } else {
          return (
            data[0].map(item => this.props.addUpdate(item)),
            data[1].map(item => this.props.addUpdate(item)),
            data[2].map(item => this.props.addUpdate(item)),
            data[3].map(item => this.props.addUpdate(item))
          );
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/signin"
          component={routerProps => {
            return <LoginForm {...routerProps} />;
          }}
        />
        <Route
          exact
          path="/"
          component={routerProps => <StatusPage {...routerProps} />}
        />
        <Route
          exact
          path="/goals-tracker"
          component={routerProps => {
            return <GoalsTracker {...routerProps} />;
          }}
        />
        <Route
          exact
          path="/journaling"
          component={routerProps => {
            return <Journaling {...routerProps} />;
          }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signIn: user => {
    dispatch({ type: "SIGN_IN", payload: user });
  },
  addUpdate: update => {
    dispatch({ type: "ADD_MASTERMIND_STATUS_UPDATE", payload: update });
  }
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
