import React, { PureComponent } from "react";

import MapComponent from  '../components/MapComponent';
import config from '../config';

class MapContainer extends PureComponent {


  render() {
    return (
			<div>
      <MapComponent
				googleMapURL={config.MY_KEY}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `550px`, width: `375px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
        // stations={this.props.stations}
        // currentPosition={this.props.currentPosition}
        // setNewCenter={this.props.setNewCenter}
      />
			</div>
    )
  }
}



export default MapContainer;
