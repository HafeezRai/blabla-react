import React, { PropTypes }  from 'react';
import { Col }               from 'react-bootstrap'
import { connect }           from 'react-redux';

import * as actions          from '../../actions/cars';
import styles                from '../../stylesheets/users/Users'
import CarsPageForm          from '../../components/cars/CarsPageForm'

export default class CarsNewPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchCarsOptions());
  }

  handleSubmit(data) {
    var body = new FormData();
    Object.keys(data).forEach((key) => {
      if (key == 'car_photo') {
        if (data[key]) { body.append(key, data[key][0])}
      } else {
        body.append(key, data[key]);
      }
    });

    this.props.dispatch(actions.createCar(body, this.props.session))
  }

  render() {
    const { dispatch, carsOptions, session } = this.props;
    return (
      <div className='show-grid'>
        <Col xs={6} md={4} xsOffset={3} mdOffset={4} className='login__form'>
          <CarsPageForm
            carsOptions={carsOptions}
            onSubmit={this.handleSubmit.bind(this)} />
        </Col>
      </div>
    )
  }
}

CarsNewPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function select(state) {
  return {
    session:     state.session.user,
    carsOptions: state.carsOptions.carsOptions
  };
}

export default connect(select)(CarsNewPage);
