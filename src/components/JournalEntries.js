import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../css/Journaling.css";
import API from "./API";
import NavBar from "./NavBar";

class JournalEntries extends React.Component {
  componentDidMount() {
    this.retrieveJournalData();
    this.props.updateJournalEntryToShow(localStorage.getItem("pageShow"))
  }
  

  handleDeleteClick = () => {
    let journalId = this.props.userData.journalings[this.props.journalToShow].journal_id
    API.deleteJournalEntry({ journalId })
      .then(data => {
        if (data.error) {
          throw Error(data.error);
        } else {
          localStorage.removeItem("pageShow")
          this.props.history.push("/journaling")
        }
      })
      .catch(error => {
        alert(error);
      });
  };


  retrieveJournalData = () => {
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
    
    if (!this.props.userData)
      return <div>Loading user info</div>;

    return (
      <div>
        <NavBar />
        <div style={{
        textAlign: 'center',
        padding: '100px'
      }}>
          <div
            style={{
              width: '1000px',
              margin: '0 auto',
              textAlign: 'center',
              opacity: '0.8',
              backgroundColor: "#236B8E",
              borderRadius: "25px",
              padding: '40px'
            }}
          >
            <div>
              <div style={{ background: 'white', padding: '30px' }} >
              <h1>{this.props.userData.journalings[this.props.journalToShow].journal_title}</h1>
              <p>{this.props.userData.journalings[this.props.journalToShow].journal_text}</p>
              <br></br>
              <button
              style={{ width: '120px', borderRadius: "25px" }}
                 className="ui small red button"
                 onClick={() => this.handleDeleteClick(this.props.journalToShow)}
                 >
                Delete Entry
                </button>
                <br></br><br></br>
                <button
                style={{ width: '120px', borderRadius: "25px" }}
                onClick={() => this.props.history.push("/journaling")}
                className="ui small button"
              >
                Journaling
              </button>
                <button
                style={{ width: '120px', borderRadius: "25px" }}
                onClick={() => this.props.history.push("/")}
                className="ui small button"
              
              >
                Home
              </button>
              </div>
            </div>
          </div>
            </div>
      </div> 
    );
  }
}

const mapStateToProps = state => ({
  userData: state.userData,
  journalToShow: state.updateJournalEntryToShow
});

const mapDispatchToProps = dispatch => ({
  giveMeUserData: user => {
    dispatch({ type: "GIVE_ME_USER_DATA", payload: user });
  },
  addUpdate: update => {
    dispatch({ type: "ADD_MASTERMIND_STATUS_UPDATE", payload: update });
  },
  updateJournalEntryToShow: update => {
    dispatch({ type: "UPDATE_JOURNAL_ENTRY_TO_SHOW", payload: update });
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(JournalEntries)
);
