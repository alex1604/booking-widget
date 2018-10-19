import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import './Widget.css'
import 'semantic-ui-react'
import { Input, Icon } from 'semantic-ui-react'
import Date from './Date.js'
import FreeSearch from './FreeTextBar.js'
import SelectTemplate from './Select.js'

//import { Modal , Button } from 'semantic-ui-react'

const defaultStyle = { height: '50px', width: '90%' }
const header = `SEARCH & BOOK`

class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: false,
      date: this.props.date,
      secondDate: this.props.secondDate,
      maxCheckin: this.props.maxCheckin,
      datepickerDisabled: false
    }
  }
  componentDidMount() {
    // TO DO
  }
  activeTab = e => {
    let listOfTabs = document.getElementsByClassName('tab');
    for (let i = 0; i < listOfTabs.length; i++) {
      listOfTabs[i].classList.remove('active')
    }
    e.target.classList.add('active');
  }
  noDates = e => {
    if (e.target.checked === true) this.setState({datepickerDisabled: true}) 
    else {this.setState({datepickerDisabled: false})}
  }
  newDate = (key, value) => {
    this.setState({
      [`${key}`] : value
    }, ()=> this.props.update(key, value))

  }
  handleChange = (event, { name, value }) => {
    let processDate = (value) => {
      var parts = value.split('-');;
      return {
        date: Number(parts[0]),
        month: Number(parts[1]),
        year: Number(parts[2])
      }
    }
    let calculateNewMaxCheckin = (name, value) => {
      if (name === 'secondDate') {
        let date = processDate(value)
        console.log(date)
        let maxCheckin = `${date.date - 1}/${date.month}/${date.year}`
        this.setState({ maxCheckin: maxCheckin })
      } else if (name === 'date') {
        let date = processDate(value)
        let minCheckout = `${date.date + 1}/${date.month}/${date.year}`
        this.setState({ minCheckout: minCheckout }, ()=>console.log(this.state))
      }
    }
    this.newDate(name,value)
    calculateNewMaxCheckin(name, value)
  }
  render() {
    // TO DO
    const selectTemplate = (options, name, onChange) => {
      return (<SelectTemplate
        name={name}
        options={options}
        onChange={onChange}
        style={defaultStyle}
      />)
    }

    const whereToGo = !this.state.textSearch ? (
      selectTemplate(this.props.destinations, 'currentDestination', this.props.registerLocation)
    ) : (
        <FreeSearch className='item' type='text' placeholder='Area, landmark or property' style={defaultStyle} />
      )
    const showOrHideFreeSearch = !this.state.textSearch ? (
      <p id='hideSearch' onClick={() => this.setState({ textSearch: !this.state.textSearch })}>Click here for free text search</p>
    ) : (
        <p id='hideSearch' onClick={() => this.setState({ textSearch: !this.state.textSearch })}>Hide text search</p>
      )

    const accomodation = selectTemplate(this.props.accomodations, 'currentAccomodation', this.props.registerAccomodation)
    const selectGuests = selectTemplate(this.props.destinations, 'guests', this.props.registerLocation)

    const checkin = (
      <div className='checkdate item'>
        <p>Check in:</p>
      <Date
        disabled={this.state.datepickerDisabled}
        min={this.props.minCheckin}
        max={this.state.maxCheckin}
        name='date'
        placeholder={this.props.date}
        date={this.state.from}
        icon='calendar alternate outline'
        handleChange={this.handleChange} />
      </div>)

    const checkout = (
      <div className='checkdate item'>
        <p className='checkdate'>Check out:</p>
      <Date
        disabled={this.state.datepickerDisabled}
        min={this.state.minCheckout}
        name='secondDate'
        placeholder={this.props.secondDate}
        date={this.state.until}
        icon='calendar alternate outline'
        //value={this.props.date} 
        handleChange={this.handleChange} />
        </div>)

    const checkInCheckOut = (
      <div id='datepicker'>
        {checkin}
        {checkout}
      </div>
    )
    return (
      <main>
        <div id='tabs' onClick={this.activeTab}>
          <div className='tab active'>ACCOMODATION</div>
          <div className='tab'>ACTIVITIES</div>
          <div className='tab'>EVENTS</div>
          <div className='tab'>CAR</div>
        </div>
        <div id='tabBox'>
          <h3>{header}</h3>
          <p className='alignLeft'>Where to go:</p>
          {whereToGo}
          {showOrHideFreeSearch}
          <p className='alignLeft'>Type of accomodation:</p>
          {accomodation}
          {checkInCheckOut}
          <label id='specificDates' className='item'>
            <input type='checkbox' value='specificDates' onChange={this.noDates}/> I have no specific dates
          </label>
          {selectGuests}
          <button id='submitSearch' type='submit' style={defaultStyle}>Search</button>
        </div>
      </main>
    )
  }
}

export default Widget;
