import React, { useState } from "react";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";
import style from "./StepPhoneEmail.module.css";
const phoneEmail = {
  // phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("email");
  const [title, setTitle] = useState("Entre your Email id");
  const [logo, setLogo] = useState("/images/icon/emailEmoji.png");

  const TypeComponent = phoneEmail[type];

  function changeType(e) {
    if (e.currentTarget.value === "phone") {
      setType("phone")
      setTitle("Entre your Phone  number");
      setLogo("/images/icon/TelephoneEmoji.png");
    } else {
      setType('email')
      setTitle("Entre your Email id");
      setLogo("/images/icon/emailEmoji.png");
    }
   
    
  }

  return (
    <div className={`Centre container`}>
      <div>
        <div className={style.buttonWrapper}>
          {/* <button
            className={`${style.buttonIcon} ${
              type == "phone" ? style.active : ""
            }`}
            onClick={changeType}
            value={"phone"}
          >
            <p>
              <img src="/images/icon/phone.png" alt="icon" />
            </p>
          </button> */}
          <button
            className={`${style.buttonIcon}  ${
              type == "email" ? style.active : ""
            }`}
            onClick={changeType}
            value={"email"}
          >
            <p>
              <img src="/images/icon/email.png" alt="icon" />
            </p>
          </button>
        </div>

        <TypeComponent  onNext={onNext} title={title} type={type} logo={logo} />
      </div>
    </div>
  );
};

export default StepPhoneEmail;
