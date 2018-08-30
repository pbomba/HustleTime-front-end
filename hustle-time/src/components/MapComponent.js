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

	mapMoved() {
		console.log("map moved to:"+JSON.stringify(this.state.map.getCenter()))
		this.props.setNewCenter()
	}

	mapLoaded(map) {
		if (this.state.map != null)
			return
		this.setState({
			map: map
		})
	}

	render() {

		const markers = () => {
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
				defaultZoom={15.5}
				center={this.props.currentPosition}
				onDragEnd={this.mapMoved.bind(this)}
				clickableIcons={false} >
				{this.props.stations.length !== 0 ? markers() : null}
			</GoogleMap>
			)
	}}


export default withScriptjs(withGoogleMap(MapComponent));
// {props.isMarkerShown && <Marker	className="current-location" position={props.position} onClick={props.onMarkerClick}/>}
//	onClick={(e) => props.mapClick(e)}
//{lat: 40.701397, lng: -73.986751}
//ref={(node) => props.setVariable(node)}
					//ref={node=> { this.node = node; }}
		// {props.stations ? props.stationMarkers() : null}
