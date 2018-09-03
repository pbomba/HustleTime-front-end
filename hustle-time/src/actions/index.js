export const setNewCenter = (coords) => {
	return {
		type: 'SET_NEW_CENTER',
		payload: coords
	}
}

export const fetchStations = (stations) => {
	return {
		type: 'FETCH_STATIONS',
		payload: stations
	}
}