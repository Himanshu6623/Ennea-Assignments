import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Modal, notification, Splitter } from 'antd';
import styled from 'styled-components';
import { CloseOutlined, DeleteOutlined, EditOutlined, ReadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

const Image = styled.img`
  height: 120px;
  width: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

const SplitterStyle=styled(Splitter)`
    height: 150px;
    margin: 20px 0;
    boxShadow: 0 0 10px rgba(0, 0, 0, 0.1);
    borderRadius: 8px;
    overflow: hidden;
`;

const DIV2=styled.div({
    position: "relative",
    marginTop: "20px"
  })
  const FORM1=styled.form({
    position: "absolute",
    right: "0",
    top: "100%"
  })

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding: 10px;
  position: relative;
`;

const NameText = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const RollNoText = styled.p`
  font-size: 14px;
  margin: 0;
  color: #555;
`;

const EmailText = styled.p`
  font-size: 14px;
  margin: 0;
  color: #555;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px; 
  display: flex;
  gap: 10px;
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  &:active {
    background-color: #004085;
  }
`;

export default function UserDetails() {
  const [studentList, setStudentList] = useState([]);
  const [search, setSearch] = useState('');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [rollNo,setRollNo]=useState("")
  const [password,setPassword]=useState("")
  const Theme=JSON.parse(localStorage.getItem("Theme"))
  const token = localStorage.getItem("jwtToken");
  const navigate=useNavigate();
  
  const openEditModal = (student) => {
    setRollNo(student.rollno)
    setIsEditModalVisible(true);
  };

  const openDeleteModal = (student) => {
    setRollNo(student.rollno)
    setIsDeleteModalVisible(true);
  };
  
  const handleCancel = () => {
      setIsEditModalVisible(false);
      setIsDeleteModalVisible(false);
  };

  const HandlePasswordChange=(e)=>{
    setPassword(e.target.value)
  }

  const Find_item=(event)=>{
    setSearchInput(event.target.value)
    }

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(searchInput);
  };

  const details = (event, student) => {
    event.preventDefault();
    const { creationDate, ...studentData } = student;
    localStorage.setItem("studentDetails",JSON.stringify(studentData))
    navigate('/CoursesEnrolled');
  };
  
  const { isError, isLoading, refetch } = useQuery(
    'fetchdata',
    () =>
      axios
        .get('http://localhost:8080/Student', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        if (data) {
          setStudentList(data);
        }
      },
    }
  );

  const DeleteStudentAccount = async () => {
    try {
      const response = await fetch(`http://localhost:8080/Student/RemoveStudent/${rollNo}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      const result = await response.text();
      return result;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  const { mutate} = useMutation(DeleteStudentAccount, {
    onSuccess: (data) => {
      notification.success({
        message: 'Deleted Successfully!',
        description: `The Student Roll No is ${rollNo}".`,
        placement: 'topRight',
        duration: 3,
      });
      refetch();
    },
    onError: (error) => {
      notification.error({
        message: 'Authentication Failure',
        description:error.message,
        placement: 'topRight',
        duration: 3,
      });
    },
  });

  const handleDelete=()=>{
    setIsDeleteModalVisible(false);
    mutate();
  }

  const changeStudentPassword = async () => {
    try {
      const response = await fetch(`http://localhost:8080/Admin/StudentPasswordChange`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rollno: rollNo,
          password: password,
        })
      });
      const result = await response.text();
      return result;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  const { mutate: changePassword} = useMutation(changeStudentPassword, {
    onSuccess: (data) => {
      setIsEditModalVisible(false);
      notification.success({
        message: 'Password Changed Successfully!',
        description: `The Student Roll No is ${rollNo}".`,
        placement: 'topRight',
        duration: 3,
      });
    },
    onError: (error) => {
      notification.error({
        message: 'Authentication Failure',
        description:error.message,
        placement: 'topRight',
        duration: 3,
      });
    },
  });


  const ChangePassword=(event)=>{
    event.preventDefault();
    if(!password.trim())
    {
        notification.error({
            message: "Validation Error",
            description: "Please fill out all required fields correctly.",
            placement: "topRight",
            duration: 3,
          });
          return;
    }
    changePassword()
  }

  const filteredProducts = useMemo(() => {
    if (studentList.length === 0) {
      return [];
    }

    const lowerCaseSearch = search.toLowerCase();

    return studentList.filter((std) => {
      const studentRollMatch = std.rollno.toLowerCase().includes(lowerCaseSearch);
      const studentName = std.name.toLowerCase().includes(lowerCaseSearch);
      return studentRollMatch || studentName;
    });
  }, [studentList, search]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearch(searchInput);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>An error occurred</p>;

  const Details = filteredProducts.map((student) => (
    <>
        <SplitterStyle
          key={student.rollno}
          style={Theme.mode==='light'?
            {background: "white"}:
            {background: "black"} }
        >
          <Splitter.Panel
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flex: '0 0 200px',
              background: '#f0f0f0',
              padding: "5px",
            }}
          >
            <Image
              src={student.imageUrl || 'https://via.placeholder.com/120'}
              alt={student.name}
            />
          </Splitter.Panel>
          <Splitter.Panel
            style={{
              flex: '1',
              padding: '10px',
            }}
          >
            <TextContainer>
              <div>
                <NameText style={Theme.style}>{student.name}</NameText>
                <EmailText style={Theme.style}>
                Created On:{' '}
                {student.creationDate
                  ? format(new Date(student.creationDate), 'yyyy-MM-dd HH:mm:ss')
                  : 'N/A'}
                </EmailText>
              </div>
              <RollNoText style={Theme.style}>{student.rollno}</RollNoText>
              <EmailText style={Theme.style}>{student.email}</EmailText>
              <ButtonContainer>
              <StyledButton style={{backgroundColor:"blue"}} onClick={()=>openEditModal(student)}>
                <EditOutlined/>
              </StyledButton>
              <StyledButton onClick={(event) => details(event, student)}>
                <ReadOutlined />
              </StyledButton>
              <StyledButton style={{backgroundColor:"red"}} onClick={()=>openDeleteModal(student)}>
                <DeleteOutlined/>
              </StyledButton>
              </ButtonContainer>
            </TextContainer>
          </Splitter.Panel>
        </SplitterStyle>
        <Modal
                title={"Delete"}
                open={isDeleteModalVisible}
                onCancel={handleCancel}
                footer
            >
                <p>Are you sure to <i><b>Delete</b></i> this acccout?</p>
                <ButtonContainer >      
                    <StyledButton style={{backgroundColor:"red"}} onClick={handleCancel}>
                            <CloseOutlined/>
                    </StyledButton>
                </ButtonContainer>
                <StyledButton style={{backgroundColor:"green"}} onClick={handleDelete}>Confirm</StyledButton>
                
        </Modal>
        <Modal
            title={"Change Password"}
            open={isEditModalVisible}
            onCancel={handleCancel}
            footer={
                <StyledButton style={{backgroundColor:"green"}} onClick={ChangePassword}>Confirm</StyledButton>
            }
        >
            <input className="form-control me-2" onChange={HandlePasswordChange}></input>
            <ButtonContainer >      
                <StyledButton style={{backgroundColor:"red"}} onClick={handleCancel}>
                        <CloseOutlined/>
                </StyledButton>
            </ButtonContainer>
              
        </Modal>
    </>
  ));

  return (
    < div style={{paddingTop:"60px"}}>
        <DIV2 className="container text-center" >
            <FORM1  className="d-flex" role="search" onSubmit={handleSearch} >
              <input className="form-control me-2" type="search" value={searchInput} onChange={Find_item} placeholder="Search" aria-label="Search" />
            </FORM1> 
        </DIV2>
        <div
          style={{
            padding: '40px',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {Details.length > 0 ? Details : <p>No students found.</p>}
        </div>
    </div>
  );
}
