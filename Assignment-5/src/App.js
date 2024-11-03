import './App.css';
import Addproduct from './Components/Addproduct';
import Navbar from './Components/Navbar';
import Postproduct from './Components/Postproduct';
import Productreview from './Components/Productreview';
import Products from './Components/Products';
import Testing from './Components/Producttable';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
function App()
{
    return(
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={
              <Testing />
            }/>
            <Route exact path='/productCard' element={
              <Products />
            } />
            <Route exact path='/addproduct' element={
              <Addproduct />
            }/>
            <Route exact path='/Reviews' element={
              <Productreview />
            }/>
            <Route exact path='/post' element={
              <Postproduct />
            }/>
          </Routes>
        </Router>
      </>
    );
}

export default App;

