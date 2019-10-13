import React from "react";
import "../css/App.css";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import API from './API'
import Chart from './Chart'
import NavBar from './NavBar'


class StatusPage extends React.Component {

  componentDidMount () {
    this.getUserData()
  }

  getUserData = () => {API.getUserData()
    .then(data => {
      if (data.error) {
        throw Error(data.error);
      } else {
        this.props.giveMeUserData(data)
      }
    })
    .catch(error => {
      alert(error);
    })}

  render() {
    if (!this.props.currentUser || !this.props.userData) return (<div>Loading user info</div>)

    return (
      <div>
        <NavBar />
        <div className="grid-container">
          <div className="grid-item1">
            <div style={{ bordeStyle: 'solid' }}>
            <h2>&#128513; Welcome back {this.props.currentUser.username} &#128513;</h2>
            </div>
          </div>
          <div className="grid-item2">
            <div className='goals-tracker'>
              <h1>My Goals</h1>
              <h3> Currently working on # of goals </h3>
              <h3> Total # of goals completed: </h3>
              <br />
              <button 
              className="small ui button"
              onClick={() => this.props.history.push('/goals-tracker') }
              >Update my goals..</button>
            </div>
          </div>
          <div className="grid-item3">
            <div className='status-updates'>
            <h1>Latest Activity</h1>
            </div>
          </div>
          <div className="grid-item4">
            <div className='accountability-partner'>
              <h1>4 ACCOUNTABILITY PARTNER</h1>
              <h3>My accountability partner is: </h3>
              <h3>The last time we talked was: </h3>
            </div>
          </div>
          <div className="grid-item5">
          <div className='life-status-tracker'>
              <Chart />
            </div>
          </div>
          <div className="grid-item6">
            <div className='journaling'>
            <h1>6 JOURNALING</h1>
            </div>
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
  releaseUserData: () => { dispatch({ type: 'RELEASE_USER_DATA'})},
  giveMeUserData: user => { dispatch({ type: 'GIVE_ME_USER_DATA', payload: user })}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatusPage));
