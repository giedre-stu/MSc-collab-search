const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({ 
  id: String,
  text: String,
  name: String,
  date: Date
},{
	collection: 'messages'
}
);
 
module.exports = mongoose.model('Message', messageSchema);