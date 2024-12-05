import { Button, Checkbox, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { LockOutlined, NumberOutlined } from "@ant-design/icons";

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


export default function StudentLogin() {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [token,setToken]=useState("")
  const Theme=JSON.parse(localStorage.getItem("Theme"))

  const handleRollNoChange = (event) => {
    setRollNo(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  const StudentLogin = async () => {
    
      const response = await fetch('http://localhost:8080/Student/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          rollno: rollNo,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Roll No or Password is Incorrect");
      }
  
      const result = await response.text();
      localStorage.setItem("jwtToken",result)
      setToken(result)
      return result;
    
  };
  
  const { mutate } = useMutation(StudentLogin, {
    onSuccess: (data) => {
      notification.success({
        message: 'Student Login Successfully!',
        description: `The Student Roll No is "${rollNo}".`,
        placement: 'topRight',
        duration: 3,
      });
      setShouldFetch(true);
       
    },
    onError: (error) => {
      notification.error({
        message: 'Login Failed',
        description: "Incorrect Roll No or Password",
        placement: 'topRight',
        duration: 3,
      });
    },
  });

    useQuery(["fetchData", rollNo], () =>
    axios.get(`http://localhost:8080/Student/RollNo/${rollNo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    ).then(res=>res.data),{
        enabled: shouldFetch,
        onSuccess:(detail)=>{
          if (detail) {
            localStorage.setItem("userDetails",JSON.stringify(detail))
            navigate('/courses');
      }
    }})  
  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!rollNo || !password) {
      notification.warning({
        message: "Validation Error",
        description: "Please fill in both Roll No and Password.",
        placement: "topRight",
        duration: 3,
      });
      return;
    }
    mutate();
  };

  return (
    <>
      <Div style={Theme.mode==='light'?
      {background: "linear-gradient(135deg, #e0eafc, #cfdef3)"}:
      {background: "#042743"} }>
      <Form
        name="basic"
        initialValues={{
        remember: true,
        }}
        style={{
          maxWidth: 360,
        }}
        autoComplete="off"
     >
        <Form.Item
          label={
            <span style={Theme.style}>Roll No</span>
          }
          name="Roll No"
          style={Theme.style}
          onChange={handleRollNoChange}
          rules={[
            {
              required: true,
              message: 'Please input your Roll No!',
            },
          ]}
        >
          <Input prefix={<NumberOutlined/>} type="text" placeholder="Roll No"/>
        </Form.Item>

        <Form.Item
          label={
            <span style={Theme.style}>Password</span>
          }
          name="password"
          onChange={handlePasswordChange}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password  prefix={<LockOutlined/>} placeholder="Password"/>
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox style={Theme.style}>Remember me</Checkbox>
        </Form.Item>

        <Form.Item >
          <Button block type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <p style={Theme.style}>or Create a Account <Link to="/Registeration">Register Now!</Link></p>
        </Form.Item>
      </Form>
    </Div>
    </>
      );
}
