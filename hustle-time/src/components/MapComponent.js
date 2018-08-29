import React from 'react'
import {withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"
import StationMarker from './StationMarker'




const MapComponent = withScriptjs(withGoogleMap((props) => {

	const markers = () => {
		if(props.stations.nearby_stations.length !== 0){
			return props.stations.nearby_stations.map( (station, idx) => {
				const arrivals = props.stations.arrivals.filter(arrival => {
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
			defaultZoom={16}
			center={props.currentPosition}
			clickableIcons={false} >
			{props.stations.length !== 0 ? markers() : null}
		</GoogleMap>
		)
	}
))

export default MapComponent;
// {props.isMarkerShown && <Marker	className="current-location" position={props.position} onClick={props.onMarkerClick}/>}
//	onClick={(e) => props.mapClick(e)}
//{lat: 40.701397, lng: -73.986751}
//ref={(node) => props.setVariable(node)}
					//ref={node=> { this.node = node; }}
		// {props.stations ? props.stationMarkers() : null}
