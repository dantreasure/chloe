var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
	name: String,
	phone_number: String,
	messages: Array,
 	convoState: { type: String, default: 'intro1' }
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;