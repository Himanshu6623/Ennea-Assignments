import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LockOutlined, NumberOutlined } from "@ant-design/icons";
import axios from "axios";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e0eafc, #cfdef3); 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
  padding: 20px;
  border-radius: 12px;
  animation: fadeIn 1.5s ease-in-out;

  @media (max-width: 768px) {
    padding: 10px;
    min-height: auto;
    flex-direction: column;
  }


  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [shouldFetch, setShouldFetch]=useState(false)
  const Theme = JSON.parse(localStorage.getItem("Theme"))|| {
    mode:"light",
    style:{
        color:'black'
      },
    btntxt:"Dark",
}

  const adminLogin = async () => {
    const response = await fetch("http://localhost:8080/Admin/login", {
      method: "POST",
      headers: { 
        "Content-type": "application/json" 
      },
      body: JSON.stringify({
        id: id,
        password: password
       }),
    });
    const result = await response.text();
    localStorage.setItem("jwtToken", result);
    return response.status;
  };

  const { mutate } = useMutation(adminLogin, {
    onSuccess: (data) => {
      if(data!==404)
      {
        notification.success({
          message: "Admin Login Successfully!",
          description: `Admin ID: ${id}`,
          placement: "topRight",
          duration: 3,
        });
        localStorage.setItem("Admin", 1);
        setShouldFetch(true)
      }
      else
      {
        notification.error({
          message: "Login Failed",
          description: "Incorrect Admin ID or Password",
          placement: "topRight",
          duration: 3,
        });
      }
    },
    onError: () => {
      notification.error({
        message: "Login Failed",
        description: "Incorrect Admin ID or Password",
        placement: "topRight",
        duration: 3,
      });
    },
  });

  

  const { isLoading } = useQuery("fetchAdminDetails", 
    ()=>axios.get(`http://localhost:8080/Admin/AdminId/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  }).then(res=>res.data),
  {
    enabled: shouldFetch,
    onSuccess: (detail) => {
      if(detail)
      {
        localStorage.setItem("userDetails", JSON.stringify(detail));
        console.log(localStorage.getItem("jwtToken"))
        navigate("/courseslogged");
      }
    },
  });


  const handleSubmit = () => {
    mutate();
  };

  return (
    <Div style={Theme.mode==='light'?
      {background: "linear-gradient(135deg, #e0eafc, #cfdef3)"}:
      {background: "#042743"} }>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={(errorInfo) => {
          notification.error({
            message: "Validation Failed",
            description: "Please fill in all fields.",
            placement: "topRight",
          });
        }}
        autoComplete="on"
      >
        <Form.Item
          label={<span style={Theme.style}>Admin ID</span>}
          name="adminID"
          rules={[{ required: true, message: "Please enter your Admin ID!" }]}
        >
          <Input prefix={<NumberOutlined />} onChange={(e) => setId(e.target.value)} placeholder="Enter Admin ID"/>
        </Form.Item>
        <Form.Item
          label={<span style={Theme.style}>Password</span>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} onChange={(e) => setPassword(e.target.value)} placeholder="Enter the password" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            {isLoading? "Submitting...": "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </Div>
  );
}

