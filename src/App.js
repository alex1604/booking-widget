import React, { Component } from 'react';
import './App.css';
import Widget from './components/BookingWidget.js'
import {accomodations} from './options.js'
import {destinations} from './options.js'
import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      accomodations: accomodations,
      destinations: destinations,
      currentDestination: destinations[0].value,
      currentAccomodation: accomodations[0].value,
      date:'',
      secondDate: ''
    }
  }
  componentDidMount(){
      let date = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
    this.setState({
      date : `${date}/${month}/${year}`,
      secondDate: `${date}/${month+1}/${year}`,
      minCheckin: `${date}/${month}/${year}`,
      minCheckout: `${date+1}/${month}/${year}`,
      maxCheckin: `${date-1}/${month+1}/${year}`
      }, ()=> console.log(this.state))
  }
  newDate = (key, value) => {
    this.setState({
      [`${key}`] : value
    }, ()=> console.log(this.state))
  }
  register = e => {
    let key = e.target.name
    let value = e.target.value
    this.setState({
      [`${key}`] : value
    }, ()=> console.log(this.state))
  }
  render() {
    return (
      <div className="App">
        <Widget accomodations={this.state.accomodations}
        destinations={this.state.destinations}
        registerLocation={this.register}
        registerAccomodation={this.register}
        date={this.state.date}
        secondDate={this.state.secondDate}
        minCheckin={this.state.minCheckin}
        minCheckout={this.state.minCheckout}
        maxCheckin={this.state.maxCheckin}
        update={this.newDate}
        />
      </div>
    );
  }
}

export default App;
