import React, { PureComponent } from "react";
//import { Marker} from "react-google-maps"
import MapComponent from  '../components/MapComponent';
import config from '../config';




class MapContainer extends PureComponent {

  state = {
    currentPosition: this.props.currentPosition

  }
//


  render() {
console.log(this.props)
    return (
			<div>
      <MapComponent
				googleMapURL={config.MY_KEY}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `600px`, width: `600px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
        currentPosition={this.props.currentPosition}
        stations={this.props.stations}
      />
			</div>
    )
  }
}



export default MapContainer;
