import React, { Component } from "react";
import Search from "../App/Search";
import Session from "../App/Session";

class Main extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
     id: '',  
    }

    $(document).ready(function(){
     $('.modal').modal();
    });
  }

  changeSession(value) {
    this.setState({
      id: value
    });
    this.refresh();
  }

  refresh() { 
    this.setState({
    refresh: !this.state.refresh
    })
  }

  render() {   
    return (
      <div>
        <div id="meta" className="row">
          <Session id={this.state.id} id={this.changeSession.bind(this)}/>
        </div>
        <div id="content" className="row">   
          <Search id={this.state.id} refresh={this.refresh}/>
        </div>
      </div>
    )
  }
}

export default Main; 