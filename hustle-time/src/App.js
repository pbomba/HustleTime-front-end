import React, { Component } from 'react';
import logo from './logo.png';
import Modal from './components/Modal'
import './App.css';
import Home from './containers/Home'
import { slide as Menu } from 'react-burger-menu'
import { connect } from 'react-redux'
// import { fetchLoginUser } from './adapters/authAdapter'
import { loginUser, reauthUser, logOut } from './actions/index'
import { setNewCenter } from './actions'
import { fetchReauthUser } from './adapters/authAdapter'
import ArrivalNotification from './components/ArrivalNotification'

class App extends Component {
  
  state = {
    modal: false,
    locationName: '',
    userName: '',
    userPassword: '',
    errors: null,
    savedLocations: [],
    menuOpen: false
  }

  hideModal = () => {
    this.setState({ modal:false })
  }

  showModal = (type) => {
    return this.setState({ modal:true, modalType:type })
  }

  showModal2 = () => {
    this.showModal(2)
    this.getLocations()
  }

  setLocationName = (term) => {
    this.setState({
      locationName: term
    })
  }

  setUserName = (term) => {
    this.setState({
      userName: term
    })
  }

  setUserPassword = (term) => {
    this.setState({
      userPassword: term
    })
  }

  handleSubmit = () => {
    this.props.fetchLoginUser(this.state.userName, this.state.userPassword)
    .then(resp => {
      // save user to store
      if (resp.message) {
          this.setState({ errors: resp.message })
      } else {
        localStorage.setItem('token', resp.jwt)
        this.setState({ errors: null })
        this.hideModal()
      }
    })
  }

