import React from 'react'
import { withRouter } from 'react-router-dom'
import API from './API'
import '../css/Login.css'
import { connect } from 'react-redux'



class LoginForm extends React.Component {

  state = {
    showCreateAccountPage: false,
    username: '',
    password: '',
    email: '',
    accountability_partner: null
  }

  handleChange = e => { 
    this.setState({ [e.target.name]: e.target.value})}

  handleLoginSubmit = () => {
    const { username, password } = this.state 
    API.signIn({ username, password })
    .then(data => {
      if (data.error) {
        throw Error(data.error)
      } else {
        this.props.signIn(data)
        this.props.history.push('/')
        }
    })
    .catch(error => {
      alert(error)
    })
  }

  clearCreateInput = e => {
    let signInU = document.getElementsByName("username")[0]
    let signInE = document.getElementsByName("email")[0]
    let signInP = document.getElementsByName("password")[0]
    signInU.value = ''
    signInE.value = ''
    signInP.value = ''
  }

  clearLoginInput = () => {
    let signInU = document.getElementsByName("username")[0]
    let signInP = document.getElementsByName("password")[0]
    signInU.value = ''
    signInP.value = ''
  }

  handleCreateAccountSubmit = e => {
    const { username, password, email, accountability_partner } = this.state
    API.createAccount({ username, email, password, accountability_partner })
    .then(data => {
      if (data.error) {
        alert(data.error)
        this.clearCreateInput(e)
      } else {
        this.props.signIn(data)
        this.getStatusUpdate()
        this.getUserData()
        this.props.history.push('/') }
    })

  }



  render() {

    return (
    this.state.showCreateAccountPage ? 
    <div className="Login">
      <h1>Create Account</h1>
      <form
        onSubmit={e => {
          e.persist()
          e.preventDefault();
          this.handleCreateAccountSubmit(e)
        }}
        className="ui form"
      >
        <div className="field">
          <label>Username </label>
          <input
            onChange={e => this.handleChange(e)}
            style={{ width: 200 }}
            type="text"
            name="username"
            placeholder="username"
            required
          />{" "}
          <label>Password </label>
          <input
            onChange={e => this.handleChange(e)}
            style={{ width: 200 }}
            type="text"
            name="email"
            placeholder="email"
            required
          /> {" "}
          <label>Password </label>
          <input
            onChange={e => this.handleChange(e)}
            style={{ width: 200 }}
            type="password"
            name="password"
            placeholder="password"
            required
          />
        </div>
        <br></br>
        <button 
        className="ui green button">Create Account
        </button>
      </form>
      <br></br><br></br>
      <button
        className="ui mini button"
        onClick={() => {
          this.clearCreateInput()
          this.setState({ showCreateAccountPage: false })
        }}
      >
        Back To Login
      </button>
      </div> 
      :
    <div className="Login">
      <h1>Login</h1>
      <form
        onSubmit={e => {
          e.persist()
          e.preventDefault();
          this.handleLoginSubmit()
        }}
        className="ui form"
      >
        <div className="field">
          <label>Username </label>
          <input
            onChange={(e) => this.handleChange(e)}
            style={{ width: 200 }}
            type="text"
            name="username"
            placeholder="username"
            required
          />{" "}
          <label>Password </label>
          <input
            onChange={(e) => this.handleChange(e)}
            style={{ width: 200 }}
            type="password"
            name="password"
            placeholder="password"
            required
          />
        </div>
        <button className="ui green button">Login</button>
      </form>
      <h1>Create Account</h1>
      <button
        className="ui green button"
        onClick={() => {
          this.clearLoginInput()
          this.setState({ showCreateAccountPage: true })
        }}
      >
        Create Account
      </button>
    </div>
  ) 
};
}


const mapDispatchToProps = dispatch => ({
  signIn: user => { dispatch({ type: 'SIGN_IN', payload: user})},
  signOut: () => { dispatch({ type: 'SIGN_OUT' })},
  giveMeUserData: user => { dispatch({ type: 'GIVE_ME_USER_DATA', payload: user })},
  addUpdate: update => { dispatch({ type: "ADD_MASTERMIND_STATUS_UPDATE", payload: update })}
})

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));
