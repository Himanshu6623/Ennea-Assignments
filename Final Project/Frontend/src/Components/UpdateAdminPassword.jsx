import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

export default function UpdateAdminPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");

  const token=localStorage.getItem("jwtToken")
  const details=JSON.parse(localStorage.getItem("userDetails"))
  const Theme=JSON.parse(localStorage.getItem("Theme"))|| {
    mode:"light",
    style:{
        color:'black'
      },
    btntxt:"Dark",
}
  const navigate = useNavigate();

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const updateAdminPassword = async (Admin) => {
    const response = await fetch("http://localhost:8080/Admin/UpdateAdminPassword", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(Admin),
    });
    
    return response.text();
  };

  const { mutate, loading} = useMutation(updateAdminPassword, {
    onSuccess: (data) => {
      notification.success({
        message: "Password changed Successfully!",
        placement: "topRight",
        duration: 3,
      });
      
      navigate("/courseslogged");
    },
    onError: (error) => {
      notification.error({
        message: "Error changing password",
        description: error.message || "Something went wrong!",
        placement: "topRight",
        duration: 3,
      });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if ( !newPassword.trim() || !password.trim()) {
      notification.error({
        message: "Validation Error",
        description: "Please fill out all required fields correctly.",
        placement: "topRight",
        duration: 3,
      });
      return;
    }
    const Admin = {
      "id": details.id,
      "password":password,
      "newPassword":newPassword
    };
    mutate(Admin);
  };

  return (
    <Div style={Theme.mode==='light'?
      {background: "linear-gradient(135deg, #e0eafc, #cfdef3)"}:
      {background: "#042743"} }>
      <Form
      onSubmitCapture={handleSubmit}
      name="Change Password"
      initialValues={{
        remember: true,
      }}
      style={{
        maxWidth: 360,
      }}
    >
      <Form.Item
        name="Old Password"
        onChange={handlePassword}
        rules={[
          {
            required: true,
            message: 'Please enter Old password!',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />}  placeholder="Old Password" />
      </Form.Item>
      <Form.Item
        name="New Password"
        onChange={handleNewPassword}
        rules={[
          {
            required: true,
            message: 'Please enter New Password!',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />}  placeholder="New Password" />
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" >
          {loading?"Updating...":"Update"}
        </Button>
      </Form.Item>
    </Form>
    </Div>
  );
}
