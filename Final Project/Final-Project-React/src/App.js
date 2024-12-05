import './App.css';
import CoursesLogged from './Components/CoursesLogged';
import StudentLogin from './Components/StudentLogin';
import StudentRegisteration from './Components/StudentRegisteration';
import Courses from './Components/Courses';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import AdminLogin from './Components/AdminLogin';
import AddCourse from './Components/AddCourse';
import Navbar from './Components/Navbar';
import SubscibedCourses from './Components/SubscribedCourses';
import ImageUpload from './Components/ImageUpload';
import StudentProfileUpdate from './Components/StudentProfileUpdate';
import UpdateAdminPassword from './Components/UpdateAdminPassword';
import UpdateStudentPassword from './Components/UpdateStudentPassword';
import AdminProfileUpdate from './Components/AdminProfileUpdate';
import UserDetails from './Components/UserDetails';
import CoursesEnrolled from './Components/CoursesEnrolled';
function App()
{
    return(
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={
              <Courses/>
            }/>
            <Route exact path='/courses' element={
              <Courses/>
            }/>
            <Route exact path='/coursesLogin' element={
              <CoursesLogged />
            } />
            <Route exact path='/Registeration' element={
              <StudentRegisteration />
            }/>
            <Route exact path='/studentlogin' element={
              <StudentLogin />
            }/>
            <Route exact path='/adminlogin' element={
              <AdminLogin />
            }/>
            <Route exact path='/courseslogged' element={
              <CoursesLogged />
            }/>
            <Route exact path='/AddCourse' element={
              <AddCourse />
            }/>
            <Route exact path="/SubscribedCourses" element={
              <SubscibedCourses />
            }/>
            <Route exact path="/UpdateStudentProfile" element={
              <StudentProfileUpdate/>
            }/>
            <Route exact path="/UpdateAdminProfile" element={
              <AdminProfileUpdate/>
            }/>
            <Route exact path='/UpdateAdminPassword' element={
              <UpdateAdminPassword/>
            }/>
            <Route exact path='/Upload' element={
              <ImageUpload/>
            }/>
            <Route exact path='/UpdateStudentPassword' element={
              <UpdateStudentPassword/>
            }/>
            <Route exact path='/CoursesEnrolled' element={
                <CoursesEnrolled/>
            }/>
            <Route exact path='/UserDetails' element={
                <UserDetails/>
            }/>
          </Routes>
        </Router>
      </>
    );
}

export default App;

