import React, { PureComponent } from "react";
import { Marker, InfoWindow} from "react-google-maps";
import StationInfoCard from  "./StationInfoCard"


class StationMarker extends PureComponent {


	render(){
		console.log(this.props)
		return (

			<div>
			{this.props.arrival.id > 1 ? null : <Marker
				position={this.props.location}
			>
				<InfoWindow maxWidth={800} defaultPosition={ this.props.currentPosition }>
					<StationInfoCard station={this.props}/>
				</InfoWindow>

			</Marker>}

      </div>
		)
	}
}

export default StationMarker;
// <InfoWindow maxWidth={800} defaultPosition={ this.props.location } onCloseClick={this.props.onToggleOpen}>
// 	<StationInfoCard toggleShowPage={this.props.toggleShowPage} dr={this.props.doctor}/>
// </InfoWindow>
