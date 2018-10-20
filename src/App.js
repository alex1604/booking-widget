import React, { Component } from 'react';
import './App.css';
import Widget from './components/BookingWidget.js'
import { accomodations } from './options.js'
import { destinations } from './options.js'
import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-react';
import moment from 'moment';
 
moment.locale('se');

const weekdayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accomodations: accomodations,
      destinations: destinations,
      currentDestination: destinations[0].value,
      currentAccomodation: accomodations[0].value,
      date: '',
      secondDate: '',
      difference: 1
    }
  }
  registerSearchParams = e => {

  }
  getDay = (name, date) => {
    let myDate = date.split('-')
    console.log(myDate)
    let year = Number(myDate[0])
    let month = Number(myDate[1]) - 1;
    let day = Number(myDate[2])
    myDate = new Date(day, month, year)
    console.log(myDate)
    let weekDay = myDate.getDay()
    console.log(weekDay)
    var n = weekdayList[weekDay]
    this.setState({ [`${name}`]: n })
  }
  difference = (date1, date2) => {
      var a = moment(date1.replace('-', ''), 'DDMMYYYY')
      var b = moment(date2.replace('-', ''), 'DDMMYYYY')
      var days = b.diff(a, 'days')
      this.setState({difference: days})
  }
  newDate = (key, value) => {
    this.setState({
      [`${key}`]: value
    }, () => this.difference(this.state.date, this.state.secondDate))
  }
  register = e => {
    let key = e.target.name
    let value = e.target.value
    this.setState({
      [`${key}`]: value
    }, () => this.difference(this.state.date, this.state.secondDate))
  }
  componentDidMount() {
    let date = new Date().getDate()
    let month = new Date().getMonth() + 1
    let year = new Date().getFullYear()
    this.setState({
      date: `${date}-${month}-${year}`,
      secondDate: `${date + 1}-${month}-${year}`,
      minCheckin: `${date}-${month}-${year}`,
      minCheckout: `${date + 1}-${month}-${year}`,
      maxCheckin: `${date - 1}-${month + 1}-${year}`
    }, () => {
      this.getDay('weekDayOne', `${date}-${month}-${year}`)
      this.getDay('weekDayTwo', `${date + 1}-${month}-${year}`)
    })
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
          getDay={this.getDay}
          weekDayOne={this.state.weekDayOne}
          weekDayTwo={this.state.weekDayTwo}
          difference={this.state.difference}
        />
      </div>
    );
  }
}

export default App;
