"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import md5 from 'md5';

export default function SignIn() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      doSignIn();  // ✅ เรียก doSignIn
    }

    setValidated(true);
  };

  const doSignIn = async () => {
    const token = await getAuthenToken();  // ✅ เรียก getAuthenToken
    
    if (token) {
      const accessData = await getAccessToken(token);
      console.log(accessData);

      if (accessData.result) {
        localStorage.setItem("token", accessData.data.access_token);
        alert("เข้าสู้ระบบสำเร็จ");
      } else {
        alert("ไม่พบผู้ใช้ระบบ");
      }
    } else {
      alert("ไม่พบผู้ใช้ระบบ")
    }
  };

  const getAuthenToken = async () => {
    const response = await fetch(
      "http://localhost:3000/api/authen_request",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          authen_request: (username)
        })
      }
    );

    const res = await response.json();
    console.log(res);
    return res.data;
  };

  //เพิ่ม
  const getAccessToken = async (authenToken) => {
    var baseString = username + "&" + md5(password);
    var authenSignature = md5(baseString);

    const response = await fetch(
        "http://localhost:3000/api/access_request",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                authen_signature: authenSignature,
                authen_token: authenToken
            })
        }
    );

    const d = await response.json();
    return d;
};

  return (
    <div className='container m-auto'>
      <Form noValidate validated={validated} onSubmit={onSignIn}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId='validatedUsername'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)} />
            <Form.Control.Feedback type='invalid'>กรุณากรอก Username</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='validatedPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)} />
            <Form.Control.Feedback type='invalid'>กรุณากรอก Password</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Col md={3}>
            <Button type='submit'>Sign-In</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}