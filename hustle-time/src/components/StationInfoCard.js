import React from "react";
// import { Button, Item, Label, Modal, Grid } from "semantic-ui-react";
// import { connect } from 'react-redux'


const StationInfoCard = (props) => {

	let timeNow = 1536415534 - 120

	//Math.floor(new Date().getTime() / 1000)

	let stationName = props.station.station
	
	if (stationName.length > 19) {
		stationName = stationName.substring(0, 16)+"..."
	}

	let nb = []
	let sb = []
	let nba = ''
	let sba = ''

	props.station.arrival.forEach ( arrival => {
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

	return (
			<div>
				<p>{stationName} : </p>
				<p>Northbound: {nba}</p>
				<p>Southbound: {sba}</p>
			</div>
	)
}


export default StationInfoCard

