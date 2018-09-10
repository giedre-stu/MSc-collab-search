const mongoose = require('mongoose');

// create a schema
const sessionSchema = mongoose.Schema({ 
  sessionTitle: String,
  sessionQueries: [{keyword: String}],
  savedResults: [{
  	date: Date,
  	title: String,
  	url: String,
  	snippet: String,
  	label: String,
  }]
  
});

module.exports = mongoose.model('Session', sessionSchema);