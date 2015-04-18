var db = require('../db');




module.exports = {
  messages: {
    get: function (response) {
      db.retrieve('messages', function(result){
        response.send(result);
      });


    }, // a function which produces all the messages
    post: function (params) {
      var queryStr = "insert into messages(text, userid, roomname) \
                           value (?, (select id from users where username = ? limit 1), ?)";
      db.insert(queryStr, params);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (response) {
      db.retrieve('users', function(result){
        response.send(result);
      });
    },
    post: function (params) {
      var queryStr = "insert into users(username) value (?)";
      db.insert(queryStr, params);
    }
  }

  // user: {
  //   get: function () {
  //     db.retrieveUser()
  //   }
  // }
};

