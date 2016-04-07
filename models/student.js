var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
	date: { type: Date, default: Date.now },
	intent: String,
	synopsis: String,
	future_goals: String,
	improvements: String,
	_owner: [mongoose.Schema.Types.ObjectId]
});

var studentSchema = mongoose.Schema({
	name: String,
	phone_number: String,
	messages: Array,
 	convoState: { type: String, default: 'intro1' },
 	logs: [logSchema]
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;