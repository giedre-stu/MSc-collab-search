import React, { Component } from "react";
import Result from "../App/Result";
import axios from 'axios';

class ResultList extends Component {
  constructor(props) {
  	super(props)
  	this.state = {
      results: props.results,
      id: props.id,
    }
  } 

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      results: nextProps.results, 
      id: nextProps.id
    }); 
  }
 
  render() {  
    var sessionid = this.state.id;
    return(
      <div>
        <br/> 
          <div className="chip">Found results: {this.state.results.searchInformation.formattedTotalResults}
            <i className="close material-icons">close</i>
          </div>
            {this.state.results.items.map(function(item, index) { 
            return ( 
              <div className="card result" key={index}>
                <Result 
                  title={item.title} 
                  link={item.link} 
                  snippet={item.snippet} 
                  id={sessionid}/>
              </div> 
            )}
          )} 
      </div>
  )}; 
}

export default ResultList;
