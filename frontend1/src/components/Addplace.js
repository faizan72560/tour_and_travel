import React, { useContext } from 'react'
import { useState,useEffect,useRef } from 'react'
import axios from 'axios'
import NoteContext from '../context/context'
import { Places } from '../action/placeaction'
import { useDispatch } from 'react-redux'


const Addplace = () => {
  const auth=useContext(NoteContext)

  
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [IsValid, setIsValid] = useState(false)
    const [adress, setadress] = useState('')
    const [location, setlocation] = useState('')
    const [image, setimage] = useState('');
  const [previewUrl, setPreviewUrl] = useState();
  const [isvalid, setisvalid] = useState(false)
  const [isLoading,setisLoading]=useState(false)
  const [alert, setalert] = useState(false)

  
  const filePickerRef = useRef();

  useEffect(() => {
    if (!image) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(image);
    
  }, [image]);

  
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };


    const dispatch=useDispatch()

    const addplacehandler=async(e)=>{
        e.preventDefault()
        setisLoading(true)
        console.log(title,image)
        const formData= new FormData();
        formData.set("title",title)
        formData.set("description",description)
        formData.set("image",image)
        formData.set("adress",adress)
        formData.set("location",location)

        //  formData.set("image",file)
        //  formData.set("upload_preset","tour_and_travel")
        //  formData.set("cloud_name","hhhhhhh")
        //  const data= await axios.post("https://api.cloudinary.com/v1_1/hhhhhhh/image/upload",formData)
        //  console.log(data)



        console.log(formData)
        for (const value of formData.values()) {
          console.log(value);
        }

        // dispatch(Places(formData))

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          
          
          withCredentials:true
          
          
          
      }
      
     const res= await axios.post('/api/add',formData,config
    //  {
      
       
    //    // body:JSON.stringify(
    //      //   title,description
         
    //      // ),
    //      headers:{
    //        'Content-Type': "multipart/form-data"
    //       },
    //       formData,

      
      
    // //  body: formData 
    // }
    );

    setisLoading(false)
    setalert(true)

  
      // const res= await fetch('http://localhost:4000/api/places', 'POST', formData);
    
      
      
      // const data= await res.json();
      // console.log(res)
      //  localStorage.setItem("places",JSON.stringify(res))
    // auth.data(res)
        

    }

    let pickedFile;
    let fileIsValid=IsValid;

    const pickedHandler = event => {
      console.log(event.target)
      if(event.target.files && event.target.files.length===1){
        pickedFile=event.target.files[0];
        setimage(pickedFile);
        setIsValid(true)
        fileIsValid=true;
        
      }
      else{
        setIsValid(false)
      }



      
  
      
    };

    // isvalidhandler()
    
  return (

    <div className='container'>
      {alert&&<div class="alert alert-success" role="alert">
  success! Places added successfully..
</div>}
      <br/>
      <div className='center'>
      <h1> <span class="badge badge-primary">Add Place</span></h1>
      </div>
      <div className='center'>
      </div>
      
      <form method='POST' encType='multipart/form-data'>

        <div class="mb-3">
  <input type="text" class="form-control" value={title} onChange={(e)=>{settitle(e.target.value)
     setisvalid(true)} } placeholder="Title"/>
</div>
<div class="mb-3">
<input type="text" class="form-control"  ref={filePickerRef} onChange={(e)=>{setdescription(e.target.value) 
   setisvalid(true)}} placeholder="Description"/>
</div>

<div class="mb-3">

<div className="image-preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
</div>

<div class="mb-3">
  <input type="file" class="form-control"   accept='image/*' name='image' onChange={pickedHandler}  placeholder="Image"/>
</div> <div class="mb-3">
  <input type="text" class="form-control"  value={adress}  onChange={(e)=>{setadress(e.target.value)
    setisvalid(true)}} placeholder="Adress"/>
</div>
<div class="mb-3">
  <input type="text" class="form-control"  value={location}  onChange={(e)=>{setlocation(e.target.value)
    setisvalid(true)}} placeholder="Location"/>
</div>
    <div className='center'>


     {isLoading && <button class="btn btn-secondary" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>}

    </div>
<div className='center'>


<button onClick={addplacehandler} className={!isvalid ?  "btn btn-primary disabled" : "btn btn-primary enabled" }   aria-disabled="false"> submit</button>
</div>
    </form>
    </div>
  )
}

export default Addplace