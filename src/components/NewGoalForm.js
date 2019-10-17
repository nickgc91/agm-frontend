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
          this.getStatusUpdate()
          this.props.hideNewGoalForm()
          this.props.history.push('/goals-tracker')
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
      <button className="ui green button">Add New Goal</button>
      <button onClick={() => this.props.hideNewGoalForm()} className="ui green button">Back To Goals</button>
    </form>
  );
    }
};


const mapStateToProps = state => ({
  userData: state.userData
});

const mapDispatchToProps = dispatch => ({
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


