import React from 'react'
import axios from 'axios'
import NoteContext from '../context/context'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState ,useEffect} from 'react'
import Updateplace from './Updateplace'
import { getplaces } from '../action/useraction'

const Myplace = () => {
  const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [adress, setadress] = useState('')
    const [location, setlocation] = useState('')
    const [isvalid, setisvalid] = useState(false)



  

  const [place, setplace] = useState([])
  const [update, setupdate] = useState(false)
  const [alert, setalert] = useState(false)
  
  // const item= JSON.parse(localStorage.getItem('first name'))
  const auth = useContext(NoteContext)
  const dispatch=useDispatch()
  const {places}=useSelector((state)=>state.myPlaces)


  useEffect(() => {

//     const fetchuserdata=async()=>{
//     // const item=JSON.parse(localStorage.getItem("user"))

      
//     const config = {
//       withCredentials:true
//     }

//       const res=await axios.get(`http://localhost:4000/api/getplacebyuserid`,config)
//       console.log(res.data)
//       setplace(res.data)

//     }
    

    
// fetchuserdata()


dispatch(getplaces())
// setplace(places)

  
  }, [dispatch])
  

  

  


  // const fetchuserdata= async (e)=>{
  //   e.preventDefault()
  //   const item=JSON.parse(localStorage.getItem("user"))
    
    
  //   const config = {
     
  //     withCredentials:true
  //   }

  //   console.log(item.userId)




  //   const res= await axios.get(`http://localhost:4000/api/getplacebyuserid/${item.userId}`,config)

  //   setplace(res.data)
  //   console.log(place)
    
    

  // }

  const deleteplacehandler= async (id)=>{
    setalert(true)
    

    const res=await axios.delete(`/api/deletepost/${id}`)
    dispatch(getplaces())
    

    
    console.log('deleted')

  }

  const updatehandler=(id)=>{
    console.log('updated')
    setupdate(true)
    localStorage.setItem("placeid",JSON.stringify(id))
    // console.log(id)
    
    // const res= axios.post(`/api/updatepost/${id}` ,{
    //   title,description,adress,location
    // })
    // alert("updated successfully")

  }


  return (
    <div>
      {update&& <Updateplace/>}
{/* 
       {update&& ( <div className='container'>
          <h1 className='center'>Updateplace</h1>
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

<button onClick={updatehandler} className={!isvalid ?  "btn btn-primary disabled" : "btn btn-primary enabled" }   aria-disabled="false"> submit</button>
    </div>)} */}
{alert&&<div class="alert alert-danger" role="alert">
  success! Places deletd successfully..
</div>}

      <div className='center my-2'>
       {/* <button className="btn btn-primary"onClick={fetchuserdata}>get places</button>  */}

      </div> 
        
      {
      places && places.map((elem)=>{

        return(
          <>

          
          
        <div key={place._id}className='container-mid'>
        <div class="card" style={{ width: '20rem', height:'34rem'}}>
       <img src={elem.image.url} class="card-img-top" alt="..."  style={{ width: '20rem', height:'15rem'}}/>
       <div className='card-body'>

  
    <p class="center" >Title: {elem.title}</p>
    <p class="center" >Description: {elem.description}</p>
    <p class="center" >Adress: {elem.adress}</p>
    <p class="center" >Location: {elem.location}</p>


<div className='center'>
     <button className='btn btn-danger' onClick={()=>{deleteplacehandler(elem._id)}}>Delete</button>
</div>
       </div>
  
  

<div className='center'>
  <button className='btn btn-secondary' onClick={()=>{
  updatehandler(elem._id)}}>Update</button>

</div>
</div>
  </div>
  


          </>
)
})
}  
</div>

    

   
    
  )
}

export default Myplace