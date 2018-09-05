import React from "react";
import { Button, Item, Label, Modal, Grid } from "semantic-ui-react";
// import { connect } from 'react-redux'


const StationInfoCard = (props) => {

let timeNow = 1535039870 - 120

//Math.floor(new Date().getTime() / 1000)

	return (
			<div>
						<span id="stationCard">
							<strong>{props.station.station}</strong> <br />
							<strong>
							North Bound Trains
							</strong>
								<p>{props.station.arrival[0] && props.station.arrival[0].train} : {Math.floor((props.station.arrival[0].time - timeNow)/60)} minutes</p>
								<p>{props.station.arrival[1].train} : {Math.floor((props.station.arrival[1].time - timeNow)/60)} minutes</p>
							<strong>
							South Bound Trains
							</strong>
								<p>{props.station.arrival[2].train} : {Math.floor((props.station.arrival[2].time - timeNow)/60)} minutes</p>
								<p>{props.station.arrival[3].train} : {Math.floor((props.station.arrival[3].time - timeNow)/60)} minutes</p>
						</span>
			</div>
		);
	}

// const mapStateToProps = (state) => {
// 	return {
// 		currentPosition: state.currentPosition
// 	}
// }

export default StationInfoCard