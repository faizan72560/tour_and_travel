import React, { useContext, useEffect } from 'react'
import Addplace from './components/Addplace'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom"
import Signup from './components/Signup'
import Login from './components/Login'
import Updateplace from './components/Updateplace'
import Myplace from './components/Myplace'
import Users from './components/Users'
import NoteContext  from './context/context'
import { useDispatch,useSelector } from 'react-redux'
import { LoadUser } from './action/useraction'


const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const auth=useContext(NoteContext)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(LoadUser())
    // auth.data1()
    console.log("hello")
  //  const item= JSON.parse(localStorage.getItem('first name'))
  //  auth.data(item)

  },[dispatch])

  


  return (
    <div>
       <Navbar/>
      


      <Routes>
      {/* <Route path="/" element={ <Navbar/> } /> */}
      
      <Route path="/" element={isAuthenticated ? <Users/>:<Login/>} />
      <Route path="/Addplace" element={isAuthenticated && <Addplace/> } />
      {/* <Route path="/Updateplace" element={ <Updateplace/> } /> */}
      <Route path="/Myplace" element={  isAuthenticated ?<Myplace/>:<Login/> } />
      <Route path="/Signup" element={ <Signup/> } />
      <Route path="/login" element={ <Login/> } />
        

      </Routes>
      
  

    </div>
  )
}

export default App