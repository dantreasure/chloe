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
			console.log('Incoming intro1');
			var reply = '';
			student.name =message;
			student.save(function(err){
				console.log('student.save finished')
				if (err){
					respond("Sorry could you send that one more time?", response)
				} else {
					respond("Nice to meet you " + student.name + "!\nWhat days do you normally practice?", response);
					advanceConversation(student, 'intro2');		
				}
			});
			break;
		case 'intro2':
			console.log('Incoming intro2');
			respond("Great, and when would you like me to ask how your practice went?" , response);
			advanceConversation(student, 'intro3');
			break;
		case 'intro3':
			respond("Awesome! I'll check in with you then. You can always tell me you'd like to log* whenever you'd like", response)
			advanceConversation(student, 'regular1');
			break;
		case 'regular1':
			if(message.indexOf('log') !== -1){
				respond("Booyah-kasha! How'd your practice go?", response);
			} else {
				respond("How can I help you?", response);
			}
	}
}