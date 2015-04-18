var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
module.exports = function(table, body){
  var db = mysql.createConnection({
    user: "root",
    password: "",
    database: "chat"
  });
  db.connect();

  db.query("INSERT INTO "+ table +" SET ?", body, function(err, result){
    if(err) console.log("error", err);
    console.log(result);
  });

}

