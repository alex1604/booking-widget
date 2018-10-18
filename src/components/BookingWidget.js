import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import './Widget.css'

//import { Modal , Button } from 'semantic-ui-react'


class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {
        textSearch: false,
      // TO DO
    }
  }
  componentDidMount() {
      // TO DO
  }
  render() {
      // TO DO
    const selectTemplate = (options) => { 
        return (<select
          className="ui dropdown"
          label='Category'
          placeholder="category"
          onChange={this.changeLocation}
          style={{height: '50px', width: '90%'}}
        >
          {options.map(op => <option key={op.key} value={op.value}>{op.text}</option>)}
        </select>)
    }
        
    const whereToGo = !this.state.textSearch ? (
        <div>
        {selectTemplate(this.props.destinations)}
        <p onClick={()=>this.setState({textSearch: !this.state.textSearch})}>Click here for free text search</p>
        </div>
    ) : (
        <div>
        <input type="text" placeholder="Area, landmark or property" style={{height: '50px', width: '90%'}}/>
        <p onClick={()=>this.setState({textSearch: !this.state.textSearch})}>Click here for free text search</p>
        </div>
    )
    const accomodation =(selectTemplate(this.props.accomodations))

    const checkInCheckOut = (
        <div>
        <input type='date'/>
        <input type='date'/>
        </div>
    )
    return (
      <main>
        <div id='tabBox'>
            {whereToGo}
            {accomodation}
            {checkInCheckOut}
            <label>
                <input type='checkbox' id='specificDates' value='specificDates'/> I have no specific dates
            </label>
        </div>
      </main>
    )
  }
}

export default Widget;
