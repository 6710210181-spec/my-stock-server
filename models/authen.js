/*const pool = require('../db_pool');

module.exports = {
    checkUsername: async (authRequest) => {
        const query = "SELECT * FROM users WHERE username = ?";

        try {
            const [results, fields] = await pool.query(query, [authRequest]);

            var result = true;

            if (results.length == 1) {
                result = true;
            } else {
                result = false;
            }

            return {
                isError: false,
                result: result,
                data: results
            };
        } catch(err) {
            return {
                isError: true,
                errorMessage: err.message
            }
        }
    }
},

//เพิ่ม
accessRequest; async (authenSignature) => {
    const query = "SELECT * FROM users WHERE MD5(CONCAT(username, '&', password)) = ?";

    try {
        const [results, fields] = await pool.query(query, [authenSignature]);

        let result = true;

        if (results.length == 1) {
            result = true;
        } else {
            result = false;
        }

        return {
            isError: false,
            result: result,
            data: results
        };
    } catch (err) {
        return {
            isError: true,
            errorMessage: err.message
        }
    }
}*/


const pool = require('../db_pool');

module.exports = {
    checkUsername: async (authRequest) => {
        const query = "SELECT * FROM users WHERE username = ?";

        try {
            const [results, fields] = await pool.query(query, [authRequest]);

            let result = true;

            if (results.length == 1) {
                result = true;
            } else {
                result = false;
            }

            return {
                isError: false,
                result: result,
                data: results
            };
        } catch(err) {
            return {
                isError: true,
                errorMessage: err.message
            };
        }
    },  // ← ต้องมี comma ตรงนี้

    accessRequest: async (authenSignature) => {
        const query = "SELECT * FROM users WHERE MD5(CONCAT(username, '&', password)) = ?";

        try {
            const [results, fields] = await pool.query(query, [authenSignature]);

            let result = true;

            if (results.length == 1) {
                result = true;
            } else {
                result = false;
            }

            return {
                isError: false,
                result: result,
                data: results
            };
        } catch (err) {
            return {
                isError: true,
                errorMessage: err.message
            };
        }
    }
};  // ← ปิด module.exports ตรงนี้