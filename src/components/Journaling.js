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

  state = {
    title: "",
    text: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleNewJournalEntrySubmit = e => {
    const { title, text } = this.state;
    API.createNewJournalEntry({ title, text })
      .then(data => {
        if (data.error) {
          throw Error(data.error);
        } else {
          this.retrieveJournalData();
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
    if (!this.props.userData) return <div>Loading user info</div>;

    return (
      <div >
        <div className="grid-container4" >
          <div className="grid-item41">
            <h1>
              <i
                className="em em-writing_hand"
                aria-roledescription="img"
                aria-label="writing1"
              ></i>{" "}
              Journaling Time{" "}
              <i
                className="em em-writing_hand"
                aria-roledescription="img"
                aria-label="writing2"
              ></i>
            </h1>
          </div>
          <div className="grid-item42">
            <div className='ele'>
              <h2>
                My Past Journaling Entries
              </h2>
              <br></br>
              <div class="ui list">
                {this.props.userData.journalings.map((journalEntry, index) => {
                  return (
                    <div class="item" >
                      <div style={{ borderRadius: "25px" }}>
                        <a class="header"
                        onClick={e => {
                          debugger
                          localStorage.setItem("pageShow", e.target.id);
                          this.props.updateJournalEntryToShow(e.target.id)
                           this.props.history.push(`/journal-entries/`)}}
                        >
                          <h1 style={{ color: 'white' }}  id={index}>{journalEntry.journal_title}</h1>
                        </a>
                        <div class="description">
                          <h4>{journalEntry.journal_text.substr(0, 150)}...</h4>
                        </div>
                      </div>
                      <br></br>
                      
                    </div>
                  );
                })}
              </div>
              <br></br>
              <button
              style={{ width: '120px', borderRadius: "25px" }}
                onClick={() => this.props.history.push("/")}
                className="ui small black button"
              >
                Back To Home
              </button>
            </div>
          </div>
          <div className="grid-item43">
          <div className='ele'>
              <form
                onSubmit={e => {
                  e.persist();
                  e.preventDefault();
                  e.target.title.value = "";
                  e.target.text.value = "";
                  this.handleNewJournalEntrySubmit(e);
                }}
                className="ui form"
              >
                <div className="field">
                  <h2>Today's Journal Entry</h2>
                  <label style={{ font: 'bold', fontSize: '15px', color: 'white' }}>Title</label>
                  <input
                    onChange={e => this.handleChange(e)}
                    style={{ width: '280px' }}
                    type="text"
                    name="title"
                    placeholder="What are you writing about today?"
                    required
                  />

                  <label style={{ height: 15 }}></label>
                  <TextArea
                    onChange={e => this.handleChange(e)}
                    style={{
                      width: '540px',
                      height: 'auto',
                      padding: 10
                    }}
                    type="TextArea"
                    name="text"
                    placeholder="Let it flow here.."
                    required
                  />
                </div>
                <button className="ui small green button"
                style={{ width: '120px', borderRadius: "25px" }}
                >
                  Save Journal Entry
                </button>
              </form>
              
            </div>
          </div>
        </div>
      
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.userData,
  masterStatusUpdates: state.mastermindStatusUpdates,
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
  )(Journaling)
);
