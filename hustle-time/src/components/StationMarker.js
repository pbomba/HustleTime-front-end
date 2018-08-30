import React, { PureComponent } from "react";
import { Marker, InfoWindow} from "react-google-maps";
import StationInfoCard from  "./StationInfoCard"


class StationMarker extends PureComponent {


	render(){
		return (

			<div>
			{this.props.arrival.id > 1 ? null : <Marker
				position={this.props.location}
			>
				<InfoWindow maxWidth={800} defaultPosition={ this.props.currentPosition } defaultOptions={{ disableAutoPan: true }}>
					<StationInfoCard station={this.props}/>
				</InfoWindow>

			</Marker>}

      </div>
		)
	}
}

export default StationMarker;
