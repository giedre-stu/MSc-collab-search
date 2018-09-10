import React, { Component } from "react";
import Chat from "../App/Chat";
import ResultList from "../App/ResultList";
import SearchBar from "../App/SearchBar";
import SharedTab from "../App/SharedTab";
import QueryHistory from "../App/QueryHistory";
import axios from 'axios'; 
 
var url = 'https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyCBxfZnmNmPktPM_uzvxH8ZS3poBQSDQco&cx=005831732795557864070:mrprqmaf-ma&q=' 
// var url = 'https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyBwiaT18CFVqsRvhnLfOERSozHNgSNIkkQ&cx=005831732795557864070:ur962c80qs8&q' 

class Search extends React.Component {

  constructor(props) {

    super(props);
    this.state = { 
      results: [],
      requestFailed: false,
      }; 
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
     id: nextProps.id,
     results: []
    });  
  }

  fetch(query) {
     fetch(url+query)
    .then(response => {
      if (!response.ok){
        throw Error("Network request failed")
      } return response
    })
    .then(d => d.json())
    .then(d => {
      this.setState({
        results:d
      });
      this.render(); 
    }, () => {
      this.setState({
        requestFailed: true
      })
    })
  } 

  render() {

        let SearchResults;
        let Bar;

        if (this.state.id === undefined || this.state.id == '') {
          Bar = <span>Please open an existing search session or create a new session.</span>
          SearchResults = <div></div>
        } else {
          Bar = <SearchBar id={this.state.id} query={this.fetch.bind(this)}/>
          if (this.state.results === undefined || this.state.results.length == 0) {
            SearchResults = <p>No results to display</p>;
          } else if (this.state.requestFailed) {
            SearchResults =  <p>Failed search </p>;
          } else {
            SearchResults = <ResultList results={this.state.results} id={this.state.id}/>
          }
        } 

        return (
          <div id = "content" className = "row">
            <div id="history" className="col s2">
              <div className="card white">
                <QueryHistory id={this.state.id}/>
              </div>
            </div> 
            <div id="search" className = "col s4">  
              <div className="card-panel white">
                    {Bar}
                  <div> 
                    {SearchResults}
                  </div>
              </div>
            </div>
            <div id="sharedtab" className="col s4">
              <div className="card white"> 
                <SharedTab id={this.state.id}/>
              </div>
            </div>
            <div id="chat" className="col s2">
              <div className="card white">
                <Chat/>
              </div>
            </div>     
          </div>
  )}
}

export default Search; 