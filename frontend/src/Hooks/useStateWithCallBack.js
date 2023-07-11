import { useCallback, useEffect, useRef, useState } from "react"

export const useStateWithCallBack = (initialState ) =>{
    const [state,setState] = useState(initialState)
    const cdRef = useRef(null)
    const updateState = useCallback((newState,cb)=>{ // cb = callBack  
        if (typeof cb === "function") {
            cdRef.current = cb;
          }
        setState((prev)=>{
            return typeof newState =="function" ? newState(prev):newState
        })

    },[])
    useEffect(()=>{
        if (typeof cdRef.current === "function") {
            cdRef.current(state);
            cdRef.current = null;
          }
    },[state])
    return [state,updateState] 
}