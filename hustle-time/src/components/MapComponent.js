import React, { Component } from 'react'
import {withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"
import StationMarker from './StationMarker'

/////WORKING

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
		this.props.setNewCenter(coords)
	}

	mapLoaded(map) {
		if (this.state.map != null)
			return
		this.setState({
			map: map
		})
	}

	render() {
		console.log(this.props)
		const markers = () => {
			// console.log(this.props.stations.nearby_stations)
				if(this.props.stations.nearby_stations.length !== 0){
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
			<GoogleMap
				ref = {this.mapLoaded.bind(this)}
				defaultZoom={15}
				center={this.props.currentPosition}
				onDragEnd={this.mapMoved.bind(this)}
				clickableIcons={false} >
				{this.props.stations.length !== 0 ? markers() : null}
			</GoogleMap>
			)
	}}


export default withScriptjs(withGoogleMap(MapComponent));


		// {"lat":40.69663230993338,"lng":-73.98434558456063}

