import React, { useState, useEffect ,useMemo} from "react";
import axios from "axios";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Popover } from "antd";
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


export default function CoursesEnrolled() {
    const [courses,setCourses]=useState("")
    const [search,setSearch]=useState("")
    const token=localStorage.getItem("jwtToken")
    const studentDetails=JSON.parse(localStorage.getItem("studentDetails"))
    const [subscribedList,setSubscribedList]=useState([])
    const Theme=JSON.parse(localStorage.getItem("Theme"))|| {
      mode:"light",
      style:{
          color:'black'
        },
      btntxt:"Dark",
  }

    const Find_item=(event)=>{
        setCourses(event.target.value)
    }
    const handleSearch = (event) => {
      event.preventDefault(); 
      setSearch(courses)
    };
    

    const { iserror, Loading } = useQuery('fetchSubscribedData', () =>
      axios.get(`http://localhost:8080/Student/SubscribedCourses/${studentDetails.rollno}`,{
          headers:{
              Authorization:`Bearer ${token}`
          }
      }).then(res => res.data),{
        onSuccess:(data)=>{
            if(data){
                setSubscribedList(data)
            }
        }
      }
    );
      const filteredProducts = useMemo(() => {
        if (subscribedList.length === 0) {
            return [];
        }
    
        const lowerCaseSearch = search.toLowerCase();
        return subscribedList
            .filter((prod) => {
                const courseIdMatch = prod.courseId.toString().includes(search);
                const titleMatch = prod.title.toLowerCase().includes(lowerCaseSearch);
                return courseIdMatch || titleMatch;
            })
    }, [subscribedList, search]);
    
    

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSearch(courses);
        }, 300);
  
        return () => clearTimeout(timeoutId);
      }, [courses]);
    
    if (Loading) return <p>Loading...</p>;
    if (iserror) return <p>An error occurred</p>;

    
    const card = filteredProducts.map((product) => (
      <Popover  key={product.courseId} placement="right" overlayInnerStyle={
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
        </div>
      </Popover>
    ));
    

    return (
        <div style={{paddingTop:"60px"}}>
            <DIV2 className="container text-center" >
                <FORM1  className="d-flex" role="search" onSubmit={handleSearch} >
                  <input className="form-control me-2" type="search" value={courses} onChange={Find_item} placeholder="Search" aria-label="Search" />
                </FORM1> 
            </DIV2>
            <div className="container mt-5">
                <div className="row">
                {Loading?"Loading Courses":
                  card.length > 0 ? card : <p className="text-center" style={Theme.style}>No Courses Enrolled.</p>}
                </div>
            </div>
        </div>
    );
}