import React from "react";
import "../css/App.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import API from "./API";
import Chart from "./Chart";
import NavBar from "./NavBar";
import LifeStatusUpdateForm from "./LifeStatusUpdateForm";

class StatusPage extends React.Component {
  state = {
    updateLifeStatusTracker: false
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.getUserData();
      this.getStatusUpdate();
    }
  }

  handleDateUpdateClick = () => {
    let element = document.getElementById("date");
    let date = element.value;
    API.updateDate({ date: date })
      .then(data => {
        if (data.error) {
          throw Error(data.error);
        } else {
          this.getUserData();
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  getStatusUpdate = () => {
    API.provideMastermindUpdates()
      .then(data => {
        if (data.error) {
          throw Error(data.error);
        } else {
          
          console.log(data);
          return (
          data[0].map(item =>
                this.props.addUpdate([
                  item[1],
                  `${item[1]} has made progress working on this goal: ${item[0]}.`
                ])
              ),
            data[1].map(item =>
              this.props.addUpdate([
                item[1],
                `${item[1]} has written a new journal entry.`
              ])
            ),
          data[2].map(item =>
            this.props.addUpdate([
              item[1],
              `${item[0]} has updated their life status tracker.`
            ])
          ),
        data[3].map(item =>
          this.props.addUpdate([
            item[1],
            `${item[1]} is focusing on this action item to crush their goal: ${item[0]}.`
          ])
        ))
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  getUserData = () => {
    API.getUserData()
      .then(data => {
        if (data.error) {
          throw Error(data.error);
        } else {
          this.props.giveMeUserData(data);
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    const { userData, currentUser, masterStatusUpdates } = this.props;

    if (!this.props.currentUser || !this.props.userData)
      return <div>Loading user info</div>;

    return (
      <div>
        <NavBar
          setAccountabilityPartnerToEmpty={this.setAccountabilityPartnerToEmpty}
        />
        <div className="grid-container">
          <div className="grid-item1">
            <div style={{ bordeStyle: "solid" }}>
              <h2>
                <span role="img" aria-label="fire">
                  &#128513;
                </span>{" "}
                Welcome back {currentUser.username}{" "}
                <span role="img" aria-label="fire">
                  &#128513;
                </span>
              </h2>
            </div>
          </div>
          <div className="grid-item2">
            <div className="goals-tracker">
              <h1>My Goals</h1>
              <h3>
                {" "}
                You are currently working on {userData.goals[0].numOfGoals}{" "}
                goals.
              </h3>
              <h3>
                Latest goal -->
                {userData.goals[userData.goals.length - 1].goal[1]}
              </h3>
              <br />
              <button
                className="black ui button"
                onClick={() => this.props.history.push("/goals-tracker")}
              >
                Update my goals..
              </button>
            </div>
          </div>
          <div className="grid-item3">
            <div className="status-updates">
              <h3><u><b>Latest goal-related activity..</b></u></h3>
              {masterStatusUpdates.slice(0,3).map((update, index) => {
                return (update[0] === currentUser.username ? <p style={{ color: 'purple' }} key={index}>{update[1]}</p> : <p key={index}>{update[1]}</p>) 
              })}
              <h3><u><b>Latest journaling-entry activity..</b></u></h3>
              {masterStatusUpdates.slice(3,6).map((update, index) => {
                return (update[0] === currentUser.username ? <p style={{ color: 'purple' }} key={index}>{update[1]}</p> : <p key={index}>{update[1]}</p>) 
              })}
              <h3><u><b>Latest life-status-tracking activity..</b></u></h3>
              {masterStatusUpdates.slice(6,9).map((update, index) => {
                return (update[0] === currentUser.username ? <p style={{ color: 'purple' }} key={index}>{update[1]}</p> : <p key={index}>{update[1]}</p>) 
              })}
              <h3><u><b>Latest action taken activity..</b></u></h3>
              {masterStatusUpdates.slice(9,12).map((update, index) => {
                return (update[0] === currentUser.username ? <p style={{ color: 'purple' }} key={index}>{update[1]}</p> : <p key={index}>{update[1]}</p>) 
              })}
            </div>
          </div>
          <div className="grid-item4">
            <div className="accountability-partner">
              <h1>
                My accountability partner is: {userData.accountability_partner}{" "}
              </h1>
              <h3>The last time we talked was: {userData.last_meeting}</h3>
              <input className="field" id="date" type="date"></input>
              <br></br>
              <br></br>
              <button
                onClick={() => this.handleDateUpdateClick()}
                className="black ui button"
              >
                Update
              </button>
            </div>
          </div>
          <div className="grid-item5">
            <div className="life-status-tracker">
              <Chart />
              {!this.state.updateLifeStatusTracker ? (
                <button
                  onClick={() =>
                    this.setState({ updateLifeStatusTracker: true })
                  }
                  className="black ui button"
                  style={{ textAlign: "center" }}
                >
                  Update Life Status
                </button>
              ) : (
                <LifeStatusUpdateForm />
              )}
            </div>
          </div>
          <div className="grid-item6">
            <div className="journaling">
              <h1>My Journal</h1>
              <h3>Last journal entry: </h3>
              <button
                className="black ui button"
                onClick={() => this.props.history.push("/journaling")}
              >
                Do some journaling..
              </button>
            </div>
          </div>
          <div className="grid-item7">
            <h1>7 FOOTER</h1>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user,
  userData: state.userData,
  masterStatusUpdates: state.mastermindStatusUpdates
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
  )(StatusPage)
);
