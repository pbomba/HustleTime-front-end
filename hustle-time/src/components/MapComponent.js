import React, { Component } from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Circle } from "react-google-maps"
import StationMarker from './StationMarker'
import { setNewCenter, fetchStations } from '../actions'
import { connect } from 'react-redux'

class MapComponent extends Component {

	constructor() {
		super()
		this.state = {
			map: null
		}
	}

	async mapMoved() {
		let newCoords = await JSON.stringify(this.state.map.getCenter())
		let coords = JSON.parse(newCoords)
		this.props.dispatchedNewCenter(coords)
		this.setNewCenter(coords)
	}

	setNewCenter = (coords) => {
		this.props.dispatchedNewCenter(coords)
		this.fetchStations()
	}

	mapLoaded(map) {
		if (this.state.map != null)
			return
		this.setState({
			map: map
		})
	}

	getLocation = () => {
		navigator.geolocation.getCurrentPosition(currentPosition => {
			// console.log(currentPosition.coords)
			this.props.dispatchedNewCenter({lat: currentPosition.coords.latitude, lng:currentPosition.coords.longitude})
		})
		this.fetchStations()
	}

	componentDidMount(){
		this.getLocation()
	}

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

	fetchStations = () => {
		fetch(`http://localhost:3000/api/v1/center_points`, {
		    method: 'POST',
		    headers: {
		        Accept: 'application/json',
		        'Content-Type': 'application/json'
		   },
		    body: JSON.stringify({centerLat: `${this.props.currentPosition.lat}`,
		    centerLng: `${this.props.currentPosition.lng}`})
		}).then(resp => resp.json())
		  .then(json => this.props.dispatchedFetchStations(json))
	}

	render() {
		const markers = () => {
				if(this.props.stations.nearby_stations){
				return this.props.stations.nearby_stations.map( (station, idx) => {
					const arrivals = this.props.stations.arrivals.filter(arrival => {
						return arrival.nearby_station_id === station.id
					})
					return (<StationMarker
	          key={station.id}
	          station={station.name}
	          location={{lat: station.latitude, lng: station.longitude}}
						arrival={arrivals}
	                />)
			  })
			}
		}
		return (
			<div>
				<GoogleMap
					ref = {this.mapLoaded.bind(this)}
					defaultZoom={15}
					defaultOptions={{mapTypeControl: false, fullscreenControl: false, streetViewControl: false}}
					center={this.props.currentPosition}
					onDragEnd={this.mapMoved.bind(this)}
					clickableIcons={false} >
					{this.props.stations ? markers() : null}
				</GoogleMap>
				<Circle
					center={this.props.currentPosition}
					radius={10} />
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		currentPosition: state.currentPosition,
		stations: state.stations
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
  	dispatchedFetchStations: (stations) => dispatch(fetchStations(stations)),
  	dispatchedNewCenter: (coords) => dispatch(setNewCenter(coords))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(MapComponent)));

