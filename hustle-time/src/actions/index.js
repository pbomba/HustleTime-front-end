import { LOGOUT_USER, LOGIN_USER } from './types'
import { fetchLoginUser, fetchReauthUser } from '../adapters/authAdapter'


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

export const loginUser = (user, password) => {
  return (dispatch) => {
    return fetchLoginUser(user, password).then(userObj => {
    	if (userObj.message) {
    		// alert(userObj.message)
    		return userObj
    	} else {
      	dispatch({
	        type: LOGIN_USER,
	        payload: userObj
      })
      	return userObj
    	}
    })
  }
}

export const logOut = () => {
  return{
    type: LOGOUT_USER
  }
}

export const reauthUser = (user) => {
  return { type: 'REAUTH_USER',
    payload: user
     }
}

export const setActiveMarker = (name) => {
  return {
    type: 'SET_ACTIVE_MARKER',
    payload: name
  }
}