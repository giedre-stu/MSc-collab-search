const mongoose = require('mongoose'); 

const querySchema = mongoose.Schema({ 
  keyword: String,
  id: String, 
  date: Date
},{
	collection: 'queries'
}
);
 
module.exports = mongoose.model('Query', querySchema);