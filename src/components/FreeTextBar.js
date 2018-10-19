import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

class FreeSearch extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false
        }
    }
    checkChanges = e => {
        if (e.target.value != '') this.setState({loading: true})
    }
    checkOnKeyUp = e => {
        setTimeout(() => {
        this.setState({loading: false})
        },1000)
    }
    render() {
        const inputSearch = this.state.loading ? (
            <Input loading type={this.props.type} 
            placeholder={this.props.placeholder} 
            style={{ height: '100%', width: '100%' }}
            onChange={this.checkChanges}
            onKeyUp={this.checkOnKeyUp}/>
        ) : (
            <Input type={this.props.type} 
            placeholder={this.props.placeholder} 
            style={{ height: '100%', width: '100%' }}
            onChange={this.checkChanges}
            onKeyUp={this.checkOnKeyUp}/>
        )
        return (
            <div style={this.props.style}>
            {inputSearch}
            </div>
        )
}
}

export default FreeSearch