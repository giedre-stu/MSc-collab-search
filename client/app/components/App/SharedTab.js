import axios from 'axios';
import Pusher from 'pusher-js';
import React, { Component } from "react";
import SharedResult from "../App/SharedResult";
import { Button } from 'react-materialize';

const API_URL = 'http://localhost:9000/api/';

class SharedTab extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      id: props.id,
      results: []
    } 

    this.addLink = this.addLink.bind(this);
    this.loadResults = this.loadResults.bind(this); 
  }

  componentDidMount() {
    this.pusher = new Pusher('646362f68c27c766a87c', {
          cluster: 'eu',
      encrypted: true,
    });
    this.result_channel = this.pusher.subscribe('results');
    this.result_channel.bind('result_inserted', this.loadResults);
    this.result_channel.bind('result_updated', this.loadResults);
    this.result_channel.bind('result_deleted', this.loadResults);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
     id: nextProps.id, 
    });

    document.getElementById('addButton').disabled = false; 
    this.loadResults();
  } 

  validate(data) {   
    if(data != null && data != ''){
      return true;
    } else {
      M.toast({
        html: 'All input fields are required', 
      })
      return false;
    }
  }

  addLink(event) {  

    event.preventDefault();
    const data = new FormData(event.target);
    var title = data.get('title');
    var link = data.get('link');
    var snippet = data.get('snippet');   

    if (this.validate(title)) {
      if (this.validate(link)) {
        if (this.validate(snippet)) {
          axios.post('/result', { 
          'id': this.state.id,  
          'title': title,
          'link': link,
          'snippet': snippet
          });
        }
      }
    }
  }

  loadResults() {  
    axios.get('/results', {
      params: {
        'sessionid': this.state.id,
      }
    }).then (res=> {
      if (res.data.result.length>0) {
        this.setState({results: res.data});
      } else {
        this.setState({results: []});
      }
    }); 
  } 

  render() {

    let SharedResults;
    let sessionid = this.state.id;
    if (this.state.results.length < 1) {
      SharedResults = <span>You have not shared anything yet. </span>
    } else {
      SharedResults =  
        this.state.results.result.map(function(item, index) { 
          return (
            <div key={index}> 
              <SharedResult 
                title={item.title} 
                link={item.link} 
                snippet={item.snippet} 
                id={sessionid}
                resultid={item._id}
                comments={item.comments} 
              /> 
            </div>
          )}       
        ) 
    }
    return ( 
        <div className = "row">
            <div className = "col s12">
                <div className="card-header blue-grey white-text">
                  <div className="card-content">
                    <button 
                      id="addButton" 
                      disabled="true" 
                      className="btn-floating modal-trigger waves-effect waves-light red right" 
                      data-target="add"> 
                      <i className="material-icons">add</i>
                    </button> 
                    <span className="card-title">
                        Saved results 
                    </span> 
                  </div>
                </div> 
                  <div className="card-content scrollable"> 
                    {SharedResults} 
                  </div>      
            </div>
            <div id="add" className="modal narrow">
              <div className="modal-content">
                <h5>Add a link</h5>
                  <form onSubmit={this.addLink}> 
                    <input name="title" placeholder="Title"/>
                    <input name="link" placeholder="URL"/> 
                    <input name="snippet" placeholder="Add description"/>
                    <Button className="modal-close">Submit</Button>
                  </form>
              </div>
            </div>
          </div> 
    )
  }
}

export default SharedTab; 