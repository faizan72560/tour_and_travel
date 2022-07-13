import React from 'react'
import { useState } from 'react'

const Signup = () => {

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [isvalid, setisvalid] = useState(false)
  const [alert, setalert] = useState(false)
  const [isLoading,setisLoading]=useState(false)
  const [alertdata, setalertdata] = useState({})


  const signuphandler= async(e)=>{
    console.log('fetching')
    e.preventDefault()
    setisLoading(true)
    try{
      const res=  await fetch('http://localhost:4000/api/users/signup',{
        method:'POST',
        headers:{
          'content-Type': "application/json"
        },
        body:JSON.stringify({
          name,email,password
  
        })
        
      });
      const data= await res.json()
      console.log(data)
      if(data){
        setalert(true)
        setalertdata(data)

      }
      setisLoading(false)

    }catch(err){
      console.log(err)
    }



  }

  return (
    <div>
      <br/>
      {alert&&<div class="alert alert-success" role="alert">
  {alertdata.error}
</div>}
      <br/>

    
    <div className='container'>
        <div class="mb-3">
          <div className='center'>
          <h1> <span class="badge badge-secondary">Sign up</span></h1>
          </div>
          <div className='center'>
        {isLoading && <button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>}
          </div>
  
  <input type="text" class="form-control" value={name} onChange={(e)=>{setname(e.target.value)
  setisvalid(true)}} id="exampleFormControlInput1" placeholder="Name"/>
</div>
        <div class="mb-3">
  
  <input type="email" class="form-control" value={email} onChange={(e)=>{setemail(e.target.value)
   
   setisvalid(true)}} id="exampleFormControlInput1" placeholder="Email"/>
</div>
<div class="mb-3">
  <input class="form-control" type="password" value={password} onChange={(e)=>{setpassword(e.target.value)

setisvalid(true)}} id="exampleFormControlTextarea1" placeholder='Password'/>
</div>
<div className='center'>

<button onClick={signuphandler} className={!isvalid ?  "btn btn-primary disabled" : "btn btn-primary enabled" }   aria-disabled="false"> submit</button>
</div>



    </div>
</div>
  )
}

export default Signup