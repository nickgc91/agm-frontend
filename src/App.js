import React from "react";
import { Route, withRouter } from "react-router-dom";
import "./css/App.css";
import LoginForm from "./components/LoginForm";
import StatusPage from "./components/StatusPage";
import API from "./components/API";
import { connect } from "react-redux";
import GoalsTracker from "./components/GoalsTracker";
import Journaling from "./components/Journaling";
import JournalEntries from "./components/JournalEntries"

class App extends React.Component {

  componentDidMount() {
    if (localStorage.getItem("token") !== undefined) {
      API.validate()
        .then(data => {
          if (data.error) {
            this.props.history.push('/signin')
          } else {
            
            this.props.signIn(data);
          }
        })
        .catch(error => {
        });
    } else {
      
    }
  }


  render() {
    return (
      <body>
      <div className='main-container'>
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
          component={routerProps => {
            return <StatusPage {...routerProps} />}
          }
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
        <Route
          exact
          path="/journal-entries"
          component={routerProps => {
            return <JournalEntries {...routerProps} />;
          }}
        />
      </div>
      </body>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signIn: user => {
    dispatch({ type: "SIGN_IN", payload: user });
  },
  giveMeUserData: user => {
    dispatch({ type: "GIVE_ME_USER_DATA", payload: user });
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
