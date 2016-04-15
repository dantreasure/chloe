var Student = require('../models/student.js');
var respond = require('../utils/respond');

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
	for (var day in dayKey){
		if(dayKey[day] === todaysDay){
			var qry = 'schedule.' + day;
			var query = {
				'schedule.' + day: true
			}
			console.log(query)
			Student.findOne(query, 'name', function (err, student) {
			  if (err) return handleError(err);
			  console.log(qry)
			  console.log(student)
			})
		}
	}
}

module.exports = checkStudents;
