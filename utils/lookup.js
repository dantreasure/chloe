var Student = require('../models/student.js');
var respond = require('../utils/respond');
var sendMessage = require('../utils/sendMessage');
var advanceConversation = require('../utils/advanceConversation');

function lookup(qry){
	console.log("Lookup called with query: ", qry)
	Student.find(qry, 'name reminderTime phone_number convoState', function (err, students) {
		if (err) console.log(err);

		console.log(students)
		console.log("this is inside Student.find")
		// students.forEach(function(student){
		// 	var msg = "Hey " + student.name + ", were you able to practice yoga today?"
		// 	sendMessage(msg, student.phone_number);
		// 	advanceConversation(student, "log0");
		// })
	})
}

module.exports = lookup;