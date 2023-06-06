import React from 'react'
import style from "./Button.module.css"

const Button = ({buttonText,onclick}) => {
  return (
   <div className={style.wrapperButton}>
     <button onClick={onclick} className={style.button}>
      <span>{buttonText}</span>
      <img src="/images/icon/Vectorarrow.png" alt="" />

    </button>
   </div>
  )
}

export default Button