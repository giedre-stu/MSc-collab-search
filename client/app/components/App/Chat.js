import React, { Component} from "react";
import { Button } from 'react-materialize'; 

class Chat extends React.Component {

  constructor(props) { 

    super(props);
    this.state={
      id: props.id,
      messages: []
    }

    this.addMessage = this.addMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.id
    });
    this.loadMessages();
  }

  addMessage() {
    console.log('add msg');
  }

  loadMessages() {

  }

  render() {   
    return(
      <div className = "row">
        <div className = "col s12">   
          <div className="card-header blue-grey white-text">
            <div className="card-content">
              <span className="card-title">Chat</span>
            </div>
          </div> 
          <div className="card-content">
            <div className="collection dense">
              <form onSubmit={this.addMessage}> 
                <input name="name" placeholder="Name"/> 
                <input name="text" placeholder="Text"/>
                <Button>SEND</Button>
              </form>  
            </div> 
          </div>
        </div>
      </div>
    )}
}

export default Chat; 