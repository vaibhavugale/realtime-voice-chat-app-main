import React from "react";
import style from "./Navigation.module.css";
import { Link } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { logout } from "../../../http";
import { setAuth } from "../../../Store/Slices/user-slices";
import { useDispatch, useSelector } from "react-redux";
import {FaUserAlt} from "react-icons/fa"

const Navigation = () => {
 
  const dispatch = useDispatch();
  const { isAuth , user} = useSelector((state) => state.authSlice);
  
  async function handelLogout() {
    try {
      const { data } = await logout();

      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }
  // inline css
  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "22px",
    display: "flex",
    alignItems: "centre ",
    gap: "5px",
  };

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
        {isAuth && (
          <div className={style.rightNav}>
            <h3>{user.name}</h3>
            <Link to={"/"}>
              <FaUserAlt /> 
            </Link>
            <abbr onClick={handelLogout} className={style.logoutButton}>
              <HiOutlineLogout title="Logout" size={30} />
            </abbr>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
