var respond = function (message, response) {
  response.type('text/xml');
  response.render('twiml', {
      message: message
  });
}

module.exports = respond;
