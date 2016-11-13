// utils
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Router, { Link } from 'react-router'
import _ from 'lodash'
import { Col } from 'react-bootstrap'
import Icon from 'react-fa'

// actions
import { createUser } from '../../../actions/users';

// components
import UserNewForm from '../../../components/users/user-new-form/user-new-form'

export class UserNew extends Component {
  handleSubmit(data) {
    const { createUser } = this.props
    var body = new FormData();

    Object.keys(data).forEach(( key ) => {
      if (key == 'avatar') {
        if (_.isObject(data[key])) { body.append(key, data[key][0]) }
      } else {
        if (data[key]) { body.append(key, data[key]) }
      }
    })
    createUser(body)
  }

  render() {
    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>Register</div>
          </div>
          <UserNewForm onSubmit={this.handleSubmit.bind(this)} />
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
  createUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNew)
