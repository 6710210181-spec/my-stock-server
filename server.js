const http = require('http');
const bp = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const product = require('./models/product');
const authen = require('./models/authen');
const path = require('path')

const app = express();

app.use(cors());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

const hostname = '127.0.0.1';
const port = 3000;

app.use('/product_images', express.static('upload')); //เพิ่มเรียกภาพ

app.get("/api/product/all", async (req, res) => {
    var results = await product.getAllProduct();
    var response = {
        isError: false,
        data: results
    };
    res.send(JSON.stringify(response));  // ✅ อยู่ใน callback
});

app.post("/api/authen_request", async (req, res) => {
    const authenRequest = req.body.authen_request;
    var response = { isError: false, data: null };
    const rs = await authen.checkUsername(authenRequest);
    if (rs.isError) {
        response = { isError: true, message: rs.errorMessage };
    } else {
        if (rs.result) {
            var payload = { username: authenRequest };
            var secretKey = "MySecretKey";
            const authenToken = jwt.sign(payload, secretKey);
            response = { isError: false, results: true, data: authenToken };
        } else {
            response = { isError: false, results: false, data: "ไม่พบข้อมูลผู้ใช้ในระบบ" };
        }
    }
    res.json(response);
});

app.post("/api/access_request", async (req, res) => {
    const authenSignature = req.body.authen_signature;
    const authenToken = req.body.authen_token;

    try {  // ✅ เพิ่ม try-catch
        var decoded = jwt.verify(authenToken, "MySecretKey");

        if (decoded) {
            const rs = await authen.accessRequest(authenSignature);
            if (rs.isError) {
                res.json({ isError: true, errorMessage: rs.errorMessage });
            } else {
                if (rs.result) {
                    var payload = { username: rs.data[0].username };
                    const accessToken = jwt.sign(payload, "MySecretKey");
                    res.json({
                        isError: false, result: true,
                        data: { access_token: accessToken, user_info: payload }
                    });
                } else {
                    res.json({ isError: false, result: false });
                }
            }
        } else {
            res.json({ isError: false, result: false });
        }
    } catch(err) {  // ✅ จับ error จาก jwt.verify
        res.json({ isError: true, errorMessage: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});