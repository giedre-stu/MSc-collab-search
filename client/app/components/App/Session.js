import React, { Component } from "react";
import axios from 'axios';

class Session extends React.Component {

  constructor(props) {
    super(props); 
    this.state={  
      title: '',
      value: '', 
      fetched: ''
    }

    this.create = this.create.bind(this);
    this.load = this.load.bind(this);
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

  create(event){
    event.preventDefault();
    const data = new FormData(event.target); 
    var newTitle = data.get('create'); 
    var isValidated = this.validate(newTitle); 

    if (isValidated){
      var newTitle = data.get('create'); 
      axios.post('/session', {
        'sessionTitle':newTitle
      }).then(res=> { 
        this.setState({title:res.data.result.sessionTitle});
        this.setState({id:res.data.result._id});  
        this.props.id(this.state.id);
      })
    }
  } 

  load(event) {
    event.preventDefault(); 
    const data = new FormData(event.target);
    var session = data.get('load'); 
    var isValidated = this.validate(session);

    if(isValidated){  
      axios.get('/session', {
        params: {
          sessionid: session
        }
      }).then (res=> {
        this.state.fetched = res.data; 
        this.setState({title:res.data.result.sessionTitle});
        this.setState({id:res.data.result._id});  
        this.props.id(this.state.id);
      });
    }
  }

  render() {   
    return( 
      <div className = "col s12">  
          <div id="current-session" className="col s4"> 
            <div>
              <h5>Session: {this.state.title}</h5>
            </div> 
          </div>
          <div id="current-session" className="col s5"> 
            <div>
              <h5>Session ID: {this.state.id}</h5>
            </div> 
          </div>  
          <div id="createnew" className="modal narrow">
            <div className="modal-content">
              <h5>Create a new session</h5>    
                 <form onSubmit={this.create}>
                    Enter session title: 
                    <input name="create" type="text"/>
                    <button className="btn-flat modal-close">Create</button>
                </form> 
            </div>
          </div>
          <div id="load" className="modal narrow">
            <div className="modal-content">
              <h5>Open a previous session</h5>    
                 <form onSubmit={this.load}>
                    Enter session ID:
                    <input name="load" type="text"/>
                    <button className="btn-flat modal-close">Open</button>
                </form> 
            </div>
          </div> 
      </div>
  )}
}

export default Session;