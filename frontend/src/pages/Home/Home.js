import React from "react";
import style from "./Home.module.css";
import CardContainer from "../../components/shared/card/CardContainer";
import { useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button/Button";
const Home = () => {


const navigate = useNavigate();


 function startRegistration(){
  navigate("/authenticate")
 }
 
  return (
    <div className={`${style.wrapper} container`}>
      <CardContainer  title={'Welcome TO THEVOICE'} img={'/images/icon/Vectorhandshakeicon.png'}>      
      <p className={style.description}>
        We're excited to have you here and look forward to helping you ,connect
        with other users in real-time
      </p>
      <div className={style.button}>
        <Button onclick={startRegistration}  buttonText={'Sign up'} />
      </div>
      </CardContainer>

    
    </div>
  );
};

export default Home;
