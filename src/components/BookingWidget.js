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

class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: false,
      date: this.props.date,
      secondDate: this.props.secondDate,
      maxCheckin: this.props.maxCheckin
      // TO DO
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
        <FreeSearch type='text' placeholder='Area, landmark or property' style={defaultStyle} />
      )
    const showOrHideFreeSearch = !this.state.textSearch ? (
      <p id='hideSearch' onClick={() => this.setState({ textSearch: !this.state.textSearch })}>Click here for free text search</p>
    ) : (
        <p id='hideSearch' onClick={() => this.setState({ textSearch: !this.state.textSearch })}>Hide text search</p>
      )

    const accomodation = (selectTemplate(this.props.accomodations, 'currentAccomodation', this.props.registerAccomodation))
    const selectGuests = selectTemplate(this.props.destinations, 'guests', this.props.registerLocation)

    const checkin = (
      <Date
        min={this.props.minCheckin}
        max={this.state.maxCheckin}
        name='date'
        placeholder={this.props.date}
        date={this.state.from}
        icon='calendar alternate outline'
        handleChange={this.handleChange} />)

    const checkout = (
      <Date
        min={this.state.minCheckout}
        name='secondDate'
        placeholder={this.props.secondDate}
        date={this.state.until}
        icon='calendar alternate outline'
        //value={this.props.date} 
        handleChange={this.handleChange} />)

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
          {whereToGo}
          {showOrHideFreeSearch}
          {accomodation}
          {checkInCheckOut}
          <label id='specificDates'>
            <input type='checkbox' value='specificDates' /> I have no specific dates
          </label>
          {selectGuests}
          <button id='submitSearch' type='submit' style={defaultStyle}>Search</button>
        </div>
      </main>
    )
  }
}

export default Widget;
