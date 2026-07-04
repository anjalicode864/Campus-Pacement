const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "AYUSH@123",
    database: "placement_db"
});

connection.connect((err) => {

    if (err) {
        console.log("Database Connection Failed"); 
    } else {
        console.log("Database Connected Successfully");
    }

});

module.exports = connection;