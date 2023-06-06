import React from "react";
import style from "./Input.module.css";
const Input = (props) => {


  
  return (
    <div className={style.InputWrapper}>
     {console.log(props)}
   
      {/* {children} */}
      {/* <input
        type="text"
        value={value}
        onchange={onchange}
        placeholder={placeholder}
        className={style.Input}
      /> */}
      <input type="text"  {...props} className={style.Input} />
      
    </div>
  );
};

export default Input;
