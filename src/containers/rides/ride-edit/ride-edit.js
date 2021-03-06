// utils
import React, { Component, PropTypes }  from 'react'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import _ from 'lodash'

// actions
import { fetchRidesOptions, fetchRide, updateRide } from '../../../actions/rides'

// components
import { AsyncContent } from '../../../components/shared/async-content/async-content'
import RideForm from '../../../components/rides/ride-form/ride-form'

const keys = [
  'destination_location',
  'start_location',
  'places',
  'start_date',
  'price',
  'currency',
  'car_id',
]

export class RideEdit extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    rideOptions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { fetchRidesOptions, fetchRide, params: { rideId } } = this.props

    fetchRidesOptions()
    if (rideId) fetchRide(rideId)
  }

  handleSubmit(data) {
    const { updateRide, ride } = this.props
    var body = new FormData()

    Object.keys(data).forEach((key) => {
      if (!keys.includes(key)) return
      if (key === 'destination_location' || key === 'start_location') {
        if (!_.isEmpty(data[key].label)) {
          body.append(key + '_address', data[key].label)
          body.append(key + '_latitude', data[key].location.lat)
          body.append(key + '_longitude', data[key].location.lng)
        }
      } else {
        body.append(key, data[key])
      }
    })
    updateRide(body, ride.id)
      .then((response) => {
        let rideId = response.payload.data.id
        browserHistory.push(`/rides/${rideId}`)
      })
  }

  renderRideForm() {
    const { ride, rideOptions } = this.props

    return (
      <RideForm
        rideOptions={rideOptions}
        ride={ride}
        onSubmit={this.handleSubmit.bind(this)}
      />
    )
  }

  render() {
    const { isStarted, isFetching } = this.props

    return (
      <div className='show-grid'>
        <Col xs={12}>
          <div className='heading'>
            <div className='heading-title'>Edit ride</div>
          </div>
          <AsyncContent
            isFetching={isFetching || !isStarted}
          >
            {this.renderRideForm()}
          </AsyncContent>
        </Col>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ride: state.ride.item,
    isStarted: state.ride.isStarted,
    isFetching: state.ride.isFetching,
    rideOptions: state.rideOptions,
  }
}

const mapDispatchToProps = {
  fetchRidesOptions,
  fetchRide,
  updateRide,
}

export default connect(mapStateToProps, mapDispatchToProps)(RideEdit)
