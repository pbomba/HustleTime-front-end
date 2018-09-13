import React from 'react'
import { connect } from 'react-redux'
import { setActiveMarker } from '../actions/index'

const ArrivalNotification = (props) => {
	let timeNow = Math.floor(new Date().getTime() / 1000) - 60

	let stationName = props.station.name
	
	if (stationName.length > 23) {
		stationName = stationName.substring(0, 20)+"..."
	}

	let nb = []
	let sb = []
	let nba = ''
	let sba = ''

	let station_arrivals = props.arrivals.filter( arr => arr.station === props.station.station_code )

	station_arrivals.forEach ( arrival => {
		if (arrival.direction === 'N') {
			nb.push(arrival)
		} else {
			sb.push(arrival)
		}
	})

	if ( nb.length === 0 ) {
		nba = <i>Delay or service change</i>
	} else if ( nb.length === 1 ) {
		nba = `(${nb[0].train}) ${Math.floor((nb[0].time - timeNow)/60)} mins`
	} else {
		nba = `(${nb[0].train}) ${Math.floor((nb[0].time - timeNow)/60)} mins, (${nb[1].train}) ${Math.floor((nb[1].time - timeNow)/60)} mins`
	}

	if ( sb.length === 0 ) {
		sba = <i>Delay or service change</i>
	} else if ( sb.length === 1 ) {
		sba = `(${sb[0].train}) ${Math.floor((sb[0].time - timeNow)/60)} mins`
	} else {
		sba = `(${sb[0].train}) ${Math.floor((sb[0].time - timeNow)/60)} mins, (${sb[1].train}) ${Math.floor((sb[1].time - timeNow)/60)} mins`
	}

	let toggleActiveMarker = (sta) => {
		if ( props.activeMarker !== sta ) {
			props.dispatchedActiveMarker(props.station.name)
		} else {
			props.dispatchedActiveMarker("")
		}
	}

		return(
			<div onClick={() => toggleActiveMarker(props.station.name)} style={{ display: 'flex', height:30, margin:5, padding: 8, color:'navy', backgroundColor:'white', fontSize:10, lineHeight: 1.6, position: 'relative', paddingBottom: 10, textAlign: 'left' }}>
				<div style={{width: '50%', fontSize:14 }} >{stationName} </div>
				<div style={{height: '100%', fontSize:11}}>N'bound: {nba}<br/>
				S'bound: {sba}
				</div>
			</div>
			)
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchedActiveMarker: (name) => dispatch(setActiveMarker(name))
	}
}

const mapStateToProps = (state) => {
	return {
		activeMarker: state.activeMarker
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ArrivalNotification)

