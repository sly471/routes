var mysql = require('mysql'); 

var con = mysql.createConnection({
      host: "localhost",
      user: "user",
      password: "password!",
      database: "PRoduce"
});

// https://www.w3schools.com/nodejs/nodejs_mysql.asp
// Using this to learn and implement the connection
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
}); 