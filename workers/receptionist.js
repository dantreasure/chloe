var brain = require('./brain');

exports.webhook = function(request, response){
	var phoneNumber = request.body.From;
	var msg = request.body.Body;

	brain.inbox(phoneNumber, msg, response);
}