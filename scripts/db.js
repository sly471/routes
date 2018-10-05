var mysql = require('mysql'); 

var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "JoelCabrera07!"
});

// https://www.w3schools.com/nodejs/nodejs_mysql.asp
// Using this to learn and implement the connection.
module.export = {
    Works: function() {
        return "It works";
    },
    RequestQuery: sql => {
        con.connect(function(err){
          if (err) throw err;
          console.log("Connected!");
          //var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
          con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            return result;
          });
        }); 
    }
}
