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

    case 'LOGOUT_USER':
	    return {
	    	...state,
	      user: {}
	    }

		default:
			return state

	}
}

export default reducer