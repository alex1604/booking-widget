import React, { Component } from 'react'

class SelectTemplate extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <select
            compact='true' 
            name={this.props.name} 
            options={this.props.options} 
            style={this.props.style}
            defaultValue={this.props.options[0].value} 
            onChange={this.props.onChange}
            className='ui dropdown icon'>
            {this.props.options.map(op => <option key={op.key} value={op.value}>{op.text}</option>)}
          </select>
        )
}
}

export default SelectTemplate