import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ContentFilter from 'material-ui/svg-icons/content/filter-list'
import Toggle from '../../inputs/Toggle'

class RideFilters extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { handleSubmit, filters } = this.props
    return (
      <div className='rides-filters__button'>
        <IconMenu
          iconButtonElement={<IconButton><ContentFilter /></IconButton>}
          multiple={false}
        >
          <form onSubmit={handleSubmit} className="rides-filters">
            <div>
              <Field name="hide_full" component={Toggle} label={`Hide full rides (${filters.full_rides})`} labelPosition="left"/>
            </div>
            <button type="submit" className="btn btn-default form-submit">Submit</button>
          </form>
        </IconMenu>
      </div>
    )
  }
}

RideFilters = reduxForm({
  form: 'RideFilters'
})(RideFilters)

RideFilters = connect(
  state => ({
    initialValues: state.ridesSearch.data
  })
)(RideFilters)

export default RideFilters
