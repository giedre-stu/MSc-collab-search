import React, { Component } from "react";
import axios from 'axios';

class Result extends React.Component {
	constructor(props) {
	    super(props);  
	    this.state={
	      id: props.id,
	      title: props.title,
	      link: props.link,
	      snippet: props.snippet,    
	    }
	    this.handleSubmit = this.handleSubmit.bind(this);
	 }

	handleSubmit(event) {  
	    event.preventDefault();
	    this.postResult(); 
  	}

  	componentWillReceiveProps(nextProps) {
	    this.setState({
			title: nextProps.title,
			link: nextProps.link,
			snippet: nextProps.snippet,
	    }); 
  	}

	postResult(value) { 
	    axios.post('/result', { 
	      'id': this.state.id, 
	      'link': this.state.link, 
	      'title': this.state.title,
	      'snippet': this.state.snippet,
	    })
	}

	render() {
		return (
			<div className="card-content"> 
				<form> 
	                <button className="btn-floating btn-small halfway-fab waves-effect waves-light red" 
	                    onClick={this.handleSubmit} 
	                    value="hello">
	                    <i className="material-icons">arrow_forward</i>
	                </button>
               </form>
                <span className="card-title">
                	<div className="content-title">
                		<a href={this.state.link} target="_blank">{this.state.title}</a>
                	</div>
                </span> 
                 {this.state.snippet}  
            </div>
    	)
    }
}

export default Result;