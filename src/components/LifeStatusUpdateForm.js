import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import API from "./API";
import "../css/LifeStatusUpdateForm.css";

class LifeStatusUpdateForm extends React.Component {


  state = {
    finances: "",
    dating: "",
    social: "",
    spiritual: "",
    health: ""
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

  handleLifeStatusUpdateSubmit = () => {
    const { finances, dating, social, spiritual, health } = this.state;
    API.lifeStatusUpdate({ finances, dating, social, spiritual, health })
      .then(data => {
        if (data.error) {
          throw Error(data.error);
        } else {
          this.setState({ updateLifeStatusTracker: false });
          this.getUserData();
          this.getStatusUpdate()
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
          } else { console.log(data)
              data.map(array => { return array.reverse().map(item => this.props.addUpdate(`${item.user} has made progress working on a ${item.action}: ${item.name}`)
           )})
          }
            }
           )
        .catch(error => {
          alert(error);
        });
      }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="your-class">
        <form
          onSubmit={e => {
            e.persist();
            e.preventDefault();
            this.handleLifeStatusUpdateSubmit();
          }}
          className="ui form"
        >
          {/* <div className="field"> */}
          <label>Finances</label>
          <input
            onChange={e => this.handleChange(e)}
            style={{ width: 100 }}
            type="text"
            name="finances"
            placeholder="?"
          />
          <label>Dating</label>
          <input
            onChange={e => this.handleChange(e)}
            style={{ width: 100 }}
            type="text"
            name="dating"
            placeholder="?"
          />
          <label>Social</label>
          <input
            onChange={e => this.handleChange(e)}
            style={{ width: 100 }}
            type="text"
            name="social"
            placeholder="?"
          />
          <label>Spiritual</label>
          <input
            onChange={e => this.handleChange(e)}
            style={{ width: 100 }}
            type="text"
            name="spiritual"
            placeholder="?"
          />
          <label>Health</label>
          <input
            onChange={e => this.handleChange(e)}
            style={{ width: 100 }}
            type="text"
            name="health"
            placeholder="?"
          />

          <label style={{ height: 15 }}></label>

          {/* </div> */}
          <button className="ui green button">Update Life Status</button>
        </form>
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
