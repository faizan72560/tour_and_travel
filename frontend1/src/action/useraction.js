import axios from "axios"


export const loginUser=(email,password)=>async(dispatch)=>{
    
    try{

        dispatch({type:"LoginRequest"})
       
        const data=await axios.post("http://localhost:4000/api/users/login",{email,password},{
            withCredentials:true,
            headers: {'Content-Type': 'application/json'}
        })
        console.log(data)
        dispatch({
            type:"LoginSuccess",
            payload:data.userlogin
        })
        localStorage.setItem("user",JSON.stringify(data.userlogin))        
        localStorage.setItem("islogin",true)
        // window.location.reload()

    



    }catch(e){
        dispatch({
            type:"LoginFailure",
            payload: e
        })

    }

    

}


export const LoadUser=()=>async(dispatch)=>{
    try{

        dispatch({type:"LoadRequest"})

        const {data}=await axios.get("http://localhost:4000/api/users/me",{
            withCredentials:true,
        

            headers: {'Content-Type': 'application/json'}
        })
        dispatch({
            type:"LoadSuccess",
            payload: data.user
        })

    }catch(e){
        dispatch({
            type:"LoadFailure",
            payload: e
        })

    }

}


export const logoutUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LogoutUserRequest",
      });
  
      await axios.get("http://localhost:4000/api/users/logout",{withCredentials:true});
  
      dispatch({
        type: "LogoutUserSuccess",
      });
    } catch (error) {
      dispatch({
        type: "LogoutUserFailure",
        payload: error.response.data.message,
      });
    }
  };


  export const getplaces = () => async (dispatch) => {
    try {
      dispatch({
        type: "GetPlacesRequest",
      });

        
    const config = {
        withCredentials:true
      }
  
    const {data}= await axios.get("http://localhost:4000/api/getplacebyuserid",config);
  
      dispatch({
        type: "GetPlacesSuccess",
        payload:data.post
      });
    } catch (error) {
      dispatch({
        type: "GetPlacesFailure",
        payload: error.response.data.message,
      });
    }
  };

