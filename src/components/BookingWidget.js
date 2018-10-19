import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import './Widget.css'
import 'semantic-ui-react'
import { Input, Icon } from 'semantic-ui-react'
import Date from './Date.js'
import FreeSearch from './FreeTextBar.js'
import SelectTemplate from './Select.js'

//import { Modal , Button } from 'semantic-ui-react'

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
  handleChange = (event, { name, value }) => {
    let calculateNewMaxCheckin = name => {
      if (name === 'secondDate'){
      let date = new Date(value).getDate();
      let month = new Date(value).getMonth() + 1;
      let year = new Date(value).getFullYear();
      let maxCheckin = `${date-1}/${month}/${year}`
      this.setState({maxCheckin: maxCheckin})
      }
    }
    this.props.update(name, value)
    calculateNewMaxCheckin()
  }
  render() {
    // TO DO
    const selectTemplate = (options, name, onChange) => {
      return (<SelectTemplate
        name={name}
        options={options}
        onChange={onChange}
        style={{ height: '50px', width: '90%' }}
      />)
    }

    const whereToGo = !this.state.textSearch ? (
      selectTemplate(this.props.destinations, 'currentDestination', this.props.registerLocation)
    ) : (
        <FreeSearch type='text' placeholder='Area, landmark or property' style={{ height: '50px', width: '90%' }} />
      )
    const showOrHideFreeSearch = !this.state.textSearch ? (
      <p id='hideSearch' onClick={() => this.setState({ textSearch: !this.state.textSearch })}>Click here for free text search</p>
    ) : (
        <p id='hideSearch' onClick={() => this.setState({ textSearch: !this.state.textSearch })}>Hide text search</p>
      )

    const accomodation = (selectTemplate(this.props.accomodations, 'currentAccomodation', this.props.registerAccomodation))
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
        min={this.props.minCheckout}
        name='secondDate'
        placeholder={this.props.secondDate}
        date={this.state.until}
        icon='calendar alternate outline'
        //value={this.props.date} 
        handleChange={this.handleChange} />)

    const checkInCheckOut = (
      <div>
        {checkin}
        {checkout}
      </div>
    )
    return (
      <main>
        <div id='tabBox'>
          {whereToGo}
          {showOrHideFreeSearch}
          {accomodation}
          {checkInCheckOut}
          <label>
            <input type='checkbox' id='specificDates' value='specificDates' /> I have no specific dates
            </label>
        </div>
      </main>
    )
  }
}

export default Widget;
