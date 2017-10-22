import React, { Component } from 'react'

class Controls extends React.Component{

    constructor(props){
        super(props)
        this.props = props
        this.state = {
            keyword: this.props.keyword
        }
    }

    handleKeywordChange(event){
        this.setState({
            keyword: event.target.value
        })
        event.preventDefault();
        this.props.search(this.state.keyword)
    }

    render(){
        return(
            <section className="App-controls">
                <label>Search videos :</label>
                <input value={this.state.keyword} onChange={this.handleKeywordChange.bind(this)} />
                <label>Videos from most liked users</label>
				<input type="checkbox" value={false} onChange={this.props.onTrendingUsers}   /> 
                <label>Items to show</label>
                <select  onChange={this.props.selectItemsPerPage}>
                    <option default value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </section>
        )
    }


}

export default Controls