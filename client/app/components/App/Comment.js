import React, { Component } from "react";  

class Comment extends React.Component {

  constructor(props) {

    super(props)
    this.state={ 
       'name': props.name,
       'date': props.date,
       'content': props.content
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      'name': nextProps.name,
      'date': nextProps.date,
      'content': nextProps.content
    })
  }

  render() {  
    return ( 
      <div> 
          <div> 
            <b>{this.state.name}:</b> 
          </div>
          <div>
           {this.state.content}
          </div>
          <div>
            {this.state.date}
          </div>
          <div>
            <br/>
          </div>
      </div>
    )
  }
}

export default Comment; 