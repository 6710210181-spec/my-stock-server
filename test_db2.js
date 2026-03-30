const mysql = require('mysql2/promise');

async function getData() {

    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'rose_db'
    });

    try {
        var myQuery = "SELECT * FROM products";

        const [results, fields] = await conn.query(
            myQuery
        );

        console.log(results);
        
        return results;
    }  catch (err) {
        console.log(err);
    }
}

function doQuery() {
    var data = getData();

}

doQuery();