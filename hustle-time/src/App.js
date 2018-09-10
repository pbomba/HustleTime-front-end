import React, { Component } from 'react';
import logo from './logo.png';
import Modal from './components/Modal'
import './App.css';
import Home from './containers/Home'
import { slide as Menu } from 'react-burger-menu'
import { connect } from 'react-redux'


class App extends Component {
  
  state = {
    modal: false,
    nameForSave: "",
  }

  hideModal = () => {
    this.setState({ modal:false })
  }

  showModal = (type) => {
    return this.setState({ modal:true, modalType:type }, () => console.log(this.state))
  }

  setName = (term) => {
    this.setState({
      nameForSave: term
    })
  }

  saveLocation = () => {
    fetch(`http://localhost:3000/api/v1/locations`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
       },
        body: JSON.stringify({lat: `${this.props.currentPosition.lat}`,
        lng: `${this.props.currentPosition.lng}`,
        location_name: `${this.state.nameForSave}`})
    })
  }


  render() {
      // console.log("save:", this.state.nameForSave, "currentPosition:", this.props.currentPosition)
    let { stations } = this.props
    let arrivalNotifications = []
    if (stations) { arrivalNotifications = stations.map(station => {
         return <div style={{ height:40 }}> {station.name} </div>
    })}

    let buttons
    let modalType

    if (this.props.user) {
        buttons = 
        [<button onClick={() => this.showModal(1)}>Save Favorite Place</button>,
        <button onClick={() => this.showModal(2)}>Load Favorite Place</button>]
      } else {
        buttons = <button onClick={() => this.showModal(3)}>Log In </button>
      }

    if (this.state.modalType === 1) {
      // modal for saving center point
      modalType = <div>
        <Modal isOpen={this.state.modal} onClose={() => this.hideModal()}>
            <h3>Save Favorite Place</h3>
            <input type="text" placeholder="name of location" onChange={(e) => this.setName(e.target.value)} />
            <p style={{fontSize:".2em", fontStyle:'italic'}}>{this.props.currentPosition.lat}, {this.props.currentPosition.lng}</p>
            <p> <button className="bm-item" onClick={this.saveLocation}>save</button></p>
            <p><button onClick={() => this.hideModal()}>Close</button></p>
          </Modal>
        </div>
    } else if (this.state.modalType === 2) {
      // modal for retrieving center point
      modalType = <div>
        <Modal isOpen={this.state.modal} onClose={() => this.hideModal()}>
        <h2>Favorite Places</h2>
        </Modal>
      </div>

    } else {
      // modal for logging in
      modalType = <div>
          <Modal isOpen={this.state.modal} onClose={() => this.hideModal()}>
            <input className="bm-item" type="text" placeholder="username" />
            <input className="bm-item" type="text" placeholder="password" />
            <button className="bm-item" >submit</button>
            <p><button className="bm-item" onClick={() => this.hideModal()}>Close</button></p>
          </Modal>
        </div>
    }

    return (
      <div className="App">
        <header className="App-header">
          <Menu 
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
            <div style={{position: 'absolute', bottom: 0, left:0, right:0, backgroundColor: 'white'}}>
              {arrivalNotifications}
            </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentPosition: state.currentPosition,
    stations: state.stations.nearby_stations
  }
}


export default connect(mapStateToProps)(App);
