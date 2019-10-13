import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


class NavBar extends Component {


  handleItemClick = (e, { name }) => {
      if ( name === 'home' ) {
        this.props.history.push("/")
      } else if ( name === 'goals' ) {
        this.props.history.push('/goals-tracker')
      } else if (name === 'logout') {
        this.props.signOut()
        this.props.releaseUserData()
        this.props.history.push('/signin')
      } else { return null }
  }

  render() {

    return (
      <Segment inverted>
        <Menu inverted secondary>
          <Menu.Item
            name='home'
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='goals'
            onClick={this.handleItemClick}
          />          
          <Menu.Item
            style={{ float: 'right' }}
            name='logout'
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
    currentUser: state.user,
  })

  const mapDispatchToProps = dispatch => ({
    signOut: () => { dispatch({ type: 'SIGN_OUT' })},
    releaseUserData: () => { dispatch({ type: 'RELEASE_USER_DATA'})}
  })
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));