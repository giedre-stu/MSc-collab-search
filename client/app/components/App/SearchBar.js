import React, { Component } from "react";
import axios from 'axios'; 

class SearchBar extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      query: '' 
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
     id: nextProps.id 
    });  
  }

  handleChange(event) {
    this.setState({query:event.target.value}) 
  }

  handleSubmit(event) {  
    event.preventDefault(); 
    if (this.state.query) {
      this.props.query(this.state.query);
      this.postQuery(this.state.query);
    }
  }

  postQuery(value) { 
    axios.post('/query', {
      'keyword':value, 
      'id': this.state.id
    })
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
            Enter a search query: <input type="text" query={this.state.query} onChange={this.handleChange} />
        </label>
         <button className="btn waves-effect waves-light" type="submit" name="action">
            Search
            <i className="material-icons right">search</i>
        </button>
       </form>
      )
  }
}

  export default SearchBar;