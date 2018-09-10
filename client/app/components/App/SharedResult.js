import React, { Component } from "react"; 
import { Button, Modal, Icon } from 'react-materialize'; 
import { Collapsible, CollapsibleItem } from 'react-materialize';
import CommentArea from "../App/CommentArea";
import axios from 'axios';

class SharedResult extends React.Component {

  constructor(props) {

    super(props)
    this.state={  
      resultid: props.resultid, 
      sessionid: props.id,
      title: props.title, 
      link: props.link, 
      snippet: props.snippet,
      comments: props.comments 
    }

    this.deleteItem = this.deleteItem.bind(this); 
  }

  componentWillReceiveProps(nextProps) {

    this.setState({
     comments: nextProps.comments,
     resultid: nextProps.resultid,
     sessionid: nextProps.sessionid,
     title: nextProps.title,
     link: nextProps.link,
     snippet: nextProps.snippet,
     comments: nextProps.comments
    }); 
  } 

  deleteItem(event) {
    event.preventDefault(); 
    axios.post('/delete', { 
        'resultid': this.state.resultid
      })
  }

  render() {  
    return ( 
      <div className="col s12">
        <div className="card-content">
          <form onSubmit={this.deleteItem}> 
            <button className="btn-floating btn-flat btn-small waves-effect waves-light white right"> 
                 <i className="material-icons grey-text">close</i>
            </button>
          </form>
          <span className="card-title">
            <div className="content-title">
              <a href={this.state.link} target="_blank">{this.state.title}</a>
            </div>
          </span>
          <span>
          <div className="content">
            {this.state.snippet} <br/><br/>
          </div>
          <div class="chip">
            All results
            <i class="close material-icons">close</i>
          </div>


          </span>
          <Modal header='Comments' className="modal average" trigger = {
            <Button className="btn-flat right" waves="light">
              Comments: {this.state.comments.length} 
            </Button>
            }><CommentArea id={this.state.resultid} comments={this.state.comments}/>
          </Modal>
        </div> 
      </div>
    )
  }
}

export default SharedResult; 