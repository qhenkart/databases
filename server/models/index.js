var db = require('../db');




module.exports = {
  messages: {
    get: function () {
      console.log("IN maessage GET")

    }, // a function which produces all the messages
    post: function (body) {
      console.log("IN maessage post")
      db('messages', body);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      console.log("IN get post");

    },
    post: function (body) {
      console.log(body)
      // db.connect();
      // db.query("truncate " + 'messages', done);
      db('users', body);

      console.log("IN user post");
    }
  }
};

