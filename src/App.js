import React, { Component } from 'react'

import './App.css'

// Components
import Header from './components/Header'
import Controls from './components/Controls'

// Vimeos Feed
import Vimeo from './Vimeo.js'

class App extends Component {

  constructor(props){
    super(props)
    this.props = props
    this.state = {
      videos: Vimeo.data,
      isTrending: false,
      currentPage: 1,
      itemsPerPage: 10,
    }

    this.changePage = this.changePage.bind(this)
  }

  // Display pagination 

  changePage(event){
    
    this.setState({
      currentPage: Number(event.target.id)
    });

  }

  displayPagination(){
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.videos.length / this.state.itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    
    return (
      <ul className="App-pagination">
        { pageNumbers.map(number => {
            return <li key={number} id={number} onClick={this.changePage}> {number} </li>
        }) }
      </ul>
    )
  }

  // Filter videos by keyword matching in the description attribute
  search(keyword){

    keyword = keyword.toLowerCase()
    // Changing Component State
    this.setState({
      ...this.state,
      videos: Vimeo.data.filter( (video) => {
        return video.description && video.description.toLowerCase().indexOf(keyword) > -1
      })
    })

  }

  getTrendingUsers(event){
    
    event.preventDefault();

    this.setState({
      ...this.state,
      isTrending: ! this.state.isTrending,
      videos: Vimeo.data.filter( (video) => {
         // Check if we should get the videos based on treding users
        if(this.state.isTrending)
          return parseInt(video.user.metadata.connections.likes.total) > 10
        return true
      } )
    })

    
  }

  selectItemsPerPage(event){
    
    this.setState({
      ...this.state,
      itemsPerPage: event.target.value
    })
    event.preventDefault();

  }

  render() {

    const indexOfLastVideo = this.state.currentPage * this.state.itemsPerPage;
    const indexOfFirstVideo = indexOfLastVideo - this.state.itemsPerPage;
    // Slice diplayed videos
    const currentVideos = this.state.videos.slice(indexOfFirstVideo, indexOfLastVideo)

    return (      
      <div className="App">
        <Header />
        <Controls 
          onTrendingUsers={this.getTrendingUsers.bind(this)}
          search={this.search.bind(this)}
          keyword=""
          selectItemsPerPage={this.selectItemsPerPage.bind(this)}
        />
        <div className="App-videos">
          { currentVideos.map( (video, index) => {
            return (
              <div className="App-video" key={index}>
                <div className='App-video-author'>
                  <a href={ ((video.user.link)) ? video.user.link : '#' }> <img alt={video.user.name} src={ (video.user.pictures) ? video.user.pictures.sizes[2].link : 'http://www.wilwia.com/images/default-user.png' } /></a>
                </div>
                <div className='App-video-content'>
                  <a href={ video.link }><h1>{ video.name }</h1></a>
                  <p>{(video.description) ? video.description.substr(0, 100) : 'No description given'}...</p>
                  <div className="App-video-metas">
                    <span>Vues: { (video.stats) ? video.stats.plays : 0 }</span>
                    <span>Likes: { video.metadata.connections.likes.total.toLocaleString()}</span>
                    <span>Comments : {video.metadata.connections.comments.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )
          })  }
        </div>
        { this.displayPagination() }
      </div>
    );
  }
}

export default App;
