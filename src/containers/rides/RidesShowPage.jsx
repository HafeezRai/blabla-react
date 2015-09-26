import React, { PropTypes }  from 'react'
import { connect }           from 'react-redux';
import Bootstrap             from 'react-bootstrap'
import { Link }              from 'react-router';
import Timestamp             from 'react-time'
import Icon                  from 'react-fa'
import pluralize             from 'pluralize'

import * as actions          from '../../actions/rides';
import * as rrActions        from '../../actions/ride_requests';
import styles                from '../../stylesheets/rides/Rides'
import RidesActions          from '../../components/rides/RidesActions'
import RideOfferForm         from '../../components/rides/RideOfferForm'
import RideRequestsIndexItem from '../../components/rides/RideRequestsIndexItem'

export default class RidesShowPage extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount() {
    var rideId = this.props.params.rideId
    const { dispatch, session, currentUserId } = this.props
    dispatch(actions.fetchRide(rideId, session))
  }

  componentWillReceiveProps(nextProps) {
    var rideId = this.props.params.rideId
    const { dispatch, currentUserId } = this.props;
    if (nextProps.currentUserId && currentUserId === undefined) {
      dispatch(actions.fetchRide(rideId, nextProps.session))
    }
  }

  render() {
    const { dispatch, ride, currentUserId, session } = this.props
    var rideDescriptionCar, rideDriver, rideActions, rideOffer, rideDescription, places, rideRequests, rideRequestsList

    if (_.isEmpty(ride)) {
      rideDescriptionCar = null
    } else {
      rideDescriptionCar =
        <div>
          <Link to={`/cars/${ride.car.id}`}>
            <div className='ride-show-description__details'>
              <div className='ride-show-description__details-label'>Car name</div>
              <div className='ride-show-description__details-value'>{ride.car.full_name}</div>
            </div>
            <div className='ride-show-description__details'>
              <div className='ride-show-description__details-label'>Car photo</div>
              <div className='ride-show-description__details-value'><img src={ride.car.car_photo} /></div>
            </div>
          </Link>
        </div>
    }

    if (_.isEmpty(ride)) {
      rideDriver = null
    } else {
      if (currentUserId != ride.driver.id) {
        rideDriver =
          <div className='ride-show-driver'>
            <div className='ride-show-driver__heading'>
              User
            </div>
            <Link to={`/users/${ride.driver.id}`}>
              <div>
                <div className='ride-show-driver__details-avatar'><img src={ride.driver.avatar} /></div>
                <div className='ride-show-driver__details-info'>
                  <div className='ride-show-driver__details-name'>{ride.driver.full_name}</div>
                  <div className='ride-show-driver__details-age'>({ride.driver.age} years)</div>
                  <div className='ride-show-driver__details-join'>
                    <div className='ride-show-driver__details-join-label'>joined:</div>
                    <div className='ride-show-driver__details-join-value'>
                      <Timestamp value={ride.driver.created_at} format="D MMMM YYYY" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
      }
    }

    if (_.isEmpty(ride)) {
      rideActions = null
    } else {
      rideActions =
        <RidesActions rideId={ride.id} rideOwner={ride.driver.id} currentUserId={currentUserId} />
    }

    if (ride.ride_requests && ride.ride_requests.length > 0) {
      rideRequestsList =
        ride.ride_requests.map((ride_request, i) =>
          <RideRequestsIndexItem
            ride_request={ride_request} key={i}
            onAddClick={(status) =>
              dispatch(rrActions.changeRideRequest(ride.id, status, session))
            }
            onAcceptRideRequest={(rideRequestId, status) =>
              dispatch(rrActions.acceptRideRequest(rideRequestId, status, session))
            } />
      )
    }

    if (ride.ride_requests) {
      rideRequests =
        <div className='ride-show-requests'>
          <div className='ride-show-requests__heading'>
            Requests
          </div>
          <div className='ride-show-requests__details-places'>
            <div className='ride-show-requests__details-places-value'>{ride.requested_places_count} / {ride.free_places_count} {pluralize('place', ride.requested_places_count)} </div>
          </div>
          <div className='ride-show-requests__details-book'>
            <div className='ride-show-requests__details-book-info'>
              {rideRequestsList}
            </div>
          </div>
        </div>
    }

    rideOffer =
      <div className='ride-show-offer'>
        <div className='ride-show-offer__heading'>
          Offer
        </div>
        <div className='ride-show-offer__details-price'>
          <div className='ride-show-offer__details-price-value'>{ride.price}</div>
          <div className='ride-show-offer__details-price-currency'>{ride.currency}</div>
          <div className='ride-show-offer__details-price-label'>for person</div>
        </div>
        <div className='ride-show-offer__details-places'>
          <div className='ride-show-offer__details-places-value'>{ride.free_places_count} / {ride.places} {pluralize('place', this.props.ride.free_places_count)} </div>
        </div>
        <div className='ride-show-offer__details-book'>
          <div className='ride-show-offer__details-book-info'>
            <RideOfferForm
              ride={ride}
              currentUserId={currentUserId}
              onAddClick={(places) =>
                dispatch(rrActions.createRideRequest(ride.id, places, session))
              } />
          </div>
        </div>
      </div>

    rideDescription =
      <div className='ride-show-description'>
        <div className='ride-show-description__heading'>
          <div className='ride-show-description__start-city'>{ride.start_city}</div>
          <Icon name="long-arrow-right" className='ride-show-description__arrow'/>
          <div className='ride-show-description__destination-city'>{ride.destination_city}</div>
          <div className='ride-show-description__actions'>
            {rideActions}
          </div>
        </div>
        <div className='ride-show-description__details'>
          <div className='ride-show-description__details-label'>Start city</div>
          <div className='ride-show-description__details-value'>{ride.start_city}</div>
        </div>
        <div className='ride-show-description__details'>
          <div className='ride-show-description__details-label'>Destination city</div>
          <div className='ride-show-description__details-value'>{ride.destination_city}</div>
        </div>
        <div className='ride-show-description__details'>
          <div className='ride-show-description__details-label'>Date</div>
          <div className='ride-show-description__details-value'>
            <Timestamp value={ride.start_date} format="dddd D MMMM YYYY" />
          </div>
        </div>
        <div className='ride-show-description__details'>
          <div className='ride-show-description__details-label'>Time</div>
          <div className='ride-show-description__details-value'>
            <Timestamp value={ride.start_date} format="H:mm" />
          </div>
        </div>
        {rideDescriptionCar}
      </div>

    return (
      <div className='show-grid'>
        <Bootstrap.Col xs={8}>
          {rideDescription}
        </Bootstrap.Col>
        <Bootstrap.Col xs={4}>
          {rideOffer}
          {rideRequests}
          {rideDriver}
        </Bootstrap.Col>
      </div>
    )
  }
}

RidesShowPage.PropTypes = {
  ride: PropTypes.array.isRequired
}

function select(state) {
  return {
    ride:          state.ride.ride,
    currentUserId: state.session.user.id,
    session:       state.session.user
  };
}

export default connect(select)(RidesShowPage);
