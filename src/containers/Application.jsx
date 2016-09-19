import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import HeaderNew from '../components/HeaderNew'
import * as actions from '../actions/session'
import * as notificationActions from '../actions/notifications'
import * as userActions from '../actions/users'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Dimensions from 'react-dimensions'
import styles from '../stylesheets/application'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

class Application extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    const { isLoggedIn, fetchNotifications, fetchCurrentUser } = this.props
    if (isLoggedIn) {
      fetchCurrentUser()
      fetchNotifications()
    }
  }

  markAsSeen(notificationId) {
    const { markNotificationAsSeen } = this.props
    markNotificationAsSeen(notificationId)
  }

  render () {
    const { logout, currentUser, notifications, isLoggedIn, containerWidth, children } = this.props
    return (
      <div>
        <HeaderNew
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          notifications={notifications}
          containerWidth={containerWidth}
          markAsSeen={this.markAsSeen.bind(this)}
          onLogout={text =>
            logout(this.context.router, currentUser)
          } />
        <div id='main' className='container'>
          {children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.session.isLoggedIn,
    currentUser: state.currentUser,
    notifications: state.notifications
  }
}

const mapDispatchToProps = {
  logout: actions.logout,
  fetchCurrentUser: userActions.fetchCurrentUser,
  fetchNotifications: notificationActions.fetchNotifications,
  markNotificationAsSeen: notificationActions.markNotificationAsSeen
}

export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(Application))
