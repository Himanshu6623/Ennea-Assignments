import { notification } from "antd";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DIV = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "140vh",
  margin: 0,
  padding: 0,
});

const FormContainer = styled.div({
  border: "2px solid #ddd",
  borderRadius: "15px",
  padding: "30px",
  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
  width: "450px",
  display: "flex",
  paddingTop:"60px",
  flexDirection: "column",
  alignItems: "center",
  transform: "translateY(-10%)",
  transition: "transform 0.2s ease-in-out",
  ":hover": {
    transform: "translateY(0%) scale(1.03)", 
  },
});


const StyledForm = styled.form({
  width: "100%",
});

const Label = styled.label({
  marginBottom: "10px",
  fontWeight: "bold",
  color: "#333",
  display: "block",
});

const Input = styled.input({
  width: "100%",
  padding: "12px",
  marginBottom: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "16px",
  transition: "border 0.2s",
  ":focus": {
    border: "1px solid #007bff",
    outline: "none",
  },
});

const TextArea = styled.textarea({
  width: "100%",
  padding: "12px",
  marginBottom: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "16px",
  transition: "border 0.2s",
  resize: "none",
  ":focus": {
    border: "1px solid #007bff",
    outline: "none",
  },
});

const Button = styled.button({
  padding: "12px 25px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
  transition: "background-color 0.2s",
  ":hover": {
    backgroundColor: "#0056b3",
  },
});

const ImagePreview = styled.img({
  height: "100px",
  width: "100px",
  borderRadius: "10px",
  marginTop: "10px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
});

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const Theme=JSON.parse(localStorage.getItem("Theme"))|| {
    mode:"light",
    style:{
        color:'black'
      },
    btntxt:"Dark",
}
  const token = localStorage.getItem("jwtToken")
  const navigate = useNavigate();

  const convertToBASE64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error converting image:", error);
    };
  };

  const AddNewCourse = async () => {
    try {
      const response = await fetch("http://localhost:8080/Courses/Add", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          category,
          description,
          imageUrl,
        }),
      });

      const result = await response.text();
      return result;
    } catch (error) {
      console.error("Failed to add course:", error);
      throw error;
    }
  };

  const { mutate, isLoading } = useMutation(AddNewCourse, {
    onSuccess: () => {
      notification.success({
        message: "Course Added Successfully!",
        description: `The course titled "${title}" has been added.`,
        placement: "topRight",
        duration: 3,
      });
      navigate("/courseslogged");
    },
    onError: (error) => {
      notification.error({
        message: "Failed to Add Course",
        description: error.message || "Something went wrong. Please try again.",
        placement: "topRight",
        duration: 3,
      });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !category.trim() || !description.trim() || !imageUrl) {
      notification.error({
        message: "Validation Error",
        description: "Please fill out all required fields correctly.",
        placement: "topRight",
        duration: 3,
      });
      return;
    }
    mutate();
  };

  return (
    <DIV
    style={Theme.mode==='light'?
      {background:"linear-gradient(135deg, #e0eafc, #cfdef3)",paddingTop:"120px"}:
      {background: "#042743",paddingTop:"120px"} }
      >
      <FormContainer style={Theme.mode==='light'?
      {background:"rgba(255, 255, 255, 0.9)"}:
      {background: "black"} }>
        <h1 style={Theme.style}>Add Course</h1>
        <StyledForm onSubmit={handleSubmit}>
          <div>
            <Label style={Theme.style}>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label style={Theme.style}>Category</Label>
            <Input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <Label style={Theme.style}>Description</Label>
            <TextArea
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label style={Theme.style}>Upload Image</Label>
            <Input type="file" accept="image/*" style={Theme.style} onChange={convertToBASE64} />
            {imageUrl && <ImagePreview src={imageUrl} alt="Preview" />}
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </StyledForm>
      </FormContainer>
    </DIV>
  );
}
