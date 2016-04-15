var Student = require('../models/student.js');
var convoTree = require('../utils/convoTree.js');
var respond = require('../utils/respond');

function inbox(number, message, response){
	Student.findOne({'phone_number': number}, 'name phone_number messages convoState logs schedule', function(err, student){
		if (err){
			console.error(err)
		} else {
			if(student !== null){
				student.messages.push(message)
				student.save(function(err){
					reply(student, response, message);
				});
				
			} else {
				console.log("We couldn't find an account for " + number);
				createStudent(number, response)
			}
		}
	});
}

function reply(student, response, message){
	if(message === '/reset'){
		Student.remove({_id: student['_id']}, function(err){
			if(!err){
				respond("You have been reset.", response);
			}
		})
	} else {
		convoTree(student, message, response);
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