import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import API from "./API";

class LifeStatusUpdateForm extends React.Component {
  state = {
    finances: null,
    dating: null,
    social: null,
    spiritual: null,
    health: null
  };

  handleLifeStatusUpdateSubmit = () => { 
    const { finances, dating, social, spiritual, health } = this.state;
    API.lifeStatusUpdate({ finances, dating, social, spiritual, health })
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

 
  getUserData = () => {
    API.getUserData()
      .then(data => {
        if (data.error) {
          throw Error(data.error);
        } else {
          this.props.giveMeUserData(data);
          this.props.history.push("/");
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div style={{ paddingTop: '100px' }} >
        <form 
        style={{ borderRadius: '25px' }}>
          <label style={{ paddingRight: '15px'}}>Finances</label>
          <select
            onChange={e => this.handleChange(e)}
            name="finances"
          >
            <option type="number" value="0">
              0
            </option>
            <option type="number" value="1">
              1
            </option>
            <option type="number" value="2">
              2
            </option>
            <option type="number" value="3">
              3
            </option>
            <option type="number" value="4">
              4
            </option>
            <option type="number" value="5">
              5
            </option>
            <option type="number" value="6">
              6
            </option>
            <option type="number" value="7">
              7
            </option>
            <option type="number" value="8">
              8
            </option>
            <option type="number" value="9">
              9
            </option>
            <option type="number" value="10">
              10
            </option>
          </select>
          <br></br><br></br>
          <label style={{ paddingRight: '15px'}}>Dating/Relationship</label>
          <select
            onChange={e => this.handleChange(e)}
            name="dating"
          >
            <option type="number" value="0">
              0
            </option>
            <option type="number" value="1">
              1
            </option>
            <option type="number" value="2">
              2
            </option>
            <option type="number" value="3">
              3
            </option>
            <option type="number" value="4">
              4
            </option>
            <option type="number" value="5">
              5
            </option>
            <option type="number" value="6">
              6
            </option>
            <option type="number" value="7">
              7
            </option>
            <option type="number" value="8">
              8
            </option>
            <option type="number" value="9">
              9
            </option>
            <option type="number" value="10">
              10
            </option>
          </select>
          <br></br><br></br>
          <label style={{ paddingRight: '15px'}}>Social</label>
          <select
            onChange={e => this.handleChange(e)}
            name="social"
          >
            <option type="number" value="0">
              0
            </option>
            <option type="number" value="1">
              1
            </option>
            <option type="number" value="2">
              2
            </option>
            <option type="number" value="3">
              3
            </option>
            <option type="number" value="4">
              4
            </option>
            <option type="number" value="5">
              5
            </option>
            <option type="number" value="6">
              6
            </option>
            <option type="number" value="7">
              7
            </option>
            <option type="number" value="8">
              8
            </option>
            <option type="number" value="9">
              9
            </option>
            <option type="number" value="10">
              10
            </option>
          </select>
          <br></br><br></br>
          <label style={{ paddingRight: '15px'}}>Spirituality</label>
          <select
            onChange={e => this.handleChange(e)}
            name="spiritual"
          >
            <option type="number" value="0">
              0
            </option>
            <option type="number" value="1">
              1
            </option>
            <option type="number" value="2">
              2
            </option>
            <option type="number" value="3">
              3
            </option>
            <option type="number" value="4">
              4
            </option>
            <option type="number" value="5">
              5
            </option>
            <option type="number" value="6">
              6
            </option>
            <option type="number" value="7">
              7
            </option>
            <option type="number" value="8">
              8
            </option>
            <option type="number" value="9">
              9
            </option>
            <option type="number" value="10">
              10
            </option>
          </select>
          <br></br><br></br>
          <label style={{ paddingRight: '15px'}}>Health/Fitness</label>
          <select
            onChange={e => this.handleChange(e)}
            name="health"
          >
            <option type="number" value="0">
              0
            </option>
            <option type="number" value="1">
              1
            </option>
            <option type="number" value="2">
              2
            </option>
            <option type="number" value="3">
              3
            </option>
            <option type="number" value="4">
              4
            </option>
            <option type="number" value="5">
              5
            </option>
            <option type="number" value="6">
              6
            </option>
            <option type="number" value="7">
              7
            </option>
            <option type="number" value="8">
              8
            </option>
            <option type="number" value="9">
              9
            </option>
            <option type="number" value="10">
              10
            </option>
          </select>
        </form>
        <br></br>
        <button 
          className="ui green button"
          onClick={() => this.handleLifeStatusUpdateSubmit()}
          style={{ borderRadius: '25px' }}
          >
            Update
          </button>
          <button 
          className="ui black button"
          onClick={() => this.props.toggleState()}
          style={{ borderRadius: '25px' }}
          >
            Back
          </button>
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
  )(LifeStatusUpdateForm)
);
