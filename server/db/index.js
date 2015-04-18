var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
var db;
var init = function(){
  db = mysql.createConnection({
    user: "root",
    password: "",
    database: "chat"
  });
  db.connect();
}

exports.insert = function(table, body){
  init();
  db.query("INSERT INTO "+ table +" SET ?", body, function(err, result){
    if(err) console.log("error", err);
    console.log(result);
  });
}

exports.retrieve = function(table, callback){
  init();

  db.query("SELECT * FROM messages join users on messages.userID = users.id", function(err, result){
    if (err) console.log("err", err);
    console.log(result);
    callback(result)
  });
}

  // db.query("SELECT * FROM " + table, function(err, result){



