const mysql = require('mysql2');

async function getData2() {
    var query = "SELECT * FROM products WHERE prooduct_type_id = ? AND product_type = ?";
    try {
        const [results, fields] = await pool.execute(query, [1, 1]);
        return results;
    } catch (err) {
        console.log(err);
    }
}

async function doQuery2() {
    var data = await getData2();
    console.log("ROWS: " + data.length);
    console.log(data);    
}

doQuery2();