import React, { PropTypes }  from 'react'
import { Link }              from 'react-router';
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/users/Users'
import Icon                  from 'react-fa'
import CarsActions           from './CarsActions'

export default class CarsIndexPageItem extends React.Component {
  render() {
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

    var carsActions
    if (this.props.car.owner_id === this.props.currentUserId) {
      carsActions = <CarsActions carId={this.props.car.id} />
    }

    return (
      <Bootstrap.Panel className='car'>
        <div className='car-details'>
          <Link to={`/cars/${this.props.car.id}`}>
            <div className='car-details__name'>{this.props.car.full_name}</div>
          </Link>
          <div className='car-details__places'>{this.props.car.places_full}</div>
          {stars}
          {carsActions}
        </div>
        <Link to={`/cars/${this.props.car.id}`}>
          <div className='car-photo'>
            <img src={this.props.car.car_photo} />
          </div>
        </Link>
      </Bootstrap.Panel>
    )
  }
}