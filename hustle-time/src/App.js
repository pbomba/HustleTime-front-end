import React, { Component } from 'react';
import logo from './logo.png';
import Modal from './components/Modal'
import './App.css';
import Home from './containers/Home'
import { slide as Menu } from 'react-burger-menu'
import { connect } from 'react-redux'


class App extends Component {
  
  state = {
    modal: false
  }

  hideModal = () => {
    this.setState({ modal:false })
  }

  showModal = () => {
    this.setState({ modal:true }, () => console.log(this.state))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Menu 
          width = { '100%' }
          customBurgerIcon={ <img src={logo} alt="hustle-time-logo"/> }
          overlayClassName={ 'bm-overlay' }
          crossButtonClassName={ "bm-cross" }
          >
            <button  onClick={() => this.showModal()}>Save Center Point</button>
            <button>Load Center Point</button>
            <Modal isOpen={this.state.modal} onClose={() => this.hideModal()}>
            <h1>Save Center Point</h1>
            <p>hello</p>
            <p><button onClick={() => this.hideModal()}>Close</button></p>
          </Modal>
          </Menu>
        </header>
        <main>
          <Home />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentPosition: state.currentPosition
  }
}


export default connect(mapStateToProps)(App);
