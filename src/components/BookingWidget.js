import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import './Widget.css'
import 'semantic-ui-react'
import Accomodation from './Accomodation.js'
import EmptyTab from './EmptyTab'

//import { Modal , Button } from 'semantic-ui-react'


class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: false,
      date: this.props.date,
      secondDate: this.props.secondDate,
      maxCheckin: this.props.maxCheckin,
      minCheckout: this.props.minCheckout,
      minCheckin: this.props.minCheckin,
      datepickerDisabled: false,
      currentTab: 'accomodation'
    }
  }
  componentDidMount() {
    
  }
  activeTab = name => {
    let listOfTabs = document.getElementsByClassName('tab');
    for (let i = 0; i < listOfTabs.length; i++) {
      listOfTabs[i].classList.remove('active')
    }
    document.getElementsByName(name)[0].classList.add('active');
    this.setState({currentTab: name}, ()=>console.log(this.state))
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
      let newSecondDate;
      if (name === 'secondDate') {
        let date = processDate(value)
        console.log(date)
        let maxCheckin = `${date.date - 1}/${date.month}/${date.year}`
        this.setState({ maxCheckin: maxCheckin })
        this.props.getDay('weekDayOne', value)
      } else if (name === 'date') {
        let date = processDate(value)
        let secondDate = processDate(this.props.secondDate);
        if (date.month >= secondDate.month && date.date >= secondDate.date && date.year >= secondDate.year){
          newSecondDate = `${date.date + 1}/${date.month}/${date.year}`
          this.newDate('secondDate', newSecondDate);
          this.setState({ minCheckout: newSecondDate}, console.log('new secondate:', this.state))
          this.props.getDay('weekDayTwo', value)
        } else {
        let minCheckout = `${date.date + 1}/${date.month}/${date.year}`
        this.setState({ minCheckout: minCheckout})
        this.props.getDay('weekDayTwo', value)
        }
      }
    }
    this.newDate(name,value)
    calculateNewMaxCheckin(name, value)
  }
  render() {
    // TO DO
    const whichTab = this.state.currentTab == 'accomodation' ? (
      <Accomodation 
      noDates={this.noDates}
      newDate={this.newDate}
      handleChange={this.handleChange}
      options={this.props.options}
      accomodations={this.props.accomodations}
      destinations={this.props.destinations}
      registerLocation={this.props.registerLocation}
      registerAccomodation={this.props.registerAccomodation}
      date={this.props.date}
      secondDate={this.props.secondDate}
      minCheckin={this.props.minCheckin}
      minCheckout={this.state.minCheckout}
      maxCheckin={this.state.maxCheckin}
      datepickerDisabled={this.state.datepickerDisabled}
      weekDayOne={this.props.weekDayOne}
      weekDayTwo={this.props.weekDayTwo}
      difference={this.props.difference}
      registerSearchParams={this.props.registerSearchParams}
      />
    ) : (
      <EmptyTab/>
    )
    
    return (
      <main>
        <div id='tabs'>
          <div onClick={()=>this.activeTab('accomodation')} className='tab active hoverMe' name='accomodation'>ACCOMODATION</div>
          <div onClick={()=>this.activeTab('activities')} className='tab hoverMe' name='activities'>ACTIVITIES</div>
          <div onClick={()=>this.activeTab('events')} className='tab hoverMe' name='events'>EVENTS</div>
          <div onClick={()=>this.activeTab('car')} className='tab hoverMe' name='car'>CAR</div>
        </div>
        {whichTab}
      </main>
    )
  }
}

export default Widget;
