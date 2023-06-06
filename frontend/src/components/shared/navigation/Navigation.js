import React from "react";
import style from "./Navigation.module.css";
import { Link } from "react-router-dom";

import { logout } from "../../../http";
import { setAuth } from "../../../Store/Slices/user-slices";
import { useDispatch } from "react-redux";


const Navigation = () => {
  const dispatch = useDispatch();
 async  function handelLogout(){
  
    try{
      const {data} = await logout();

      dispatch(setAuth(data))
    }catch(err){
      console.log(err)
    }
  }
  // inline css
  const linkStyle = {
    color:"#fff",
    textDecoration:"none",
    fontSize:"22px",
    display:"flex",
    alignItems:'centre ',
    gap:"5px",
    


  }
  return (
    <nav className={`${style.NavBar} container`}>
      <div className={style.Link}>
        {/* So, Basically we using modules in css , that only apply on parent component and not 
        applied in child component , that's why css written in navigation.module.css not reflected on Link tag
        so, we have to use inline css for this
        
        
        Note:-
        Link act like child components
     */}
        <Link style={linkStyle} to="/">
          <img src="/images/icon/vectorhandshakeicon.png" alt="" />
          <span>THEVOICE</span>
        </Link>
       <button onClick={handelLogout}>Log Out</button>
      </div>
    </nav>
  );
};

export default Navigation;
