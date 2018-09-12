const initialState = {
	currentPosition: [],
	stations: []
}

const reducer = (state = initialState, action) => {
	switch(action.type){

		case 'SET_NEW_CENTER':
			return {
				...state,
				currentPosition: action.payload
			}

		case 'FETCH_STATIONS':
			return {
				...state,
				stations: action.payload
			}

    case 'LOGIN_USER':
	    return {
	    	...state,
	      user: action.payload.user
	    }

	  case 'REAUTH_USER':
	  	return {
	  		...state,
	  		user: action.payload
	  	}

    case 'LOGOUT_USER':
	    return {
	    	currentPosition: state.currentPosition,
	    	stations: state.stations
	    }

	   case 'SET_ACTIVE_MARKER':
	   	return {
	   		...state,
	   		activeMarker: action.payload
	   	}

		default:
			return state

	}
}

export default reducer