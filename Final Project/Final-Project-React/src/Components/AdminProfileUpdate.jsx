import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

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
  }`
export default function AdminProfileUpdate()
{
    const details=JSON.parse(localStorage.getItem("userDetails"))
    const [name,setName]=useState("")
    const [emailId,setEmailId]=useState("")
    const [image,setImage]=useState(details.imageUrl)
    const token=localStorage.getItem("jwtToken")
    const Theme=JSON.parse(localStorage.getItem("Theme"))
    const navigate = useNavigate();

    useEffect(() => {
      if (token==="") {
          navigate('/courses'); 
      }
    }, [token, navigate]);

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
    const email_Id = (event) => {
      setEmailId(event.target.value);
    };

    const registerStudent = async (Admin) => {
      const response = await fetch("http://localhost:8080/Admin/UpdateAdmin", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(Admin),
      });
      return response.text();
    };
    
      const { mutate } = useMutation(registerStudent, {
        onSuccess: (data) => {
          notification.success({
            message: "Profile Updated Successfully!",
            placement: "topRight",
            duration: 3,
          });
          const adminDetails={
            "id":details.id,
            "name":name,
            "email":emailId,
            "imageUrl":image,
          }
          localStorage.setItem("userDetails",JSON.stringify(adminDetails))
          navigate("/courseslogged");
        },
        onError: (error) => {
          notification.error({
            message: "Error Updating Profile",
            description: error.message || "Something went wrong!",
            placement: "topRight",
            duration: 3,
          });
        },
      });
    
      const handleSubmit = (event) => {
        event.preventDefault();
        if (!name.trim() || !emailId.trim() || !image) {
          notification.error({
            message: "Validation Error",
            description: "Please fill out all required fields correctly.",
            placement: "topRight",
            duration: 3,
          });
          return;
        }
        const Admin = {
          "id":details.id,
          "name":name,
          "email":emailId,
          "imageUrl":image
        };
        
        mutate(Admin);
      };

    return(
        <Div style={Theme.mode==='light'?
          {background: "linear-gradient(135deg, #e0eafc, #cfdef3)"}:
          {background: "#042743"} }>
          <Form
              name="Update Profile"
              onSubmitCapture={handleSubmit}
              initialValues={{
                remember: true,
              }}
              style={{
                maxWidth: 360,
              }}
            >
              <Form.Item
                name="username"
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
                name="Email ID"
                onChange={email_Id}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your emailId!',
                  },
                ]}
              >
                <Input prefix={<MailOutlined/>} type="email"  placeholder="Email ID" required={true}/>
              </Form.Item>
              <Form.Item
                name="Change Image"
                onChange={convertToBASE64}
              >
                <>
                    <input accept="image/*" type='file' style={Theme.style} onChange={convertToBASE64}/>
                        {image===""||image===null?
                          <img src={details.imageUrl} style={{height:"100px", width:"100px"}} alt=''/>:
                        <img src={image} style={{height:"100px", width:"100px"}} alt=''/>}
                </>
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit" >
                  Update
                </Button>
              </Form.Item>
            </Form>
        </Div>
    )
}