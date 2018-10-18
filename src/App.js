import React, { Component } from 'react';
import './App.css';
import Widget from './components/BookingWidget.js'
import {accomodations} from './options.js'
import {destinations} from './options.js'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      accomodations: accomodations,
      destinations: destinations
    }
  }
  async componentDidMount(){
    
  }
  render() {
    return (
      <div className="App">
        <Widget accomodations={this.state.accomodations}
        destinations={this.state.destinations}
        />
      </div>
    );
  }
}

export default App;
