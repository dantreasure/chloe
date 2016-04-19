function advanceConversation(student, state){
	student.convoState = state;
	student.save(function(err){
		if(err){
			console.log("There was an error updating the student " + student.name + "'s state:\n");
			console.log(err);
		}
	});		
}

module.exports = advanceConversation;