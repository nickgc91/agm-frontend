import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import API from './API'

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
        this.props.history.push('/app')}
    })
    .catch(error => {
      alert(error)
    })
  }

  handleCreateAccountSubmit = () => {
    this.setState({ showCreateAccountPage: false })
    const { username, password, email, accountability_partner } = this.state
    API.createAccount({ username, email, password, accountability_partner })
    .then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        this.props.signIn(data)
        this.props.history.push('/app') }
    })
  }



  render() {

    return (
    this.state.showCreateAccountPage ? 
    <div className="Login">
      <h1>Create Account</h1>
      <form
        onSubmit={e => {
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
          />{" "}
          <label>Password </label>
          <input
            onChange={e => this.handleChange(e)}
            style={{ width: 200 }}
            type="text"
            name="email"
            placeholder="email"
          /> {" "}
          <label>Password </label>
          <input
            onChange={e => this.handleChange(e)}
            style={{ width: 200 }}
            type="password"
            name="password"
            placeholder="password"
          />
        </div>
        <br></br>
        <button 
        className="ui green button">Create Account
        </button>
      </form>
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
          />{" "}
          <label>Password </label>
          <input
            onChange={(e) => this.handleChange(e)}
            style={{ width: 200 }}
            type="password"
            name="password"
            placeholder="password"
          />
        </div>
        <button className="ui green button">Login</button>
      </form>
      <h1>Create Account</h1>
      <button
        className="ui green button"
        onClick={() => this.setState({ showCreateAccountPage: true })}
      >
        Create Account
      </button>
    </div>
  ) 
};
}

export default withRouter(LoginForm)
