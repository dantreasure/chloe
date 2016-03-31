var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
	name: String,
	phone_number: String,
	messages: Array
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;