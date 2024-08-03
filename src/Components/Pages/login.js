import React, { useContext, useEffect } from 'react'
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from '../Calls/user';
import { UserContext } from '../context/usercontext';
import './Register.css';

function Login() {
  const navigate = useNavigate();
  const setUser = useContext(UserContext);

  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate("/");
    }
  }, []); 

  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('token', response.token, { expiresIn: '7d' }); // Store the token in local storage
        const userResponse = await fetch('http://localhost:8080/api/users/currentUser', {
          headers: {
            Authorization: `Bearer ${response.token}`,
          },
        });
        const userData = await userResponse.json();
        setUser.setUser(userData);
        console.log('Fetched user data:', userData);
        navigate('/');
  }} catch (error) {
      message.error(error.message);
    }
  }

  return (
    <div className='form-container'>
      <header className="App-header">
        <main className="main-area">
          <section className="left-section">
            <h1 className='heading'>Login to PreCaffeinate</h1>
          </section>

          <section className="right-section">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input id="email" type="text" placeholder="Enter your Email" />
              </Form.Item>

              <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input id="password" type="password" placeholder="Enter your Password" />
              </Form.Item>

              <Form.Item className="d-block">
                <Button type="primary" htmlType="submit" className='submit-btn'
                  style={{
                    backgroundColor: '#49180c', /* Base color */
                    borderColor: '#49180c', /* Base border color */
                  }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                New User? <Link to="/register">Register Here</Link>
              </p>
              <p>
                Forgot Password? <Link to="/forget">Click Here</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </div>
  );
}

export default Login;