import React from "react";
import "../css/App.css";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import API from './API'

class StatusPage extends React.Component {

  componentDidMount () {
  }

  render() {
    if (!this.props.currentUser) return (<div>Loading user info</div>)

    return (
      <div>
        <div className="grid-container">
          <div className="grid-item1">
            <h1>1 NAV BAR</h1>
            <h2>WELCOME {this.props.currentUser.username}</h2>
            <button onClick={() => {
              this.props.signOut()
              this.props.releaseUserData()
              this.props.history.push('/signin')
            }}>SIGN OUT</button>
          </div>
          <div className="grid-item2">
            <h1>2 GOALS TRACKER</h1>
            <h2>I am a {this.props.potatoe}</h2>
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

const mapStateToProps = state => ({
  currentUser: state.user,
  userData: state.userData
})

const mapDispatchToProps = dispatch => ({
  signIn: user => { dispatch({ type: 'SIGN_IN', payload: user})},
  signOut: () => { dispatch({ type: 'SIGN_OUT' })},
  releaseUserData: () => { dispatch({ type: 'RELEASE_USER_DATA'})}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatusPage));
