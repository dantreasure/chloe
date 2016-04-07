var Student = require('../models/student.js');
var respond = require('../utils/respond');

function advanceConversation(student, state){
	student.convoState = state;
	student.save(function(err){
		if(err){
			console.log("There was an error updating the student " + student.name + "'s state:\n");
			console.log(err);
		}
	});		
}

module.exports = function(student, message, response){	
	switch(student.convoState){
		case 'intro1':
			student.name =message;
			student.save(function(err){
				if (err){
					respond("Sorry could you send that one more time?", response)
				} else {
					respond("Nice to meet you " + student.name + "!\nWhat days do you normally practice?", response);
					advanceConversation(student, 'intro2');		
				}
			});
			break;
		case 'intro2':
			respond("Great, and when would you like me to ask how your practice went?" , response);
			advanceConversation(student, 'intro3');
			break;
		case 'intro3':
			respond("Awesome! I'll check in with you then. You can always tell me you'd like to log* whenever you'd like", response)
			advanceConversation(student, 'regular1');
			break;
		case 'regular1':
			if(message.indexOf('log') !== -1 || message.indexOf('Log') !== -1){
				respond("Booyah-kasha! How'd your practice go?", response);
				advanceConversation(student, 'log1')
			} else {
				respond("How can I help you?", response);
			}
			break;
		case 'log1':
			student.logs.push({_owner: student._id, synopsis: message});
			student.save(function(err){
				if(!err){
					respond("Did you have an intent?", response);
					advanceConversation(student, 'log2')
				}	
			})
			break;
		case 'log2':
			if(message === 'yes' || message === 'Yes' || message === 'ja'){
				respond("What was it?", response);
				advanceConversation(student, 'log3');
			} else {
				respond("Did you notice any improvements?", response);
				advanceConversation(student, 'log4');
			}
			break;
		case 'log3':
			student.logs[0].intent = message;
			student.save(function(err){
				if(!err){
					respond("Solid. Did you notice any improvements?", response);
					advanceConversation(student, 'log4');		
				}
			})
			break;
		case 'log4':
			if(message === 'yes' || message === 'Yes' || message === 'ja'){
				respond("What was it?", response);
				advanceConversation(student, 'log5');
			} else {
				respond("Any goals for the future?", response);
				advanceConversation(student, 'log6');
			}
			break;
		case 'log5':
			student.logs[0].improvements = message;
			student.save(function(err){
				if(!err){
					respond("Any goals for the future?", response);
					advanceConversation(student, 'log6');		
				}
			})
			break;
	}
}