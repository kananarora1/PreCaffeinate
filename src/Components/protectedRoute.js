import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "./Calls/user";
import { useNavigate } from "react-router-dom";
import { message, Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
// import { HomeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getValidUser = async () => {
    try {
      const response = await GetCurrentUser();
      setUser(response.data);
      // Hide Loader
    } catch (error) {
      setUser(null);
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

navigate()
}

export default ProtectedRoute;