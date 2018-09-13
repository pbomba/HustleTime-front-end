import React, { PureComponent } from "react";
import { Marker } from "react-google-maps";
import youAreHere from '../youAreHere.png';


class youAreHereMarker extends PureComponent {

	state = {
		lat: '',
		lng: ''
	}

	getUserLocation = () => {
		navigator.geolocation.getCurrentPosition(userPosition => {
			this.setState({
				lat: userPosition.coords.latitude,
				lng: userPosition.coords.longitude
			})
		})
	}

	render() {
		return (
			<React.Fragment>
				{this.getUserLocation()}
				<Marker
				position={{lat: this.state.lat, lng: this.state.lng}}
				icon={youAreHere}>

				</Marker>
			</React.Fragment>
			)
	}

}

export default youAreHereMarker