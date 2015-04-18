var db = require('../db');




module.exports = {
  messages: {
    get: function (response) {
      db.retrieve('messages', function(result){
        response.send(result);
      });


    }, // a function which produces all the messages
    post: function (body) {
      db.insert('messages', body);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      db.retrieve('users', function(result){
        response.send(result);
      });
    },
    post: function (body) {
      db.insert('users', body);

    }
  }
};

