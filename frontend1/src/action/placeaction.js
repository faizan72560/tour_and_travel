import axios from "axios"
export const Places=(formData)=>async(dispatch)=>{
    
    try{

        dispatch({type:"PlaceRequest"})

        const {data}=await axios.post("/api/add",formData,{
            // withCredentials:true,
            // headers: {'Content-Type': 'application/json'}
        })
        dispatch({
            type:"placesfetched",
            payload:Places.data
        })

    }catch(e){
        dispatch({
            type:"placesfetched failed",
            payload: e
        })

    }

    

}


export const LoadPlace=()=>async(dispatch)=>{
    try{

        dispatch({type:"LoadRequest"})

        const {data}=await axios.get("/api/meto",{
        

            headers: {'Content-Type': 'application/json'}
        })
        dispatch({
            type:"LoadSuccess",
            payload: data.place
        })

    }catch(e){
        dispatch({
            type:"LoadFailure",
            payload: e
        })

    }

}
