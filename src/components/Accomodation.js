import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import './Widget.css'
import 'semantic-ui-react'
import { Input, Icon } from 'semantic-ui-react'
import Date from './Date.js'
import FreeSearch from './FreeTextBar.js'
import SelectTemplate from './Select.js'
import Guests from './Guests.js'

//import { Modal , Button } from 'semantic-ui-react'

const defaultStyle = { height: '50px', width: '90%' }
const header = `SEARCH & BOOK`

class Accomodation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: false,
      date: this.props.date,
      secondDate: this.props.secondDate,
      maxCheckin: this.props.maxCheckin,
      datepickerDisabled: false,
      guestsAndRooms: '1 room (2 people)'
    }
  }
  registerSearchParams = o => {
    console.log('object arrived to accomodation component:', o)
    let people = o.adults + o.children
    let newPlaceholder = `${o.rooms} rooms (${people} people)`
    this.setState({guestsAndRooms: newPlaceholder})
  }
  clearGuests = () => {
    this.setState({guestsAndRooms: '1 room (2 people)'})
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
      <p id='hideSearch' className='hoverMe' onClick={() => this.setState({ textSearch: !this.state.textSearch })}>Click here for free text search</p>
    ) : (
        <p id='hideSearch' className='hoverMe' onClick={() => this.setState({ textSearch: !this.state.textSearch })}>Hide text search</p>
      )

    const accomodation = selectTemplate(this.props.accomodations, 'currentAccomodation', this.props.registerAccomodation)

    const checkin = (
      <div className='checkdate item'>
        <p>Check in:</p>
      <Date
        disabled={this.props.datepickerDisabled}
        min={this.props.minCheckin}
        max={this.props.maxCheckin}
        name='date'
        placeholder={this.props.date}
        icon='calendar alternate outline'
        handleChange={this.props.handleChange} />
        <span className='mini'>{this.props.weekDayOne}</span>
      </div>)

    const checkout = (
      <div className='checkdate item'>
        <p className='checkdate'>Check out:</p>
      <Date
        disabled={this.props.datepickerDisabled}
        min={this.props.minCheckout}
        name='secondDate'
        placeholder={this.props.secondDate}
        icon='calendar alternate outline'
        //value={this.props.date} 
        handleChange={this.props.handleChange} />
        <span className='mini'>{this.props.weekDayTwo} ({this.props.difference} nights)</span>
        </div>)

    const checkInCheckOut = (
      <div id='datepicker'>
        {checkin}
        {checkout}
      </div>
    )

    const guests = (
        <Guests clearGuests={this.state.clearGuests} placeholder={this.state.guestsAndRooms} style={defaultStyle} registerSearchParams={this.registerSearchParams}/>
    )
    return (
        <div id='searchBook' className='tabContent'>
          <h3>{header}</h3>
          <p className='alignLeft'>Where to go:</p>
          {whereToGo}
          {showOrHideFreeSearch}
          <p className='alignLeft'>Type of accomodation:</p>
          {accomodation}
          {checkInCheckOut}
          <label id='specificDates' className='item hoverMe'>
            <input type='checkbox' value='specificDates' onChange={this.props.noDates}/> I have no specific dates
          </label>
          <p className='alignLeft'>Guests:</p>
          {guests}
          <button id='submitSearch' className='hoverMe' type='submit' style={defaultStyle}>Search</button>
        </div>
    )
  }
}

export default Accomodation;
