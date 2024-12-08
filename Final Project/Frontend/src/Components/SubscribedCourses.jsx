import React, { useState, useEffect ,useMemo} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { notification, Popover } from "antd";
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

export default function SubscibedCourses() {
    const [courses,setCourses]=useState("")
    const [search,setSearch]=useState("")
    const token=localStorage.getItem("jwtToken")
    const rollNo=JSON.parse(localStorage.getItem("userDetails")).rollno
    const [courseId,setCourseId]=useState("")
    const navigate=useNavigate()
    const Theme=JSON.parse(localStorage.getItem("Theme"))|| {
      mode:"light",
      style:{
          color:'black'
        },
      btntxt:"Dark",
  }
    useEffect(() => {
      if ( !token) {
          navigate('/'); 
      }
    }, [token, navigate]);

    const Find_item=(event)=>{
        setCourses(event.target.value)
    }
    
    const handleSearch = (event) => {
      event.preventDefault(); 
      setSearch(courses)
    };

    

    const { data : coursesList, error, isLoading,refetch } = useQuery('fetchData', () =>
        axios.get(`http://localhost:8080/Student/SubscribedCourses/${rollNo}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(res => res.data)
      );

      const Unsubscribe = async () => {
       try {
         const response = await fetch('http://localhost:8080/CourseStatus/unsubscribe', {
           method: 'PUT',
           headers: {
             'Content-type': 'application/json',
             Authorization: `Bearer ${token}`,
           },
           body: JSON.stringify({
             "student":{
               "rollno": rollNo
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
     const { mutate, loading } = useMutation(Unsubscribe, {
       onSuccess: (data) => {
         notification.success({
           message: 'Subscribed Successfully!',
           description: `The Course ID is ${courseId}".`,
           placement: 'topRight',
           duration: 3,
         });
         refetch()
       },
       onError: (error) => {
         notification.error({
           message: 'Authentication Failure',
           description:token,
           placement: 'topRight',
           duration: 3,
         });
       },
     });

    const changePage=(event,Id)=>{
        event.preventDefault();
        setCourseId(Id)
    }

    useEffect(() => {
        if (courseId!=="") {
          mutate();
        }
      }, [courseId,mutate]);

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

    
    const card = filteredProducts.map((product) => (
      <Popover  key={product.courseId} placement="right" overlayInnerStyle={
        Theme.mode === 'light'
          ? { backgroundColor: 'white' }
          : { backgroundColor: 'black' }
      } 
      content={(<Div>
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
              {loading?"Unsubscribing...":"Unsubscribe"}
            </button>
          </div>
        </div>
      </Popover>
    ));

    return (
        <div style={{paddingTop:"60px"}}>
            <DIV2 className="container text-center" >
                <h1 style={Theme.style}>SUBSCRIBED COURSES</h1>
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