/*const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'rose_db'
});

var myQuery = "SELECT * FROM products";

conn.query(myQuery, function(err, results, fields) {
    console.log(results);
});*/

const pool = require('./db_pool');

async function getData() {
    var query ="SELECT * FROM products";
    try {
        const [results, fields] = await pool.query(query);
        return results;
    } catch (err) {
        console.log(err);
    }
}

async function doQuery() {
    var data = await getData();
    console.log("ROWS: " + data.length);
    console.log(data);
}

doQuery();