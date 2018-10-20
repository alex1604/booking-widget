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
      datepickerDisabled: false,
      currentTab: this.props.currentTab
    }
  }
  activeTab = e => {
    let listOfTabs = document.getElementsByClassName('tab');
    for (let i = 0; i < listOfTabs.length; i++) {
      listOfTabs[i].classList.remove('active')
    }
    e.target.classList.add('active');
    this.props.newTab()
  }
  render() {
      // replaces content on widget when click on a tab other than the accomodation tab
    return (
        <div id='emptyTab' className='tabContent'>
        </div>
    )
  }
}

export default Widget;
