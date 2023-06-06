import React from "react";

import style from "./CardContainer.module.css";
const CardContainer = ({ children, img, title }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.titleWrapper}>
        <img src={img} alt="icon" />
        {title}
      </div>
      {children}
    </div>
  );
};

export default CardContainer;
