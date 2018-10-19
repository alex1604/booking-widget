import React, { Component } from 'react'
import { DateInput } from 'semantic-ui-calendar-react';
import moment from 'moment';
 
moment.locale('se');

class Date extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <DateInput
            closable
            maxDate={this.props.max}
            minDate={this.props.min}
            name={this.props.name}
            placeholder={this.props.placeholder}
            value={this.props.date}
            icon={this.props.icon}
            popupPosition='bottom right'
            onChange={this.props.handleChange} />
        //<Input icon={this.props.icon} placeholder={this.props.placeholder} type={this.props.date}/>
        )
}
}

export default Date
