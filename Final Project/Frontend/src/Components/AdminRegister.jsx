import { LockOutlined, MailOutlined, NumberOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { useMutation } from "react-query";
import {  useNavigate } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
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

export default function AdminRegister() {
  const [adminId, setAdminId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailId,setEmailId]=useState("");
  const [image,setImage]=useState()
  const token=localStorage.getItem("jwtToken")
  const Theme=JSON.parse(localStorage.getItem("Theme"))|| {
    mode:"light",
    style:{
        color:'black'
      },
    btntxt:"Dark",
}

  const admin=localStorage.getItem("Admin")

  const navigate = useNavigate();
  const convertToBASE64=(e)=>{
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=()=>{
          setImage(reader.result)
      };
      reader.onerror=error=>{
          console.log("Error: ",error);
      };
      
  }

  const Name = (event) => {
    setName(event.target.value);
  };
  const Admin_Id = (event) => {
    setAdminId(event.target.value);
  };
  const email_Id = (event) => {
    setEmailId(event.target.value);
  };
  const Password = (event) => {
    setPassword(event.target.value);
  };

  const registerStudent = async (Student) => {
    const response = await fetch(`http://localhost:8080/Admin/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization:`Bearer ${token}`
      },
      body: JSON.stringify(Student),
    }); 
    return response.status;
  };

  const { mutate,loading} = useMutation(registerStudent, {
    onSuccess: (data) => {
      if(data!==302)
      {
        notification.success({
          message: "Admin registered Successfully!",
          description: `The Admin ID is "${adminId}".`,
          placement: "topRight",
          duration: 3,
        });
        navigate("/courseslogged")
      }
      else
      {
        notification.error({
          message: "Admin is Already Registered",
          placement: "topRight",
          duration: 3,
        }); 
      }
    },
    onError: (error) => {
      notification.error({
        message: "Error Registering Admin",
        description: error.message || "Something went wrong!",
        placement: "topRight",
        duration: 3,
      });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !adminId.trim() || !emailId.trim() || !password.trim() || !image) {
      notification.error({
        message: "Validation Error",
        description: "Please fill out all required fields correctly.",
        placement: "topRight",
        duration: 3,
      });
      return;
    }
    const Admin = {
      "name":name,
      "id": adminId,
      "email":emailId,
      "password":password,
      "imageUrl":image
    };
    mutate(Admin);
  };

  return (
    <Div style={Theme.mode==='light'?
      {background: "linear-gradient(135deg, #e0eafc, #cfdef3)",paddingTop:"80px"}:
      {background: "#042743",paddingTop:"80px"} }>
      <Form
      onSubmitCapture={handleSubmit}
      name="Register"
      style={{
        maxWidth: 360,
      }}
    >
      <Form.Item
        name="Username"
        onChange={Name}
        rules={[
          {
            required: true,
            message: 'Please enter your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="rollno"
        onChange={Admin_Id}
        rules={[
          {
            required: true,
            message: 'Please enter your Rollno!',
          },
        ]}
      >
        <Input prefix={<NumberOutlined />} type="text" placeholder="AdminId" />
      </Form.Item>
      <Form.Item
        name="Email ID"
        onChange={email_Id}
        rules={[
          {
            required: true,
            message: 'Please enter your emailId!',
          },
        ]}
      >
        <Input prefix={<MailOutlined/>} type="text" placeholder="Email ID" />
      </Form.Item>
      <Form.Item
        name="password"
        onChange={Password}
        rules={[
          {
            required: true,
            message: 'Please enter your Password!',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="Image Upload"
        rules={[
          {
            required: true,
            message: 'Upload Image!',
          },
        ]}
      >
        <>
          <Input accept="image/*" type='file' onChange={convertToBASE64}/>
          {image===""||image===null?
              console.log("error"):
              <img src={image} style={{height:"100px", width:"100px"}} alt=''/>
          }
        </>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" >
          {loading?"Registering...":"Register"}
        </Button>
      </Form.Item>
    </Form>
    </Div>
  );
}
