import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../css/GoalsTracker.css";
import API from "./API";
import NavBar from "./NavBar";
import NewGoalForm from "./NewGoalForm";

class GoalsTracker extends React.Component {
  componentDidMount() {
    this.retrieveGoalsData();
  }

  goals = [];

  state = {
    showNewGoalForm: false,
    showActionItems: false,
    showDeleteButton: true
  };

  handleCompletedActionItem = itemId => {
    API.updateItemActionIsCompleted({ id: itemId })
      .then(data => {
        if (data.error) {
          throw Error(data.error);
        } else {
          this.retrieveGoalsData();
          if (
            this.props.userData.goals[0].goal[2].completion_status === "100%"
          ) {
            // return null do something with this later --> completed goal
          }
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  showActionItems = () => {
    this.setState({
      showActionItems: !this.state.showActionItems
    });
  };

  hideNewGoalForm = () => {
    this.setState({
      showNewGoalForm: false
    });
  };

  handleDeleteClick = e => {
    const goalId = e._dispatchInstances.key;
    API.deleteGoal({ goalId })
      .then(data => {
        if (data.error) {
          throw Error(data.error);
        } else {
          this.retrieveGoalsData();
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  retrieveGoalsData = () => {
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
    if (!this.props.userData) return <div>Loading user info</div>;

    return (
      <div>
        <NavBar />
        <div className="grid-container2">
          <div className="grid-item11">
            <h1> Your Current Goals </h1>
          </div>
          <div className="grid-item22" height="700" width="500">
            <img
              style={{ borderRadius: "20%" }}
              src="https://images.unsplash.com/photo-1543682704-15adeb008ac4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
              alt="Smiley face"
              height="700"
              width="auto"
            />
          </div>
          <div className="grid-item33">
            <div
              style={{
                borderRadius: "20%",
                padding: "20px",
                height: "auto",
                width: "550px",
                margin: "0 auto",
                border: "solid"
              }}
            >
              <h2>Goals:</h2>
              <div style={{ padding: "20px" }}>
                {this.props.userData.goals[0].numOfGoals === 0 ? (
                  <h3 style={{ color: "red" }}>
                    You are not currently working on any goals. Add a goal
                    below.
                  </h3>
                ) : (
                  <div>
                    <button
                      onClick={() => this.showActionItems()}
                      className="ui small button"
                    >
                      Show/Hide Action Items
                    </button>

                    {this.state.showActionItems ? (
                      <h4 style={{ color: "#236B8E" }}><u>Click on an action item to mark it as complete
                      </u></h4>
                    ) : null}
                    <div style={{ padding: "20px", textAlign: "center" }}>
                      <ul
                        style={{ textAlign: "left", display: "inline-block" }}
                      >
                        {this.props.userData.goals.map(mygoal => {
                          return (
                            <div key={mygoal.goal[0]}>
                              <li style={{ padding: "10px" }}>
                                {mygoal.goal[2].completion_status === 100.0 ? (
                                  <div>
                                    <h3
                                      style={{ textDecoration: "line-through" }}
                                    >
                                      {mygoal.goal[1]}{" "}
                                      <i
                                        className="em em-white_check_mark"
                                        aria-roledescription="presentation"
                                        aria-label="WHITE HEAVY CHECK MARK"
                                      ></i>{" "}
                                    </h3>
                                    <h4>Congrats! You smashed your goal!</h4>
                                  </div>
                                ) : (
                                  <h3>{mygoal.goal[1]}</h3>
                                )}{" "}
                              </li>
                              {this.props.userData.goals[0].numOfGoals ===
                              0 ? null : mygoal.goal[2].completion_status ===
                                "" ? (
                                <h4 style={{ display: "inline" }}>
                                  {" "}
                                  You haven't set any action items for this
                                  goal.
                                </h4>
                              ) : (
                                <h4
                                  style={{
                                    display: "inline",
                                    paddingLeft: "10px"
                                  }}
                                >
                                  Completion Status:{" "}
                                  {Math.round(
                                    mygoal.goal[2].completion_status
                                  ) + "%"}
                                </h4>
                              )}{" "}
                              <br></br><br></br>
                              {/* this next part of code checks if the user wants to see the action items for their goals. 
                      If the goal is completed it is striked out as complete. This logic also looks at whether 
                      the action item is an empty string and does not display it if it is an empty string. */}
                              {this.state.showActionItems ? (
                                // <div style={{ border: "solid", borderColor: "purple", borderRadius: "20%", padding: '5px' }}>
                                <div>
                                <h4 style={{ color: "black" }}> <b>Action Items:</b></h4>
                                <ul>
                                  {mygoal.action.map((myAction, index) => {
                                    return myAction.action !== "" ? (
                                      myAction.isComplete ? (
                                        <li key={index}>
                                          <h4
                                            style={{ color: 'black',
                                              textDecoration: "line-through"
                                            }}
                                          >
                                            {myAction.action}{" "}
                                            <i
                                              className="em em-white_check_mark"
                                              aria-roledescription="presentation"
                                              aria-label="WHITE HEAVY CHECK MARK"
                                            ></i>
                                          </h4>
                                        </li>
                                      ) : (
                                        <li
                                          key={index}
                                          style={{ padding: "5px" }}
                                        >
                                          <h4
                                            style={{
                                              color: '#236B8E',
                                              textAlign: "left",
                                            }}
                                            onClick={() =>
                                              this.handleCompletedActionItem(
                                                myAction.id
                                              )
                                            }
                                          >
                                            <u>{myAction.action}</u>
                                          </h4>
                                        </li>
                                      )
                                    ) : null;
                                  })}
                                </ul> </div>
                              ) : null}
                              <br></br>
                              {this.props.userData.goals[0].numOfGoals === 0 ||
                              !this.state.showDeleteButton ? null : (
                                <button
                                  key={mygoal.goal[0]}
                                  className="ui small red button"
                                  onClick={e => this.handleDeleteClick(e)}
                                >
                                  Delete Goal
                                </button>
                              )}
                              <br></br>
                              <br></br>
                            </div>
                          );
                        })}
                      </ul>{" "}
                    </div>
                  </div>
                )}
              </div>

              {!this.state.showNewGoalForm ? (
                <button
                  onClick={() => this.setState({ showNewGoalForm: true })}
                  className="ui small green button"
                >
                  Add New Goal
                </button>
              ) : null}
              {this.state.showNewGoalForm ? (
                <NewGoalForm hideNewGoalForm={this.hideNewGoalForm} />
              ) : null}
              <br></br>
              <br></br>
              <button
                onClick={() => this.props.history.push("/")}
                className="ui small button"
              >
                Back To Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user,
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
  )(GoalsTracker)
);