  handleRegSubmit = () => {
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
      },
      body: JSON.stringify({
      user: {
      username: this.state.userName,
      password: this.state.userPassword
      }
    })
  }).then(x => this.handleSubmit())

  }

  saveLocation = () => {
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/locations`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
       },
        body: JSON.stringify({lat: `${this.props.currentPosition.lat}`,
        lng: `${this.props.currentPosition.lng}`,
        user_id: `${this.props.user.id}`,
        location_name: `${this.state.locationName}`})
    }).then(x => this.setState({modal:false, menuOpen:false}))
  }

  getLocations = () => {
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}/locations`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
       }
    }).then(resp => resp.json()).then(json => this.setState({savedLocations: json}))
  }

  showSavedLocations = () => {
    return this.state.savedLocations.map( loc => { 
      return <li onClick={() => this.recenterMap({lat:loc.lat, lng:loc.lng})}>{loc.location_name}</li>
    })
  }

  recenterMap = (coords) => {
    this.props.dispatchedNewCenter(coords)
    this.setState({modal:false, menuOpen:false})
  }

  logoutUser = () => {
    this.props.dispatchedLogout()
    localStorage.removeItem('token')
    this.setState({modal:false, menuOpen:false})
  }

  componentDidMount() {
    if (localStorage.getItem('token')){
      fetchReauthUser()
    .then(resp => {
      this.props.reauthUser(resp.user)
  })
  }}


  render() {
    let { stations, stations_with_arrivals } = this.props
  // console.log('stations_with_arrivals: ', stations_with_arrivals)
  // console.log('nearby_stations', stations_with_arrivals.nearby_stations )

    let arrivalNotifications = []

    if (stations_with_arrivals.nearby_stations) { arrivalNotifications = stations_with_arrivals.nearby_stations.map(station => {
         // return <div style={{ height:20, margin:10, padding:5, color:'navy', backgroundColor:'white' }}> {station.name} </div>
      return <ArrivalNotification arrivals={stations_with_arrivals.arrivals} station={station} /> 
    })}

    let buttons
    let modalType

    if ( this.props.user ) {
        buttons = 
        [<button onClick={() => this.showModal(1)}>Save Favorite Place</button>,
        <button onClick={() => this.showModal2()}>Load Favorite Place</button>,
        <button id='logout' onClick={() => this.logoutUser()}>Log Out</button>]
      } else {
        buttons = [<button onClick={() => this.showModal(3)}>Log In </button>,
        <button onClick={() => this.showModal(4)}>Register </button>]
      } 

    if (this.state.modalType === 1) {
      // modal for saving center point
      modalType = <div>
        <Modal isOpen={this.state.modal} onClose={() => this.hideModal()}>
            <h3>Save Favorite Place</h3>
            <input type="text" placeholder="name of location" onChange={(e) => this.setLocationName(e.target.value)} />
            <p style={{fontSize:".2em", fontStyle:'italic'}}>{this.props.currentPosition.lat}, {this.props.currentPosition.lng}</p>
            <button className="bm-item" onClick={this.saveLocation}>Save</button>
            <button className="bm-item" onClick={() => this.hideModal()}>Close</button>
          </Modal>
        </div>
    } else if (this.state.modalType === 2) {
      // modal for retrieving center point
      modalType = <div>
        <Modal isOpen={this.state.modal} onClose={() => this.hideModal()}>
        <h2>Favorite Places</h2>
        <ul style={{listStyle: 'none', padding: 0, margin: 5 }} >{this.showSavedLocations()}</ul>
        <button className="bm-item" onClick={() => this.hideModal()}>Close</button>
        </Modal>
      </div>

    } else if (this.state.modalType === 3) {
      // modal for logging in
      modalType = <div>
          <Modal isOpen={this.state.modal} onClose={() => this.hideModal()}>
            {(this.state.errors) ? <p>{ this.state.errors }</p> : null }
            <input className="bm-item" type="text" placeholder="username" onChange={(e) => this.setUserName(e.target.value)}/>
            <input className="bm-item" type="password" placeholder="password" onChange={(e) => this.setUserPassword(e.target.value)}/>
            <button className="bm-item" onClick={() => this.handleSubmit()}>Submit</button>
            <button className="bm-item" onClick={() => this.hideModal()}>Close</button>
          </Modal>
        </div>
    } else if (this.state.modalType === 4) {
      // modal for registering
      modalType = <div>
          <Modal isOpen={this.state.modal} onClose={() => this.hideModal()}>
            {(this.state.errors) ? <p>{ this.state.errors }</p> : null }
            <input className="bm-item" type="text" placeholder="username" onChange={(e) => this.setUserName(e.target.value)}/>
            <input className="bm-item" type="password" placeholder="password" onChange={(e) => this.setUserPassword(e.target.value)}/>
            <button className="bm-item" onClick={() => this.handleRegSubmit()}>Submit</button>
            <button className="bm-item" onClick={() => this.hideModal()}>Close</button>
          </Modal>
        </div>
    }

    return (
      <div className="App">
        <header className="App-header">
          <Menu 
          isOpen = {this.state.menuOpen}
          width = { '100%' }
          customBurgerIcon={ <img src={logo} alt="hustle-time-logo"/> }
          overlayClassName={ 'bm-overlay' }
          crossButtonClassName={ "bm-cross" }
          >
            {buttons}
          </Menu>
            {modalType}
        </header>
        <main>
          <Home />
        </main>
            <div style={{ maxHeight: '30vh', overflow: 'scroll', position: 'absolute', bottom: 0, left:0, right:0, backgroundColor:'lightGray' }}>
              {arrivalNotifications}
            </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentPosition: state.currentPosition,
    stations: state.stations.nearby_stations,
    user: state.user,
    stations_with_arrivals: state.stations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLoginUser: (user, password) => dispatch(loginUser(user, password)),
    dispatchedNewCenter: (coords) => dispatch(setNewCenter(coords)),
    reauthUser: (user) => dispatch(reauthUser(user)),
    dispatchedLogout: () => dispatch(logOut())
  }
} 


export default connect(mapStateToProps, mapDispatchToProps)(App);
