var respond = require('../utils/respond');
var Student = require('../models/student.js');

function inbox(number, message, response){
	Student.findOne({'phone_number': number}, 'name phone_number messages', function(err, student){
		if (err){
			console.error(err)
		} else {
			if(student !== null){
				console.log("We looked up the student " + student)
				student.messages.push(message)
				student.save(function(err){reply(student, response, message);});
				
			} else {
				console.log("We couldn't find an account for " + number);
				createStudent(number, response)
			}
		}
	});
}

function reply(student, response, message){
	if (student.messages.length === 1){
		respond("Nice to meet you " + message, response);
		student.name = message;
		student.save(function(err){console.log("Name saved")})
	}
	if (student.messages.length >= 2){
		respond("Sorry but Dan was feeling sleepy and didn't code any further responses. Come back again soon " + student.name + '!', response);
	}
}

function createStudent(number, response){
	Student.create({'phone_number': number}, function(err, student){
		if (err) {
			console.error(err);
		} else {
			console.log('New student added:' + student);
			respond("Hi there! I'm Chloe and I'm here to help you with your yoga. What's your name?", response);
		}
	})
}

module.exports = {
	inbox: inbox
}