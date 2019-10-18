import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../css/Journaling.css";
import API from "./API";
import NavBar from "./NavBar";
import { TextArea } from "semantic-ui-react";


class Journaling extends React.Component {
  componentDidMount() {
    this.retrieveJournalData();
  }

  retrieveJournalData = () => {
    API.getUserData()
      .then(data => {
        if (data.error) {
          throw Error(data.error);
        } else {
          this.props.giveMeUserData(data)
        }
      })
      .catch(error => {
        alert(error);
      });
  };


  render() {
    return <h1>hello</h1>;
  }
}

const mapStateToProps = state => ({
  userData: state.userData
});

const mapDispatchToProps = dispatch => ({
  giveMeUserData: user => {
    dispatch({ type: "GIVE_ME_USER_DATA", payload: user });
  },
  addUpdate: update => {
    dispatch({ type: "ADD_MASTERMIND_STATUS_UPDATE", payload: update });
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Journaling)
);
