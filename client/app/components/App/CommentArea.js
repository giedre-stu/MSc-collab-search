import React, { Component } from "react";
import { Modal, Button, Icon } from 'react-materialize';
import Comment from "../App/Comment";
import axios from 'axios';

class CommentArea extends React.Component {

  constructor(props) {

    super(props);
    this.state={ 
      id: props.id,
      comments: props.comments,
    } 

    this.addComment = this.addComment.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      'id': nextProps.id,
      'comments': nextProps.comments
    });
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

  addComment(event) { 
    event.preventDefault(); 
    const data = new FormData(event.target);
    var name = data.get('name');
    var content = data.get('content');

    if (this.validate(name)) { 
      if (this.validate(content)) {
        axios.post('/comment', {
        'comment_name':name,
        'comment_text':content,
        'id': this.state.id
        });
      }
    }
  }

  render() { 
    let Comments;  
    if (this.state.id == '' || this.state.comments.length == 0) { 
      Comments =  (
        <span>
         No comments to display.
        </span>
      )} else {
          Comments = this.state.comments.map(function(item, index) {
            return (
              <div key={index}>
                  <Comment 
                    name = {item.comment_name}
                    content = {item.comment_text}
                    date = {item.comment_date_string}
                  />
              </div>
            )
          })
      } 
      return ( 
        <div>  
            <form onSubmit={this.addComment}> 
              <input name="name" placeholder="Name"/> 
              <input name="content" placeholder="Comment text"/>
              <Button>ADD A COMMENT</Button>
            </form>  
          <br/> 
          {Comments}  
        </div>
      )
  }
}

export default CommentArea; 