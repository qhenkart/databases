var models = require('../models');
var bluebird = require('bluebird');
var utils = require('../helpers/utils');



module.exports = {
  messages: {
    get: function (request, response) {
      models.messages.get(response);
    }, // a function which handles a get request for all messages
    post: function (request, response) {
      models.messages.post(request.body)
      response.send(request.body);
    } // a function which handles posting a message to the database
  },

  users: {
    get: function (request, response) {
      models.messages.get(request);
    },
    post: function (request, response) {
      models.users.post(request.body)
      response.send(request.body);
    }
  }
};

