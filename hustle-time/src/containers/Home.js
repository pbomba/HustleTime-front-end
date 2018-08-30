import React, { PureComponent } from 'react';
import config from '../config'
import MapContainer from './MapContainer';
// import StationsContainer from './StationsContainer'



class Home extends PureComponent {

	state = {
		stations: []
	}

	componentDidMount() {
		this.getLocation()
	}

	getLocation = () => {
		navigator.geolocation.getCurrentPosition(currentPosition => {
			this.setState({
				currentPosition: {lat: currentPosition.coords.latitude, lng:currentPosition.coords.longitude}
			}, ()=> {
				this.fetchStations()
			})
		})
	}

	setNewCenter = (coords) => {
		// console.log("hit!")
		this.setState({
				currentPosition: {lat: coords.lat, lng:coords.lng}
			}, ()=> {
				this.fetchStations()
			})
	}


	fetchStations = () => {
		fetch(`http://localhost:3000/api/v1/center_points`, {
		    method: 'POST',
		    headers: {
		        Accept: 'application/json',
		        'Content-Type': 'application/json'
		   },
		    body: JSON.stringify({centerLat: `${this.state.currentPosition.lat}`,
		    centerLng: `${this.state.currentPosition.lng}`})
		}).then(resp => resp.json())
		  .then(json => this.setState({stations: json}))
	}

  render() {
  	// console.log(this.state)

		const {
			arrivals,
			nearbyStations,
			currentPoint
		} = this.state.stations
    return (
			<div>
        <MapContainer
					currentPosition={this.state.currentPosition}
					stations={this.state.stations}
					setNewCenter={this.setNewCenter}
				/>
			</div>
    );
  }
}

export default Home;
