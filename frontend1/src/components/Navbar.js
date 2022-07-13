import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import NoteContext from '../context/context'
import { useDispatch, useSelector } from 'react-redux'
import { LoadUser, logoutUser } from '../action/useraction'


const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log(isAuthenticated)

  const auth=useContext(NoteContext)
  const history=useNavigate()
  const dispatch=useDispatch()

  
  const logouthandler= async(e)=>{

    e.preventDefault()

    dispatch(logoutUser())
    // try{

    //   const res= await fetch("http://localhost:4000/api/users/logout",{
    //           method:"GET",
    //           credentials:"include",

              
    //       })
    //       console.log(res)
          
          
          
    //     }catch(err){console.log(err)}
        
    //     window.localStorage.clear();
    //     history('/login');
        // window.location.reload()
      // auth.data2()
      


  }


  const islogin= JSON.parse(localStorage.getItem('islogin'))

  
  return (
    <div>
        <nav className="navbar navbar-light navbar-expand-lg bg-primary">
  <div className="container-fluid">
    <Link to= "/">
    <a className="navbar-brand" >Welcome </a>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
           {isAuthenticated && <Link to="/Myplace">
          <a className="nav-link active" aria-current="page">My Places</a>
          </Link>}
        </li>
        <li className="nav-item">
           {isAuthenticated && <Link to='/Addplace'>
          <a className="nav-link active" aria-current="page">Add  Places</a>
          </Link>}
        </li><li className="nav-item">
          {/* {auth.IsLoggedIn && <Link to='/Updateplace'>
          <a className="nav-link active" aria-current="page" href="/">Update Places</a>
          </Link>} */}
        </li>
      </ul>
      <form className="d-flex" >
         {isAuthenticated===false && <Link to='/Signup'>
      <button className="btn btn-secondary" type="submit">Signup</button>
        </Link>}
    
        {isAuthenticated?<button onClick={logouthandler} className="btn btn-secondary" type="submit">Logout</button>:
     <Link to='/login'>
        <button className="btn btn-secondary" type="submit">login</button>
    </Link>}
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar