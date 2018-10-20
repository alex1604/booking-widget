import React, { Component } from 'react'
import { Button, Popup } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import Room from './Room.js'
import options from '../options.js'
import './Widget.css'


class Guests extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
                <Popup
                    trigger={(<Input className='item' 
                    style={this.props.style} 
                    icon='caret down' 
                    placeholder={this.props.placeholder} />)}
                    content={(<Room 
                        adults={options.rooms.adults} 
                        children={options.rooms.children} 
                        style={this.props.style}
                        icon='caret down'
                        registerSearchParams={this.props.registerSearchParams}/>
                    )}
                    on='click'
                    className='item'
                    position='bottom center'
                    style={{minWidth: '360px', height: 'auto'}}
                    onClick={this.props.clearGuests}
                />
        )
    }
}

export default Guests