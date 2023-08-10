import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../Store/Slices/user-slices";
export function useLoadingRefresh(){
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    useEffect(()=>{
        // immediate invoke 
        (async  ()=>{{
           
        try{
            const {data} =   await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`,{ withCredentials:true})
            
                dispatch(setAuth(data))
                setLoading(false)
            
           
        }catch(er){
            setLoading(false)
            console.log(er)
            console.log("Error while in Loading hook")
            
        }
       
        }})();

    },[])
  return loading
}