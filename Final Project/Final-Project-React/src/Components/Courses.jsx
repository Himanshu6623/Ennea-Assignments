import React, { useState, useEffect ,useMemo} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { Carousel, notification, Popover } from "antd";
import '../CSS/Card.css'

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

export default function Courses() {
    const [courses,setCourses]=useState("")
    const [search,setSearch]=useState("")
    const [coursesList,setCoursesList]=useState([])
    const token=localStorage.getItem("jwtToken") || ""
    const userDetails=JSON.parse(localStorage.getItem("userDetails")) || {rollno:""}
    const [courseId,setCourseId]=useState("")
    const [subscribedList, setSubscribedList] = useState([]);
    const [shouldFetch,setShouldFetch]=useState(false)
    const Theme=JSON.parse(localStorage.getItem("Theme"))

    const Find_item=(event)=>{
        setCourses(event.target.value)
    }
    const navigate=useNavigate()
    const handleSearch = (event) => {
      event.preventDefault(); 
      setSearch(courses)
    };
    

    const { refetch: refetchSubscribedCourse } = useQuery('fetchSubscribedData', () =>
      axios.get(`http://localhost:8080/Student/SubscribedCourses/${userDetails.rollno}`,{
          headers:{
              Authorization:`Bearer ${token}`
          }
      }).then(res => res.data),{
        enabled:shouldFetch
        ,onSuccess:(data)=>{
        if (data) {
          setSubscribedList(data)
        }
      }}
    );

    const { error, isLoading, refetch: refetchCourse} = useQuery('fetchData', () =>
        axios.get('http://localhost:8080/Courses/DTO').then(res => res.data),{onSuccess:(data)=>{
          if (data) {
            setCoursesList(data)
          }
        }}
      );

      const Subscribe = async () => {
       try {
         const response = await fetch('http://localhost:8080/CourseStatus/subscribe', {
           method: 'PUT',
           headers: {
             'Content-type': 'application/json',
             Authorization: `Bearer ${token}`,
           },
           body: JSON.stringify({
             "student":{
               "rollno": userDetails.rollno
             },
             "course":{
               "courseId": courseId
             }
           }),
         });
         
         const result = await response.text();
         return result;
       } catch (error) {
         console.error("Login failed:", error);
         throw error;
       }
     };
     const { mutate } = useMutation(Subscribe, {
       onSuccess: (data) => {
         notification.success({
           message: 'Subscribed Successfully!',
           description: `The Course ID is ${courseId}".`,
           placement: 'topRight',
           duration: 3,
         });
         refetchCourse();
         refetchSubscribedCourse();
       },
       onError: (error) => {
         notification.error({
           message: 'Authentication Failure',
           description:"Error",
           placement: 'topRight',
           duration: 3,
         });
       },
     });

    const changePage=(event,Id)=>{
        event.preventDefault();
        if(token==="")
        {
            navigate("/studentlogin")
            setShouldFetch(false)
            setSubscribedList([])
        }
        else
        {
            setCourseId(Id)
            setShouldFetch(true)
        }
    }

    useEffect(() => {
        if (courseId!=="") {
          mutate();
          
        }
      }, [courseId, mutate]);

      const filteredProducts = useMemo(() => {
        if (coursesList.length === 0) {
            return [];
        }
    
        const lowerCaseSearch = search.toLowerCase();
        
        
          if(token!=="")
          {
            refetchSubscribedCourse()
            return coursesList
              .filter((prod) => {
                  const courseIdMatch = prod.courseId.toString().includes(search);
                  const titleMatch = prod.title.toLowerCase().includes(lowerCaseSearch);
                  return courseIdMatch || titleMatch;
              })
              .filter((prod) => !subscribedList.some(sub => sub.courseId === prod.courseId));
          }
        return coursesList
            .filter((prod) => {
                const courseIdMatch = prod.courseId.toString().includes(search);
                const titleMatch = prod.title.toLowerCase().includes(lowerCaseSearch);
                return courseIdMatch || titleMatch;
            })
    }, [coursesList, search, subscribedList, token, refetchSubscribedCourse]);
    
    

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSearch(courses);
        }, 300);
  
        return () => clearTimeout(timeoutId);
      }, [courses]);
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>An error occurred</p>;

    
    const card = filteredProducts.map((product) => (
      <Popover  key={product.courseId}  placement="right" overlayInnerStyle={
        Theme.mode === 'light'
          ? { backgroundColor: 'white' }
          : { backgroundColor: 'black' }
      } content={(<Div>
        <p style={Theme.style}>{product.description}</p>
        <p style={Theme.style}>Category: {product.category}</p>
      </Div>)} title={<p style={Theme.style}>Description</p>}>
        <div className="custom-card-container" >
          <div className="custom-card">
            <div className="custom-card-image">
              <img src={product.imageUrl} alt={product.title} />
            </div>
            <div className="custom-card-body" style={Theme.mode==='light'?{backgroundColor:'white'}:
              {backgroundColor:'black'}}>
              <h5 className="custom-card-title" style={Theme.style}>{product.title}</h5>
            </div>
          </div>
          <div className="custom-card-action">
            <button
              className="custom-card-subscribe"
              onClick={(e) => changePage(e, product.courseId)}
            >
              Subscribe
            </button>
          </div>
        </div>
      </Popover>
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
                <FORM1  className="d-flex" role="search" onSubmit={handleSearch} >
                  <input className="form-control me-2" type="search" value={courses} onChange={Find_item} placeholder="Search" aria-label="Search" />
                </FORM1> 
            </DIV2>
            <div className="container mt-5">
                <div className="row">
                  {card.length > 0 ? card : <p className="text-center" style={Theme.style}>No Courses found.</p>}
                </div>
            </div>
        </div>
    );
}