import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../css/Journaling.css";
import API from "./API";
import NavBar from "./NavBar";
import { TextArea } from "semantic-ui-react";

class Journaling extends React.Component {
  componentDidMount() {
    this.getUserData()
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

            this.getUserData()
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
    if (!this.props.userData) return <div>Loading user info</div>;

    return (
      <div>
        <NavBar />
        <div className="grid-container4">
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
              <div style={{ backgroundColor: 'burlywood', borderRadius: "25px", padding: '20px', borderStyle: 'solid' }} >
          <h1>My Past Entries</h1>
          <div style={{ height: "30px" }}>
              </div>
            <div>
              {this.props.userData.journalings.map(journalEntry => {
                return (
                  <div key={journalEntry.journal_id}>
                    <div style={{ borderStyle: "solid", borderRadius: "25px" }}>
                      <h1>{journalEntry.journal_title}</h1>
                      <p>{journalEntry.journal_text}</p>
                    </div>
                    <br></br>
                  </div>
                );
              })}
            </div>
          </div>
          </div>
          <div className="grid-item43">
            <div>
              <form
                onSubmit={e => {
                  e.persist();
                  e.preventDefault();
                  e.target.title.value = '' 
                  e.target.text.value = ''
                  this.handleNewJournalEntrySubmit(e);
                }}
                className="ui form"
              >
                <div className="field">
                  <label>Today's Journal Entry Name</label>
                  <input
                    onChange={e => this.handleChange(e)}
                    style={{ width: 300 }}
                    type="text"
                    name="title"
                    placeholder="What are you writing about today?"
                  />

                  <label style={{ height: 15 }}></label>
                  <TextArea
                    onChange={e => this.handleChange(e)}
                    style={{
                      width: 600,
                      height: 300,
                      padding: 10,
                      borderStyle: "solid"
                    }}
                    type="TextArea"
                    name="text"
                    placeholder="Let it flow here.."
                  />
                </div>
                <button className="ui green button">Add New Journal Entry</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.userData
});

const mapDispatchToProps = dispatch => ({
  giveMeUserData: user => {
    dispatch({ type: "GIVE_ME_USER_DATA", payload: user });
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Journaling)
);
