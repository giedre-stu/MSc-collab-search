const mongoose = require('mongoose');

// create a schema
const resultSchema = mongoose.Schema({ 
  id: String,
  link: String, 
  snippet: String,
  title: String,
  tag: String,
  date: Date,
  comments: [{
      comment_name: String,
  		comment_text: String,
  		comment_date: Date,
      comment_date_string: String,
  	}]
},{
	collection: 'results'
}
);
 
module.exports = mongoose.model('Result', resultSchema);