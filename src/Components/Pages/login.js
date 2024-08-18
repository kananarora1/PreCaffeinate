import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../Calls/user';
import { UserContext } from '../context/usercontext';
import './Register.css';

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userResponse = await fetch('http://localhost:8080/api/users/currentUser', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = await userResponse.json();
          if (userData.role === 'admin') {
            navigate('/admin', { replace: true }); // Replace history entry
          } else if (userData.role === 'partner') {
            navigate('/partner', { replace: true }); // Replace history entry
          } else {
            navigate('/app', { replace: true }); // Replace history entry
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false);
    };

    checkToken();
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('token', response.token);
        const userResponse = await fetch('http://localhost:8080/api/users/currentUser', {
          headers: {
            Authorization: `Bearer ${response.token}`,
          },
        });
        const userData = await userResponse.json();
        setUser(userData);
        console.log('Fetched user data:', userData);

        console.log('User role:', userData.role);
        if (userData.role === 'admin') {
          navigate('/admin', { replace: true });
        } else if (userData.role === 'partner') {
          navigate('/partner', { replace: true });
        } else {
          navigate('/app', { replace: true });
        }
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  if (loading) return <div>Loading...</div>; // or any loading indicator

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
