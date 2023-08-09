import React, { useState } from "react";
import Input from "../../../../components/shared/Input/Input";
import CardContainer from "../../../../components/shared/card/CardContainer";
import Button from "../../../../components/shared/Button/Button";
import { sendOtp } from "../../../../http";
import { useDispatch, useSelector } from "react-redux";
import { setOtp } from "../../../../Store/Slices/user-slices";

const Phone = ({ onNext, title, logo, type }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  async function onSubmit() {
    try {
      if (phoneNumber) {
        const { data } = await sendOtp({ phone: `${phoneNumber}` });

        dispatch(setOtp({ phone: data?.phone, hash: data?.hash }));

      

        onNext();
      }else{
        alert("please insert phone number")
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <CardContainer title={title} img={logo}>
        <Input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder={"91701418191"}
        >
          {/* <img src="/images/icon/IndianEmoji.png" alt="" /> */}
        </Input>

        <Button buttonText={"Next"} onclick={onSubmit}></Button>
        <p>
          {` By entering your ${type}, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!`}
        </p>
      </CardContainer>
    </div>
  );
};

export default Phone;
