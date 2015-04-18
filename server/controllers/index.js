var models = require('../models');
var bluebird = require('bluebird');
var utils = require('../helpers/utils');



module.exports = {
  messages: {
    get: function (request, response) {
      models.messages.get(response);
    }, // a function which handles a get request for all messages
    post: function (request, response) {
      var params = [request.body.text, request.body.username, request.body.roomname];
      models.messages.post(params)
      response.send(request.body);
    } // a function which handles posting a message to the database
  },

  users: {
    get: function (request, response) {
      models.users.get(request);
    },
    post: function (request, response) {
      var params = [request.body.username];
      models.users.post(params);
      response.send(request.body);
    }
  }

  // user: {
  //   get: function (request, response) {
  //     models.user.get(request);
  //   }
  // }
};

