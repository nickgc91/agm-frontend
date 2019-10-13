import React from "react";
import API from './API'

class NewGoalForm extends React.Component {

  state = {
    goalName: "",
    actionItem1: "",
    actionItem2: "",
    actionItem3: ""
  };

  handleNewGoalSubmit = e => {
    const { goalName, actionItem1, actionItem2, actionItem3 } = this.state;
    API.postNewGoal({ goalName, actionItem1, actionItem2, actionItem3})
      .then(data => {
        if (data.error) {
          throw Error(data.error);
        } else {
          return null;
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
          style={{ width: 200 }}
          type="text"
          name="goalName"
          placeholder="goal name"
        />{" "}
        <label>Action Item 1</label>
        <input
          onChange={e => this.handleChange(e)}
          style={{ width: 200 }}
          type="text"
          name="actionItem1"
          placeholder="action-item-1"
        />{" "}
        <label>Action Item 2</label>
        <input
          onChange={e => this.handleChange(e)}
          style={{ width: 200 }}
          type="text"
          name="action-item-2"
          placeholder="actionItem2"
        />{" "}
        <label>Action Item 3</label>
        <input
          onChange={e => this.handleChange(e)}
          style={{ width: 200 }}
          type="text"
          name="actionItem3"
          placeholder="action-item-3"
        />
      </div>
      <button className="ui green button">Add New Goal</button>
      <button onClick={() => this.props.hideNewGoalForm()} className="ui green button">Back To Goals</button>
    </form>
  );
    }
};

export default NewGoalForm;
