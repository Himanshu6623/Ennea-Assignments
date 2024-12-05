import React, { useState, useEffect ,useMemo} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { Avatar, Card, Carousel, Modal,notification, Popover } from "antd";
import { CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';


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

const StyledCard = styled(Card)`
  width: 285px;
  height: 450px;
  margin: 15px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }`;
 const Div=styled.div({
    width:"200px",
    height:"200px"
  })
  
const DIV2=styled.div({
  position: "relative",
  marginTop: "20px"
})
const FORM1=styled.form({
  position: "absolute",
  right: "0",
  top: "100%"
})

const contentStyle = {
  height: '400px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Button = styled.button({
    padding: "10px 20px",
    border: "none",
    backgroundColor: "red",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#0056b3",
    },
  });

const Input = styled.input({
  width: "100%",
  padding: "10px",
  marginBottom: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "16px",
});

export default function CoursesLogged() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [courses,setCourses]=useState("")
    const [search,setSearch]=useState("")
    const navigate=useNavigate()

    const [coursesList,setCoursesList]=useState([])
    const token=localStorage.getItem("jwtToken");

    const [courseId,setCourseId]=useState()

    const [editId, setEditId] = useState({});
    const [title, setTitle] = useState("");
    const [category,setCategory]=useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const Theme=JSON.parse(localStorage.getItem("Theme"))
    useEffect(() => {
      if (token==="") {
          navigate('/courses'); 
      }
    }, [token, navigate]);

    const openEditModal = (course) => {
        setEditId(course.courseId);
        setTitle(course.title);
        setCategory(course.category);
        setDescription(course.description);
        setImageUrl(course.imageUrl);
        setIsModalVisible(true);
    };

    const openDeleteModal = (event,Id) => {
      event.preventDefault()
      setCourseId(Id)
      setIsDeleteModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsDeleteModalVisible(false)
    };

    const Find_item=(event)=>{
        setCourses(event.target.value)
    }
    const handleSearch = (event) => {
      event.preventDefault(); 
      setSearch(courses)
    };

    const {error, isLoading, refetch} = useQuery('fetchData', () =>
        axios.get('http://localhost:8080/Courses',{
            headers: {
             Authorization: `Bearer ${token}`,
           }
        }).then(res => res.data),{onSuccess:(data)=>{
          if (data) {
            setCoursesList(data)
          }
        }}
      );

    const RemoveCourse = async () => {
       try {
         const response = await fetch(`http://localhost:8080/Courses/removeCourse/${courseId}`, {
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
     const { mutate: mutateRemove} = useMutation(RemoveCourse, {
       onSuccess: (data) => {
         notification.success({
           message: 'Deleted Successfully!',
           description: `The Course ID is ${courseId}".`,
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

    const deleteCourse=(event)=>{
        event.preventDefault();
        mutateRemove();
        setIsDeleteModalVisible(false)
    }

    const EditCourseData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/Courses/UpdateCourse`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
             "courseId": editId,
             "title": title,
             "category":category,
             "description": description,
             "imageUrl": imageUrl
            }),
          });
          const result = await response.text();
          return result;
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      };
      const { mutate: mutateEdit, isEditLoading } = useMutation(EditCourseData, {
        onSuccess: (data) => {
          notification.success({
            message: 'Edited Successfully!',
            description: `The Course ID is ${editId}".`,
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

    const handleSave = () => {
      setIsModalVisible(false);
      mutateEdit()
    };

    const filteredProducts = useMemo(() => {
      if (coursesList.length === 0) {
          return [];
      }
  
      const lowerCaseSearch = search.toLowerCase();
  
      return coursesList.filter((prod) => {
          const courseIdMatch = prod.courseId.toString().includes(search);
          const titleMatch =prod.title.toLowerCase().includes(lowerCaseSearch);
          return courseIdMatch || titleMatch;
      });
    }, [coursesList, search]);
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSearch(courses);
        }, 300);
  
        return () => clearTimeout(timeoutId);
      }, [courses]);
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>An error occurred</p>;


    const { Meta } = Card;

  const convertToBASE64=(e)=>{
    var reader=new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=()=>{
        setImageUrl(reader.result)
    };
    reader.onerror=error=>{
        console.log("Error: ",error);
    };
      
  }

    const card = filteredProducts.map((product) => (
        <>
            <Popover
                overlayInnerStyle={
                  Theme.mode === 'light'
                    ? { backgroundColor: 'white' }
                    : { backgroundColor: 'black' }
                }
                content={
                  <Div>
                    <p style={Theme.style}>{product.description}</p>
                    <p style={Theme.style}>Category: {product.category}</p>
                    <p style={Theme.style}>Total Subscription: {product.subscribed}</p>
                  </Div>
                }
                title={<p style={Theme.style}>Description</p>}
                trigger="hover"
                key={product.courseId}
                placement="right"
              >
                <StyledCard style={Theme.mode==='light'?
                    {background: "white"}:
                    {background: "black"} }
                  cover={<img alt="example" src={product.imageUrl} style={{height:"300px"}}/>}
                  actions={[
                    <DeleteOutlined key="delete" onClick={(e)=>openDeleteModal(e,product.courseId)} />,
                    <EditOutlined key="edit" onClick={() => openEditModal(product)} />,
                  ]}
                  key={product.courseId}
                >
                  <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title={<p style={Theme.style}>{product.title}</p>}
                  />
                </StyledCard>
            </Popover>
            <Modal
                title={"Delete"}
                open={isDeleteModalVisible}
                onCancel={handleCancel}
                footer
            >
                <p>Are you sure to <i><b>Delete</b></i> this Course?</p>
                <ButtonContainer >      
                    <StyledButton style={{backgroundColor:"red"}} onClick={handleCancel}>
                            <CloseOutlined/>
                    </StyledButton>
                </ButtonContainer>
                <StyledButton style={{backgroundColor:"green"}} onClick={deleteCourse}>Confirm</StyledButton>
                
            </Modal>
            <Modal
                title={`Edit Course: ${title}`}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <div style={{ display: "flex"}}>
                        <Button key="cancel" onClick={handleCancel}>
                        Cancel
                        </Button>,
                        <Button key="save" type="primary" onClick={handleSave}>
                            {isEditLoading ? "Upadating...":"Upadte"}
                        </Button>
                    </div>
                ]}
            >
                <div>
                    <label>Title:</label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Category:</label>
                    <Input value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Image Upload:</label>
                    <input accept="image/*" type='file' onChange={convertToBASE64}/>
                    {imageUrl===""||imageUrl===null?
                      <img src={product.imageUrl} style={{height:"100px", width:"100px"}} alt=''/>:
                    <img src={imageUrl} style={{height:"100px", width:"100px"}} alt=''/>
                }
                </div>
            </Modal>
        </>
    ));

    return (
        <div style={{paddingTop:"60px"}}>
          <Carousel autoplay arrows dotPosition="down"  infinite>
          <div>
            <h3 style={contentStyle}>
                <img src={'https://20fathoms.org/wp-content/uploads/2024/04/Cisco-Academy-20Fathoms-500-x-500-px.jpg'} alt='PersonalLogo' style={{width:"100%",height:"100%"}}/>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
                <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThvaWAWKLCg6SP25RaK4yGXQ0smnfGXCaJgQ&s'} alt='' style={{width:"100%",height:"100%"}}/>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
                <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSPgnhocmgS81kQCGqthAdaGpF5Z4Uy7L8IQ&s'} alt='' style={{width:"100%",height:"100%"}}/>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
                <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcWFQLxaXghD7vkeGMfpy7y_Dicr46RrM01Q&s'} alt='' style={{width:"100%",height:"100%"}}/>
            </h3>
          </div>
        </Carousel>
            <DIV2 className="container text-center" >
                <h1 style={Theme.style}>COURSES</h1>
                <FORM1  className="d-flex" role="search" onSubmit={handleSearch} >
                  <input className="form-control me-2" type="search" value={courses} onChange={Find_item} placeholder="Search" aria-label="Search" />
                </FORM1> 
            </DIV2>
            <div className="container mt-5">
                <div className="row">
                    {card.length > 0 ? card : <p className="text-center">No Courses found.</p>}
                </div>
            </div>
        </div>
    );
}