import React, { createContext,useState } from 'react'
import { useNavigate } from 'react-router-dom';

// const NoteContext=createContext();

const NoteContext = React.createContext({
  token: '',
  IsLoggedIn: false,
  login: (token) => {},
  data:(data)=>{},
  data1:()=>{},
  data2:()=>{},
  userid:'',
  placedata:[],
  logout: () => {},


});


export const Context = (props) => {
  const Navigate=useNavigate(NoteContext)
    const [IsLoggedIn, setIsLoggedIn] = useState(false)
    const [token, settoken] = useState(null)
    const [placedata, setplacedata] = useState([])
    const [userid, setuserid] = useState('')

    // const userIsLoggedIn=!!token;
    const loginHandler=(token)=>{
      settoken(token)
      // setuserid(userlogin._id)
      setIsLoggedIn(true)

    }
    const dataHandler=(data)=>{
      // setuserid(data.data._id)
      // setimage(data.data.image)
     setplacedata(data) 

    }

    const data1Handler=()=>{
      const user=JSON.parse(localStorage.getItem('user'))
      
      setIsLoggedIn(true)
      Navigate("/",{replace:true})
      


      
    }

    const data2Handler=()=>{
      setIsLoggedIn(false)
      Navigate("/",{replace:true})


      
    }
    // const useridhandler=(userid)=>{
    //   setuserid(userid)

    // }

    const contextValue = {
      token:token,
      IsLoggedIn:IsLoggedIn,
      login: loginHandler,
      data: dataHandler,
      data1:data1Handler,
      data2:data2Handler,
      userid:userid,
      placedata:placedata,
      // logout: logoutHandler
      
    };
  return (
    <NoteContext.Provider value={contextValue}>
        {props.children}
    </NoteContext.Provider>
  )
}

// export default Context
export default NoteContext