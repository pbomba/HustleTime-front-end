import React, { PureComponent } from 'react'
import config from '../config'
import MapContainer from './MapContainer'
import { connect } from 'react-redux'
import { setNewCenter } from '../actions'

class Home extends PureComponent {

	state = {
		stations: []
	}

	// componentDidMount() {
	// 	this.getLocation()
	// }

	// getLocation = () => {
	// 	navigator.geolocation.getCurrentPosition(currentPosition => {
	// 		this.setState({
	// 			currentPosition: {lat: currentPosition.coords.latitude, lng:currentPosition.coords.longitude}
	// 		}, ()=> {
	// 			this.fetchStations()
	// 		})
	// 	})
	// }

	// getLocation = () => {
	// 	navigator.geolocation.getCurrentPosition(currentPosition => {
	// 		// console.log(currentPosition.coords)
	// 		this.props.dispatchedNewCenter({lat: currentPosition.coords.latitude, lng:currentPosition.coords.longitude})
	// 	})
	// 	this.fetchStations()
	// }

	// setNewCenter = (coords) => {
	// 	this.setState({
	// 			currentPosition: {lat: coords.lat, lng:coords.lng}
	// 		}, ()=> {
	// 			this.fetchStations()
	// 		})
	// }

	// fetchStations = () => {
	// 	fetch(`http://localhost:3000/api/v1/center_points`, {
	// 	    method: 'POST',
	// 	    headers: {
	// 	        Accept: 'application/json',
	// 	        'Content-Type': 'application/json'
	// 	   },
	// 	    body: JSON.stringify({centerLat: `${this.props.currentPosition.lat}`,
	// 	    centerLng: `${this.props.currentPosition.lng}`})
	// 	}).then(resp => resp.json())
	// 	  .then(json => this.setState({stations: json}))
	// }

  render() {
		const {
			arrivals,
			nearbyStations,
			currentPoint
		} = this.state.stations
    return (
			<div>
        <MapContainer
				/>
			</div>
    );
  }
}


const mapStateToProps = (state) => {
	return {
		currentPosition: state.currentPosition
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
  	dispatchedNewCenter: (coords) => dispatch(setNewCenter(coords))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);