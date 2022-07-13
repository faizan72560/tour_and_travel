import React,{useEffect} from 'react'
import { useState } from 'react'
import NoteContext from '../context/context'
import { useContext } from 'react'
import axios from 'axios'
import { getplaces } from '../action/useraction'
import { useDispatch } from 'react-redux'

const Updateplace = () => {
  const dispatch=useDispatch()

   const auth = useContext(NoteContext)
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [adress, setadress] = useState('')
    const [location, setlocation] = useState('')
    const [isvalid, setisvalid] = useState(false)
    const [alert, setalert] = useState(false)
    
    const updateplacehandler= async  (e)=>{ 
        e.preventDefault()
        console.log('hello')
        
        const _id=localStorage.getItem("placeid")
        const res= await axios.put(`http://localhost:4000/api/updatepost/${_id}`,{title,description,adress,location})
        setalert(true)
        dispatch(getplaces())
        
        
    
      

    }

    
    

   



  return (
    <div>
         <div className='container'>
         {alert&&<div class="alert alert-success" role="alert">
  success! Places updated successfully..
</div>}

          <div className='center'>
         <h1><span class="badge badge-secondary">Update Place</span></h1>

          </div>
        <div class="mb-3">
  <input type="text" class="form-control" value={title} onChange={(e)=>{settitle(e.target.value)
     setisvalid(true)} } placeholder="Title"/>
</div>
<div class="mb-3">
<input type="text" class="form-control"   onChange={(e)=>{setdescription(e.target.value) 
   setisvalid(true)}} placeholder="Description"/>
</div>
 <div class="mb-3">
  <input type="text" class="form-control"  value={adress}  onChange={(e)=>{setadress(e.target.value)
    setisvalid(true)}} placeholder="Adress"/>
</div>
<div class="mb-3">
  <input type="text" class="form-control"  value={location}  onChange={(e)=>{setlocation(e.target.value)
    setisvalid(true)}} placeholder="Location"/>
</div>
<div className='center'>
<button onClick={updateplacehandler} className={!isvalid ?  "btn btn-primary disabled" : "btn btn-primary enabled" }   aria-disabled="false"> Update</button>
</div>
    </div>
    </div>
  )
}

export default Updateplace