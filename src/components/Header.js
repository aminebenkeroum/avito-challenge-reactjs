import React, { Component } from 'react'
import logo from '../logo.png'

class Header extends React.Component{

    constructor(props){
        super(props)
        this.props = props
    }

    render(){
        return(
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Feed App</h1>
            </header>
        )
    }


}

export default Header