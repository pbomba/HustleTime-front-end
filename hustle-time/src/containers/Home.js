import React, { PureComponent } from 'react'
import config from '../config'
import MapContainer from './MapContainer'

class Home extends PureComponent {

  render() {
    return (
			<div>
        <MapContainer
				/>
			</div>
    );
  }
}


// const mapStateToProps = (state) => {
// 	return {
// 		currentPosition: state.currentPosition,
// 		stations: state.stations
// 	}
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//   	dispatchedNewCenter: (coords) => dispatch(setNewCenter(coords))
//   }
// }

export default Home;