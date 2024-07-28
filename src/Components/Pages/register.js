import React, { useEffect } from "react";
import { Form, Input, Button, Radio, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../Calls/user";
import './Register.css';

function Register() {
  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="form-container">
      <header className="App-header">
        <main className="main-area">
          <section className="left-section">
            <h1 className="heading">Register to  PreCaffeinate</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Name"
                htmlFor="name"
                name="name"
                className="d-block"
                rules={[{ required: true, message: "Name is required!" }]}
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                />
              </Form.Item>
              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required!" }]}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter the password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  className="submit-btn"
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: '#49180c', /* Base color */
                    borderColor: '#49180c', /* Base border color */
                  }}
                >
                  Sign Up
                </Button>
              </Form.Item>
              <Form.Item
                label="Register as a Partner"
                htmlFor="role"
                name="role"
                className="d-block text-center"
                initialValue={false}
                rules={[{ required: true, message: "Please select an option!" }]}
              >
                <div className="radio-group">
                  <Radio.Group name="radiogroup">
                    <Radio value={'partner'}>Yes</Radio>
                    <Radio value={'user'}>No</Radio>
                  </Radio.Group>
                </div>
              </Form.Item>
            </Form>
            <div>
              <p>
                Already a user? <Link to="/login">Login now</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </div>
  );

}

export default Register;