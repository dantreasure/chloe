var Student = require('/models/student.js');
var respond = require('/utils/respond');
var sendMessage = require('/utils/sendMessage');
var advanceConversation = require('/utils/advanceConversation');
var lookup = require('/utils/lookup');

var dayKey = {
	'sunday': 0,
	'monday': 1,
	'tuesday': 2,
	'wednesday': 3,
	'thursday': 4,
	'friday': 5,
	'saturday': 6
};

var today = new Date();

var todaysDay = today.getDay();
var studentsToNotify = [];
var checkStudents = function(){
	var qry;
	for (var day in dayKey){
		if(dayKey[day] === todaysDay){
			qry = 'schedule.' + day;
			break;
		}
	}
	var query = JSON.parse('{"'+qry+'":true, "reminderTime":"'+today.getHours()+'"}');
	console.log('calling lookup');
	lookup(query);
	
	Student.find(query, 'name reminderTime phone_number convoState', function (err, students) {
		if (err) return handleError(err);

		console.log(students)
		console.log("this is inside Student.find")
		students.forEach(function(student){
			var msg = "Hey " + student.name + ", were you able to practice yoga today?"
			sendMessage(msg, student.phone_number);
			advanceConversation(student, "log0");
		})
	})
}

module.exports = checkStudents;
