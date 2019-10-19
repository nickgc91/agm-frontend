import React from "react";
import API from './API'
import { TextArea } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class NewGoalForm extends React.Component {

  state = {
    goalName: "",
    actionItem1: "",
    actionItem2: "",
    actionItem3: ""
  };

  handleChange = e => { 
    this.setState({ [e.target.name]: e.target.value})}

  handleNewGoalSubmit = e => {
    const { goalName, actionItem1, actionItem2, actionItem3 } = this.state;
    API.createNewGoal({ goalName, actionItem1, actionItem2, actionItem3})
      .then(data => {
        if (data.error) {
          throw Error(data.error);
        } else {
          this.getUserData()
          this.props.hideNewGoalForm()
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
      return (
    <form
      onSubmit={e => {
        e.persist();
        e.preventDefault();
        this.handleNewGoalSubmit(e);
      }}
      className="ui form"
    >
      <div className="field">
        <label>Goal Name</label>
        <input
          onChange={e => this.handleChange(e)}
          style={{ width: 300 }}
          type="text"
          name="goalName"
          placeholder="Type your goal here.."
        />{" "}
        <label>Action Item 1</label>
        <TextArea
        onChange={e => this.handleChange(e)}
        style={{ width: 300 }}
        name="actionItem1"
        placeholder="What is one action that you need to take to achieve this goal?"/>
        <label>Action Item 2</label>
        <TextArea 
          onChange={e => this.handleChange(e)}
          style={{ width: 300 }}
          name="actionItem2"
          placeholder="What is a second action that you need to take to achieve this goal?"
        />{" "}
        <label>Action Item 3</label>
        <TextArea
          onChange={e => this.handleChange(e)}
          style={{ width: 300 }}
          name="actionItem3"
          placeholder="What is a third action that you need to take to achieve this goal?"
        />
      </div>
      <button className="ui green button">Save Goal</button>
      <button onClick={() => this.props.hideNewGoalForm()} className="ui green button">Cancel</button>
    </form>
  );
    }
};


const mapStateToProps = state => ({
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
  )(NewGoalForm)
);


