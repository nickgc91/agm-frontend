import React from "react";
import "../css/App.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import API from "./API";
import Chart from "./Chart";
import LifeStatusUpdateForm from "./LifeStatusUpdateForm";

class StatusPage extends React.Component {
  state = {
    updateLifeStatusTracker: false,
    showUpdateLastAccMeeting: false
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.getUserData()
      this.getStatusUpdate()
    } else {
      this.props.history.push('/signin')
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
          this.props.addUpdate(data)
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  toggleState = () => {
    this.setState({
      updateLifeStatusTracker: !this.state.updateLifeStatusTracker
    })
  }


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
      <div style={{ 'padding-bottom': '5.5rem' }} >
        <div className="grid-container">
          <div className="grid-item1">
            <div style={{ bordeStyle: "solid" }}>
              <h2
              style={{ padding: "20px" }}>
                <span role="img" aria-label="fire">
                  &#128513;
                </span>{" "}
                Welcome {currentUser.username}{" "}
                <span role="img" aria-label="fire">
                  &#128513;
                </span>
              </h2>
            </div>
          </div>
          <div className="grid-item2">
            <div className="goals-tracker">
              <h2
              >My Goals</h2>
              <h3>
                {" "}
                You are currently working on {userData.goals[0].numOfGoals}{" "}
                goals.
              </h3>
              <h3>
                Latest goal --> {userData.goals[userData.goals.length - 1].goal[1]}
              </h3>
              <br />
              <button
                style={{ width: '120px', borderRadius: "25px" }}
                className="black ui button"
                onClick={() => this.props.history.push("/goals-tracker")}
              >
                Update my goals..
              </button>
            </div>
          </div>
          <div className="grid-item3">
            <div className="status-updates">
              <h2>Latest Mastermind Updates</h2>
              <h3 style={{ color: "black", border: 'solid', borderRadius: '25px', padding: '7px' }}>
                
                <b>Latest Action Taken</b>
              
            </h3>
            {masterStatusUpdates.actionUpdates.map((update, index) => {
              return update[1] === currentUser.username ? (
                <p style={{ color: "#49fb35", borderBottom: 'ridge', borderColor: 'gray' }} key={index}>
                  You've made progress on your goals by completing this action: {update[0]}
                </p>
              ) : (
                <p style={{ borderBottom: 'ridge', borderColor: 'gray' }} key={index}>
                {update[1]} has made progress on his goals by completing this action: {update[0]}.
                </p>
              );
            })}
              <h3 style={{ color: "black", border: 'solid', borderRadius: '25px', padding: '7px' }}>
               
                  <b>Latest Goals Created</b>
                
              </h3>
              {masterStatusUpdates.goalUpdates.map((update, index) => {
                return update[1] === currentUser.username ? (
                  <p style={{ color: "#49fb35", borderBottom: 'ridge', borderColor: 'gray' }} key={index}>
                    {" "}
                    You've started working on this goal: {update[0]}.
                  </p>
                ) : (
                  <p style={{ borderBottom: 'ridge', borderColor: 'gray' }} key={index}>
                    {update[1]} has started working on this goal:{" "}
                    {update[0]}.
                  </p>
                );
              })} 
              <h3 style={{ color: "black", border: 'solid', borderRadius: '25px', padding: '7px' }}>
              
                  <b>Latest Journals Written</b>
                
              </h3>
              {masterStatusUpdates.journalingUpdates.map((update, index) => {
                return update[1] === currentUser.username ? (
                  <p style={{ color: "#49fb35", borderBottom: 'ridge', borderColor: 'gray' }} key={index}>
                    You've increased your level of self-awareness by writing a new journal entry.
                  </p>
                ) : (
                  <p key={index} style={{ borderBottom: 'ridge', borderColor: 'gray' }}>
                    {update[1]} has increased their self-awareness by writing a new journal entry.
                  </p>
                );
              })}
              <h3 style={{ color: "black", border: 'solid', borderRadius: '25px', padding: '7px' }}>
              
                  <b>Latest Life Status Updates</b>
              
              </h3>
              {masterStatusUpdates.lifeStatusUpdates.map((update, index) => {
                return update[0] === currentUser.username ? (
                  <p style={{ color: "#49fb35", borderBottom: 'ridge', borderColor: 'gray' }} key={index}>
                    You've spent time reflecting and updated your life status tracker.
                  </p>
                ) : (
                  <p key={index} style={{ borderBottom: 'ridge', borderColor: 'gray' }}>{update[0]} has spent time reflecting and updated their life status tracker.</p>
                );
              })}
            </div>
          </div>
          <div className="grid-item5">
            <div className="life-status-tracker">
              {!this.state.updateLifeStatusTracker ? (
                <div>
                <div style={{ paddingBottom: '20px' }}>
                <Chart />
                </div>
                <button
                  onClick={() =>
                    this.setState({ updateLifeStatusTracker: true })
                  }
                  className="black ui button"
                  style={{ textAlign: "center", width: '120px', borderRadius: "25px" }}
                >
                  Update Life Status
                </button> </div>
              ) : (
                <div><br></br>
                <LifeStatusUpdateForm toggleState={this.toggleState}/>
                </div>
              )}
            </div>
          </div>
          <div className="grid-item4">
            <div className="accountability-partner">
            { !this.state.showUpdateLastAccMeeting ? 
            <div style={{ padding: '20px' }}>
              <h1>
                My accountability partner is: {userData.accountability_partner.accPartner}{" "}
              </h1>
              <h3>The last time we talked was: {userData.accountability_partner.last_meeting}</h3>
              
              <button
              style={{ width: '120px', borderRadius: "25px" }}
                onClick={() => this.setState({ showUpdateLastAccMeeting: true })}
                className="black ui button"
              >
                Update
              </button></div> : <div style={{ padding: '20px' }}> <label style={{ paddingRight: '20px' }}>When did you last talk to you accountability partner?</label> <input className="field" id="date" type="date"></input>
              <br></br>
              <br></br>
              <button
                onClick={() => { 
                  this.handleDateUpdateClick()
                  this.setState({ showUpdateLastAccMeeting: false }) }}
                className="black ui button"
                style={{ width: '120px', borderRadius: "25px" }}
              >
                Save
            </button> </div> }
            </div>
          </div>
          { userData.journalings.length === 0 ? 
          <div className="grid-item6">
            <div className="journaling">
            <h2>Journaling</h2>
              <h3>You don't currently have any journal entries.</h3>
              <button
              style={{ width: '120px', borderRadius: "25px" }}
                className="black ui button"
                onClick={() => this.props.history.push("/journaling")}
              >
                My Journal
              </button>
            </div>
          </div> : <div className="grid-item6">
            <div className="journaling">
            <h2>Journaling</h2>
              <h3>Latest journal entry: <br></br><br></br>{userData.journalings[0].journal_title} was written on {userData.journalings[0].created}</h3> <br></br>
              <button
                className="black ui button"
                onClick={() => this.props.history.push("/journaling")}
                style={{ width: '120px', borderRadius: "25px" }}
              >
                My Journal
              </button>
            </div>
          </div> }
        
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user: currentUser, userData, goalUpdates, journalingUpdates, lifeStatusUpdates, actionUpdates }) => ({
  currentUser,
  userData,
  masterStatusUpdates: {
    goalUpdates,
    journalingUpdates,
    lifeStatusUpdates,
    actionUpdates,
  }
});

const mapDispatchToProps = dispatch => ({
  giveMeUserData: user => {
    dispatch({ type: "GIVE_ME_USER_DATA", payload: user });
  },
  addUpdate: update => 
    dispatch({ type: "ADD_MASTERMIND_STATUS_UPDATE", payload: update })
  
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StatusPage)
);
