import React, { useContext } from 'react'
import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../action/useraction'
import NoteContext from '../context/context'
import {  useNavigate } from 'react-router-dom'

const Login = () => {
  const Navigate=useNavigate()
  const auth=useContext(NoteContext)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [isvalid, setisvalid] = useState('')
    const [isLoading,setisLoading]=useState(false)
    const dispatch=useDispatch()

    // console.log(islogin)
    // useEffect(() => {
    //   const islogin= JSON.parse(localStorage.getItem('islogin'))


    // if(islogin){

    //   Navigate("/Users",{replace:true})
    // }

      
    
      
    // }, [])
    

    const loginhandler= async(e)=>{
        e.preventDefault()
        setisLoading(true)
        dispatch(loginUser(email,password))
        
        // try{
        //     const res=  await fetch('http://localhost:4000/api/users/login',{
        //         method:'POST',
        //         credentials:"include",
        //         headers:{
        //           'content-Type': "application/json",
        //         },
        //         body:JSON.stringify({
        //           email,password,
          
        //         })
        //       });

        //       const data= await res.json()
        //       console.log(data)
        //       // auth.userid(data.userlogin._id)
        //       // auth.isLoggedIn(true)
        //       auth.login(data.token)
        //       auth.data(data)
        //       console.log(data.userlogin)
        
        // localStorage.setItem("first name",JSON.stringify(data.userlogin))
        // localStorage.setItem("token",JSON.stringify(data.token))
        
        
        
        
        
        // }catch(err){
          //     console.log(err)
          
          // }
          
          
          // auth.data1()
          // window.location.reload()
          Navigate("/",{replace:true})

          setTimeout(()=>{
            setisLoading(false)

          },2000)
          




    }
  return (
    <div>
        <div className='center'>

        <h1> <span class="badge badge-secondary">Login</span></h1>
        </div>
        <div className='center'>

        {isLoading && <button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>}
        </div>
    <div className='container'>
        <div class="mb-3">
  
  <input type="email" class="form-control" value={email} onChange={(e)=>{setemail(e.target.value)
   
   setisvalid(true)}} id="exampleFormControlInput1" placeholder="Email"/>
</div>
<div class="mb-3">
  <input class="form-control" type="password" value={password} onChange={(e)=>{setpassword(e.target.value)

setisvalid(true)}} id="exampleFormControl" placeholder='Password'/>
</div>
    </div>
<div className='center'>
<button onClick={loginhandler} className={!isvalid ?  "btn btn-primary disabled" : "btn btn-primary enabled" }   aria-disabled="false"> submit</button>
</div>


    </div>
  )
}

export default Login