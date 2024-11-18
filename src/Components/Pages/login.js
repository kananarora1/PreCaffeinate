import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../Calls/user';
import { UserContext } from '../context/usercontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
          const userResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users/currentUser`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = await userResponse.json();
          if (userData.role === 'admin') {
            navigate('/admin', { replace: true });
          } else if (userData.role === 'partner') {
            navigate('/partner', { replace: true });
          } else {
            navigate('/', { replace: true });
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
        toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });
        localStorage.setItem('token', response.token);
        const userResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/users/currentUser`, {
          headers: {
            Authorization: `Bearer ${response.token}`,
          },
        });
        const userData = await userResponse.json();
        setUser(userData);

        if (userData.role === 'admin') {
          navigate('/admin', { replace: true });
        } else if (userData.role === 'partner') {
          navigate('/partner', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } else {
        toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      toast.error('Login failed. Please try again.', { position: toast.POSITION.TOP_RIGHT });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='form-container'>
      <ToastContainer />
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
                    backgroundColor: '#49180c',
                    borderColor: '#49180c',
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
