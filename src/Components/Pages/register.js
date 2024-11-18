import React, { useEffect } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../Calls/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      console.log(response);
      console.log(response.userId);

      if (response.success) {
        toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });

        if (values.role === 'partner') {
          const partnerResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users/partner-requests/${response.userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ userId: response.userId }),
          });
          const partnerData = await partnerResponse.json();

          if (partnerResponse.ok) {
            toast.success(partnerData.message, { position: toast.POSITION.TOP_RIGHT });
          } else {
            toast.error(partnerData.message, { position: toast.POSITION.TOP_RIGHT });
          }
        }
        navigate('/login');
      } else {
        toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.', { position: toast.POSITION.TOP_RIGHT });
    }
  };

  return (
    <div className="form-container">
      <ToastContainer /> {/* Add this for rendering the toast notifications */}
      <header className="App-header">
        <main className="main-area">
          <section className="left-section">
            <h1 className="heading">Register to PreCaffeinate</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Name"
                name="name"
                className="d-block"
                rules={[{ required: true, message: 'Name is required!' }]}
              >
                <Input type="text" placeholder="Enter your name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: 'Email is required!' }]}
              >
                <Input type="email" placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: 'Password is required!' }]}
              >
                <Input type="password" placeholder="Enter the password" />
              </Form.Item>
              <Form.Item
                label="Register as a Partner"
                name="role"
                className="d-block text-center"
                initialValue="user"
                rules={[{ required: true, message: 'Please select an option!' }]}
              >
                <Radio.Group>
                  <Radio value="partner">Yes</Radio>
                  <Radio value="user">No</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Button
                  className="submit-btn"
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: '#49180c',
                    borderColor: '#49180c',
                  }}
                >
                  Sign Up
                </Button>
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
