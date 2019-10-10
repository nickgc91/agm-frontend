import React from "react";
import "./css/App.css";
import { withRouter } from 'react-router-dom'
import API from "./API";

class App extends React.Component {

  componentDidMount() {
    if (!this.props.username) {
        this.props.history.push('/signin')
      } 
  }

  render() {
    return (
      <div>
        <div className="grid-container">
          <div className="grid-item1">
            <h1>1 NAV BAR</h1>
            <button onClick={() => this.props.signOut()}>SIGN OUT</button>
          </div>
          <div className="grid-item2">
            <h1>2 GOALS TRACKER</h1>
            <div>
              <h1>hello</h1>
            </div>
          </div>
          <div className="grid-item3">
            <h1>3 STATUS UPDATES</h1>
          </div>
          <div className="grid-item4">
            <h1>4 ACCOUNTABILITY PARTNER</h1>
          </div>
          <div className="grid-item5">
            <h1>5 LIFE STATUS TRACKER</h1>
          </div>
          <div className="grid-item6">
            <h1>6 JOURNALING</h1>
          </div>
          <div className="grid-item7">
            <h1>7 FOOTER</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
