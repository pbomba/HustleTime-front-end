import React, { PureComponent } from "react";
import { Marker, InfoWindow} from "react-google-maps";
import StationInfoCard from  "./StationInfoCard"
import marker from '../marker.png';
import { connect } from 'react-redux'


class StationMarker extends PureComponent {


	render(){
		return (

			<React.Fragment>
			{this.props.arrival.id > 1 ? null : <Marker
				position={this.props.location}
				icon={marker}>
				
				{ this.props.activeMarker === this.props.station ? 
					<InfoWindow defaultPosition={ this.props.currentPosition } defaultOptions={{ minWidth:200, disableAutoPan: true }}>
					<StationInfoCard station={this.props} />
				</InfoWindow> : null
				}
			
			</Marker>}

      </React.Fragment>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		activeMarker: state.activeMarker
	}
}


export default connect(mapStateToProps)(StationMarker)
