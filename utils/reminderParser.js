var reminderParser = function (student, message) {
	//determine am or pm
	if(message.indexOf('am') !== -1){
		student.reminderTime = message.slice(0, message.indexOf('am'));
	} else if (message.indexOf('pm') !== -1){
		student.reminderTime = parseInt(message.slice(0, message.indexOf('pm'))) + 12;
	}
	student.save(function(err){
		if(!err){
			console.log("\nReminder updated to " + student.reminderTime);
		}
	})
}

module.exports = reminderParser;
