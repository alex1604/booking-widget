import React, { Component } from 'react'
import { Icon } from'semantic-ui-react'
import './Widget.css'

class SelectTemplate extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <select
            name={this.props.name}
            style={this.props.style}
            defaultValue={this.props.options[0].value} 
            onChange={this.props.onChange}
            className='ui compact selection caret down icon item'>
            {this.props.options.map(op => <option key={op.key} value={op.value}>{op.text}</option>)}
          </select>
        )
}
}

export default SelectTemplate