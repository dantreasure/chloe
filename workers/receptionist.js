var respond = require('../utils/respond');

exports.webhook = function(request, response){
	var phoneNumber = request.body.From;
	var msg = request.body.Body;

	console.log(phoneNumber);

	respond("HErrrro to you too.", response);
}