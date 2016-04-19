var Student = require('../models/student.js');

var mondays = ['Monday', 'monday'];
var tuesdays = ['Tuesday', 'tuesday', 'teusday'];
var wednesdays = ['Wednesday', 'wednesday', 'wendsday', 'wendsy'];
var thursdays = ['Thursday', 'thursday', 'tursday', 'Tursday', 'Thursdy', 'thursdy'];
var fridays = ['Friday', 'friday', 'fri', 'Fri','fridy', 'Fridy'];
var saturdays = ['Saturday', 'saturday', 'satrday', 'Satrday', 'Sat', 'sat'];
var sundays = ['Sunday', 'sunday', 'Sun', 'sun', 'Sundy', 'Sunday'];

var week = [mondays, tuesdays, wednesdays, thursdays, fridays, saturdays, sundays];

var schedule = {
	"monday": false,
	"tuesday": false,
	"wednesday": false,
	"thursday": false,
	"friday": false,
	"saturday": false,
	"sunday": false
};

var scheduleParser = function (student, message) {
	week.forEach(function(day){
		day.forEach(function(spelling){
			if (message.indexOf(spelling) !== -1 && student.schedule[day[1]] !== true){
				schedule[day[1]] = true;
			}
		})
	});
	student.schedule = schedule;
	student.save(function(err){
		if(!err){
			console.log(student.name + "'s schedule set.")
		}
	})
}

module.exports = scheduleParser;
