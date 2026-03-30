const pool = require('../db_pool');

module.exports = {
    getAllProduct: async () => {
        var query = "SELECT * FROM products";
        try {
            const [results, fields] = await pool.query(query);
            return results;
        } catch (err) {
            console.log(err);
        }
    },
    getProductByTypeId: async (product_type_id) => {
        var query = "SELECT * FROM products WHERE product_type_id = ?";
        try {
            const [results, fields] = await pool.execute(query, [product_type_id]);
            return results;
        } catch (err) {
            console.log(err);
        }
    }
};