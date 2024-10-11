import './App.css';
import Navbar from './Components/Navbar';
import LiveWeather from './Components/LiveWeather';
import JokeGenerator from './Components/JokeGenerator'
import Alert from './Components/Web_Alert'
import {useState} from 'react'
import Form from './Components/Form';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Aboutprojects from './Components/Aboutprojects';

function App()
{
  const[mode,setMode]=useState('light')
  const[btntxt,setbtntxt]=useState('dark mode')
  const[style,setStyle]=useState({
    color:'black',
  })
  const[alert,setAlert]=useState(null)
  const showAlert=(message,type)=>
    {
        setAlert({
          msg:message,
          type:type
        })
        setTimeout(()=>{
          setAlert(null)
        },3000)
    }
    const changemode=()=>
    {
      if(mode==='light')
      {
        setbtntxt('light mode')
        setMode('dark')
        document.body.style.backgroundColor='#042743'
        setStyle({
          color:'white',
        })
      }
      else
      {
        setbtntxt('dark mode')
        setMode('light')
        document.body.style.backgroundColor='white'
        setStyle({
          color:'black'
        })
      }
    }
    return(
      <>
        <Router>
          <Navbar style={style} btntxt={btntxt} mode={mode} changemode={changemode}/>
          <Alert alert={alert} />
          <Routes>
            <Route exact path='/' element={
              <Aboutprojects mode={mode}/>
            }/>
            <Route exact path='/LiveWeather' element={
              <LiveWeather showAlert={showAlert} mode={mode} />
            } />
            <Route exact path='/JokeGenerator' element={
              <JokeGenerator mode={mode} showAlert={showAlert}/>
            } />
            <Route exact path="/Textutils" element={
            <Form heading="Text Analyzer" mode={mode} style={style} showAlert={showAlert}/>
            } />
          </Routes>
        </Router>
      </>
    );
}

export default App;

