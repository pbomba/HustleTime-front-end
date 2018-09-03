const initialState = {
	currentPosition: []
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
		default:
			return state
	}
}

export default reducer