import { Drawer, Modal, notification } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../CSS/Drawer.css';
import { ProfileTwoTone } from '@ant-design/icons';

const NAV = styled.nav`
  width: 100%;
  position: fixed;
  z-index: 1000; 
`;

const Button = styled.button`
  padding: 5px 20px;
  border: none;
  width: 90px;
  background-color: red;
  color: #fff;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  margin: 10px;
  :hover {
    background-color: #0056b3;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
`;

const H = styled.h1`
  font-size: 32px;
  margin: 0;
  font-family: 'Arial', sans-serif;
  background: linear-gradient(to right, #ff7f50, #6a5acd, #20b2aa);
  -webkit-background-clip: text;
  color: transparent;
  transition: all 0.3s ease;
`;

export default function Navbar() {
  const token=localStorage.getItem("jwtToken")
  const admin=localStorage.getItem("Admin")
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"))
  const Theme=JSON.parse(localStorage.getItem("Theme")) || {
    mode:"light",
    style:{
        color:'black'
      },
    btntxt:"Dark",
}
  if(Theme.mode==='light')
  {
    document.body.style.backgroundColor='white'
  }
  else
  {
    document.body.style.backgroundColor='#042743'
  }
  const [isVisible, setIsVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const openDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const openModel = (event) => {
    event.preventDefault();
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const StudentLogin = (event) => {
    event.preventDefault();
    navigate('/studentlogin');
    setIsVisible(false);
  };

  const AdminLogin = (event) => {
    event.preventDefault();
    navigate('/adminlogin');
    setIsVisible(false);
  };

  const SignOut = () => {
    localStorage.removeItem("Admin")
    localStorage.removeItem("jwtToken")
    closeDrawer();
    notification.success({
      message: 'Logout Successfully!',
      placement: 'topRight',
      duration: 3,
    });
  };

  const Register = (event) => {
    event.preventDefault();
    navigate('/Registeration');
  };

  const HandelTheme=(event)=>{
    if(Theme.mode==='light')
      {
        localStorage.setItem("Theme",JSON.stringify({
          mode:"dark",
          style:{
              color:'white'
            },
          btntxt:"Light",
        }))
      }
      else
      {
        localStorage.setItem("Theme",JSON.stringify({
          mode:"light",
          style:{
              color:'black'
            },
          btntxt:"Dark",
        }))
      }
      window.location.reload();
  }

  return (
    <>
      <NAV className={`navbar navbar-expand-lg navbar-${Theme.mode} bg-${Theme.mode}`}>
        <div
          className="container-fluid"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Link
            className="nav-link active"
            aria-current="page"
            to={admin === "1" ? '/courseslogged' : '/'}
          >
            <H>CourseHub</H>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {admin === "1"? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" style={Theme.style} aria-current="page" to="/AddCourse">
                      Add Courses
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" style={Theme.style} aria-current="page" to="/Registeration">
                      Add Student
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" style={Theme.style} aria-current="page" to="/UserDetails">
                      Student Details
                    </Link>
                  </li>
                  
                </>
              ):console.log()}
            </ul>
            <form className="d-flex" role="search">
              {token ? (
                <Link className="nav-link active"  aria-current="page" onClick={openDrawer}>
                 <ProfileTwoTone style={{ fontSize: '28px' }}/>
                </Link>
              ) : (
                <>
                  <div className="form-check form-switch">
                    <input className="form-check-input"  onChange={HandelTheme} type="checkbox"  role="switch" id="flexSwitchCheckChecked" />
                    <label className="form-check-label" style={Theme.style} htmlFor="flexSwitchCheckChecked">{Theme.btntxt}</label>
                  </div>
                  <Button className="nav-link active" aria-current="page" onClick={openModel}>
                    Sign In
                  </Button>
                  <Button className="nav-link active" aria-current="page" onClick={Register}>
                    Sign Up
                  </Button>
                </>
              )}
            </form>
          </div>
          <Modal open={isVisible} onCancel={handleCancel} 
              style={{paddingLeft: '40px', paddingTop: '60px'}}
             footer={null}>
            <ButtonContainer>
              <Button onClick={StudentLogin} style={{ width: '100%' }}>
                Student
              </Button>
              <Button onClick={AdminLogin} style={{ width: '100%' }}>
                Admin
              </Button>
            </ButtonContainer>
          </Modal>
          <Drawer
            title="Profile"
            placement="right"
            onClose={closeDrawer}
            open={isDrawerVisible}
            width="25%"
            className="custom-drawer"
            style={Theme.mode==='light'?{backgroundColor:'white',color:'black'}:
              {backgroundColor:'#042743',color:'white'}}
          >
            <div className="profile-container">
              {admin === "1" ? (
                <img
                  src={userDetails?.imageUrl || ".../image.png"}
                  alt=""
                  className="profile-image"
                />
              ) : (
                <img
                  src={userDetails?.imageUrl || ".../image.png"}
                  alt=""
                  className="profile-image"
                />
              )}
              <div className="profile-details">
                {admin === "1" ? (
                  <>
                    <p className="profile-name" style={Theme.style} >{userDetails?.name}</p>
                    <p className="profile-info" style={Theme.style} >{userDetails?.email}</p>
                    <p className="profile-info" style={Theme.style} ><b><i>ID:</i></b> {userDetails?.id}</p>
                  </>
                ) : (
                  <>
                    <p className="profile-name" style={Theme.style} >{userDetails?.name}</p>
                    <p className="profile-info" style={Theme.style} >{userDetails?.rollno}</p>
                    <p className="profile-info" style={Theme.style} >{userDetails?.email}</p>
                  </>
                )}
              </div>
            </div>
            <ul className="drawer-links">
              <li>
                {admin === "1" ? (
                  <Link to="/UpdateAdminProfile" style={Theme.style}  onClick={closeDrawer} className="profile-link">
                    Update Profile
                  </Link>
                ) : (
                  <Link to="/UpdateStudentProfile" style={Theme.style}  onClick={closeDrawer} className="profile-link">
                    Update Profile
                  </Link>
                )}
              </li>
              <li>
                {admin === "1" ? (
                  <Link to="/UpdateAdminPassword" style={Theme.style}  onClick={closeDrawer} className="profile-link">
                    Change Password
                  </Link>
                ) : (
                  <Link to="/UpdateStudentPassword" style={Theme.style}  onClick={closeDrawer} className="profile-link">
                    Change Password
                  </Link>
                )}
              </li>
              {admin !== "1"?
                <li>
                  <Link to="/SubscribedCourses" style={Theme.style}  onClick={closeDrawer} className="profile-link">
                    Courses
                  </Link>
                </li>:
                <li className="nav-item">
                  <Link className="nav-link active" style={Theme.style} aria-current="page" to="/AdminRegisteration">
                    Register Admin
                  </Link>
                </li>
              }
              <li>
              <div className="form-check form-switch">
                <input className="form-check-input"  onChange={HandelTheme} type="checkbox"  role="switch" id="flexSwitchCheckChecked" />
                <label className="form-check-label" style={Theme.style} htmlFor="flexSwitchCheckChecked">{Theme.btntxt}</label>
              </div>
              </li>
              <li>
                <a 
                  className="signout-link"
                  href="/"
                  onClick={() => {
                    SignOut();
                  }}
                >
                  Sign Out
                </a>
              </li>
            </ul>
          </Drawer>
        </div>
      </NAV>
    </>
  );
}
