import React, { Component } from 'react'
import { Input, Search } from 'semantic-ui-react'
import './Widget.css'
import fetch from 'isomorphic-fetch'

class FreeSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            results: []
        }
    }
    checkChanges = e => {
        if (e.target.value != '') this.setState({ loading: true })
    }
    checkOnKeyUp = e => {
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000)
    }
    stopLoading = () => {
        let callback = () => { this.setState({ loading: false }) }
        setTimeout(callback, 1000)
    }
    handleSearchChange = e => {
        let editedList = [];
        this.setState({ loading: true })
        let value = e.target.value;
        let searchTerm = 'q=' + value
        fetch('http://localhost:3000/api/search?' + searchTerm, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        }).then(response => {
            console.log('response: ', response)
            return response.json()
        }).then(data => {
            let editedList = [];
            for (var i = 0; i < data.length; i++) {
                data[i]['key'] = i;
                editedList.push(data[i])
            }
            this.setState({ results: editedList }, this.stopLoading);
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        const { loading, value, results } = this.state

        const searchComponent = (
            <Search
                loading={loading}
                fluid
                style={{ height: '100%', width: '100%' }}
                placeholder={this.props.placeholder}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={value}
            />
        )
        return (
            <div style={this.props.style} className={this.props.className}>
                {searchComponent}
            </div>
        )
    }
}

export default FreeSearch