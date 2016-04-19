// Your accountSid and authToken from twilio.com/user/account
var accountSid = 'ACcce8c7b0952284dc9aea2047940c12fa';
var authToken = "1955934f68bb985d0bc9fe89a90b6319";
var client = require('twilio')(accountSid, authToken);
 


var message = function (message, number) {
	client.messages.create({
	    body: message,
	    to: number,
	    from: "+18013315862"
	}, function(error, message) {
	    if (error) {
	        console.log(error.message);
	    }
});
}

module.exports = message;