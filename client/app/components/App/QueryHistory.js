import Pusher from 'pusher-js';
import React, { Component } from "react";
import axios from 'axios';

const API_URL = 'http://localhost:9000/api/';

class QueryHistory extends React.Component {

  constructor(props) {
    super(props); 
    this.state={
      queries: [], 
      id:''
    }

    this.loadQueries = this.loadQueries.bind(this);
  }

  loadQueries(e) {
     axios.get('/queries', {
      params: {
        sessionid: this.state.id
      }
    }).then (res=> { 
      if (res.data.result.length>0) {
        this.setState({queries:res.data});
      } else {
        this.setState({queries:[]});
      }
    }); 
  }

  componentDidMount() {
    this.pusher = new Pusher('646362f68c27c766a87c', {
          cluster: 'eu',
      encrypted: true,
    });
    this.query_channel = this.pusher.subscribe('queries');
    this.query_channel.bind('query_inserted', this.loadQueries);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
     id: nextProps.id
    });
    this.loadQueries(); 
  }

  render() {   
    let Queries;

    if (this.state.queries.length < 1) {
      Queries = <span>No queries to display</span>
    } else {
      Queries =  
         <div className = "collection">
          {this.state.queries.result.map(function(query, index) {
            return (
              <a key={index} className="collection-item dense">
                {query.keyword}
              </a>
             )}       
          )}
        </div>
    }

    return(
      <div className = "row">
        <div className = "col s12">   
            <div className="card-header blue-grey white-text">
              <div className="card-content">
                <span className="card-title">Query history</span>
              </div>
            </div>
            <div className="divider"></div>
            <div className="card-content">
              {Queries}
            </div>
        </div>
      </div>         
  )}
}

export default QueryHistory; 