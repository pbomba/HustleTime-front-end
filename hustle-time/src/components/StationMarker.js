import React, { PureComponent } from "react";
import { Marker, InfoWindow} from "react-google-maps";
import StationInfoCard from  "./StationInfoCard"
import marker from '../marker.png';


class StationMarker extends PureComponent {


	render(){

		return (

			<React.Fragment>
			{this.props.arrival.id > 1 ? null : <Marker
				position={this.props.location}
				icon={marker}>
				<InfoWindow defaultPosition={ this.props.currentPosition } defaultOptions={{ minWidth:200, disableAutoPan: true }}>
					<StationInfoCard station={this.props} />
				</InfoWindow>
			</Marker>}

      </React.Fragment>
		)
	}
}

export default StationMarker;
