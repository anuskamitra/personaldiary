
//import './App.css';
import Home from  './components/Home/Home'
import Login from  './components/Login/Login'
import Signup from  './components/SignUp/SignUp'
import Welcome from './components/Welcome/Welcome'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { useState ,useEffect} from 'react';
import { auth } from './firebase';
function App() {
  const[userName,setUserName]=useState("");
useEffect(()=>{
 
  auth.onAuthStateChanged((user)=>{
    if(user){
      setUserName(user.email)
    }else{
      setUserName("");
    }
  });
},[])
  return (
    <div className="App">

      <Router>
         <Routes>
          <Route path="/"element={<Welcome/>}/> 
          <Route path="/Home"element={<Home email={userName}/>}/>
          {/* <Route path="/Home"element={<Home email="Anuska"/>}/> */}
          <Route path="/Login"element={<Login/>}/>
          <Route path="/SignUp"element={<Signup/>}/>      
         </Routes>
      </Router>  
    
    </div>
  );
}

export default App;
