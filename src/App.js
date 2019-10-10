import React from "react";
import "./css/App.css";
import { withRouter } from 'react-router-dom'

class App extends React.Component {
  state = {
    users: []
  };

  fetchUserInfo = () => {
    return fetch("http://localhost:3000/users").then(resp => resp.json());
  };

  componentDidMount() {
    this.fetchUserInfo().then(users => this.setState({ users: users }));
  }

  render() {
    return (
      <div>
        <div className="grid-container">
          <div className="grid-item1">
            <h1>1 NAV BAR</h1>
          </div>
          <div className="grid-item2">
            <h1>2 GOALS TRACKER</h1>
            <div>
              {this.state.users.map(user => {
                return <h6 key={user.id}> {user.username} </h6>;
              })}
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
