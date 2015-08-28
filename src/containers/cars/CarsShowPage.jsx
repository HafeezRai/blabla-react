import React, { PropTypes }  from 'react'
import { connect }           from 'react-redux';
import Bootstrap             from 'react-bootstrap'
import { Link }              from 'react-router';
import Timestamp             from 'react-time'
import Icon                  from 'react-fa'

import * as actions          from '../../actions/cars';
import styles                from '../../stylesheets/users/Users'
import CarsActions           from '../../components/cars/CarsActions'

export default class CarsShowPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    var carId = this.props.params.carId
    const { dispatch } = this.props;
    dispatch(actions.fetchCar(carId));
  }

  render() {
    const { isFetching, car, currentUserId } = this.props

    const tooltipComfort = (
      <Bootstrap.Tooltip>{this.props.car.comfort}</Bootstrap.Tooltip>
    );

    var starsIcons = []
    for (var i = 0; i < this.props.car.comfort_stars; i++) {
      starsIcons.push(<Icon name='star' />);
    }

    var stars =
      <Bootstrap.OverlayTrigger placement='top' overlay={tooltipComfort} delayShow={300} delayHide={150}>
        <div className='car-details__stars'>
          {starsIcons}
        </div>
      </Bootstrap.OverlayTrigger>

    var carPhoto =
      <div className='main-info__photo'>
        <img src={car.car_photo} />
      </div>

    var carsActions
    if (car.owner_id === currentUserId) {
      carsActions = <CarsActions carId={this.props.car.id} />
    }

    var carDetails =
      <div className='car-details'>
        <div className='car-details__name'>{car.full_name}</div>
        <div className='car-details__places'>{this.props.car.places_full}</div>
        {stars}
        <div className='car-details__year'>{car.production_year}</div>
        <div className='car-details__color'>{car.color}</div>
        <div className='car-details__category'>{car.category}</div>
        {carsActions}
      </div>

    return (
      <Bootstrap.Grid className='car'>
        {carPhoto}
        {carDetails}
      </Bootstrap.Grid>
    )
  }
}

CarsShowPage.PropTypes = {
  car: PropTypes.array.isRequired
}

function select(state) {
  return {
    isFetching:    state.car['isFetching'],
    car:           state.car['car'],
    currentUserId: state.session.user.id
  };
}

export default connect(select)(CarsShowPage);