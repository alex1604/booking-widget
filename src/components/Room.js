import React, { Component } from 'react'
import { Icon, Button } from 'semantic-ui-react'
import './Widget.css'

class SelectTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomNumber: 1,
            customParams: 0,
            adults: 0,
            children: 0
        }
    }
    addExtraRoom = () => {
        this.setState({ roomNumber: this.state.roomNumber + 1 })
    }
    rooms = (props) => {
        let rooms = []
        for (let i = 0; i < this.state.roomNumber; i++) {
            rooms.push(<div className='room' key={i}>
                <h4>Room {i + 1}:</h4>
                <select
                    name={`room${i + 1}adults`}
                    style={{ width: '35%', height: '20px' }}
                    defaultValue={props.adults[1].value}
                    onChange={this.newValues}
                    className='adults guests item ui selection'
                    icon={props.icon}>
                    {props.adults.map(op => <option key={op.key} value={op.value}>{op.text}</option>)}
                </select>
                <select
                    name={`room${i + 1}children`}
                    style={{ width: '35%', height: '20px' }}
                    defaultValue={props.children[0].value}
                    onChange={this.newValues}
                    className='children guests item ui selection'
                    icon={props.icon}>
                    {props.children.map(op => <option key={op.key} value={op.value}>{op.text}</option>)}
                </select>
            </div>)
        } return rooms
    }
    paramsSaved = (adults, children) => {
        let callback = o => { this.props.registerSearchParams(o) }
        let o = {
            adults : adults,
            children : children,
            rooms : this.state.roomNumber
        }
        console.log('object:', o)
        callback(o)
    }
    newValues = () => {
        let valueList = document.getElementsByClassName('guests')
        let newadults = 0
        let newchildren = 0
        for (let i = 0; i < valueList.length; i++) {
            let classes = valueList[i].classList
            let value = valueList[i].value
            console.log('value:', value)
            if (classes[0] != 'children') {
                newadults += Number(value)
            } else {
                newchildren += Number(value)
            }
        }
        this.setState({ adults: newadults, children: newchildren }, this.paramsSaved(newadults, newchildren))
        console.log(this.state)
    }
    render() {
        const addRoom = (
            <div id='addRoomAddon' onClick={this.addExtraRoom} className='hoverMe'>
                <Icon name='plus square' color='blue' />
                Add room
            </div>
        )
        const submitAddon = (
            <div id='submitAddon' style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:'10px'}}>
                <Button style={{backgroundColor: '#E1E3E5', color: 'gray', borderRadius: '0px'}} onClick={this.cancel}>Cancel</Button>
                <Button color='pink' onClick={this.newValues} style={{ borderRadius: '0px'}}>Done</Button>
            </div>
        )
        return (
            <div>
                {this.rooms(this.props)}
                {addRoom}
                {submitAddon}
            </div>
        )
    }
}

export default SelectTemplate