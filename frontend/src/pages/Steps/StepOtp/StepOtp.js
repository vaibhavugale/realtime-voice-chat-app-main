import React, { useState } from "react";
import Button from "../../../components/shared/Button/Button";
import CardContainer from "../../../components/shared/card/CardContainer";
import Input from "../../../components/shared/Input/Input";
import { verifyOtp } from "../../../http";
import { useSelector } from "react-redux";
import { setAuth } from "../../../Store/Slices/user-slices";
import { useDispatch } from "react-redux";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState();
  const dispatch = useDispatch();
  const { phone, hash } = useSelector((state) => state.authSlice.otp);
  async function onSubmit() {
    try {
      if (otp) {
        console.log({ otp: otp, phone: phone, hash: hash });
        const { data } = await verifyOtp({
          otp: otp,
          phone: phone,
          hash: hash,
        });
        console.log(data);
        dispatch(setAuth(data));
        onNext();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={`Centre container`}>
      <CardContainer
        img={"/images/icon/lockEmoji.png"}
        title={"Enter the code we just texted you"}
      >
        <div>
          <Input
            onChange={(e) => {
              setOtp(e.target.value);
              // alert(otp)
            }}
            value={otp}
          ></Input>
          <p>Didn't receive Otp? tap to resend</p>
        </div>
        <Button buttonText={"Next"} onclick={onSubmit}></Button>
      </CardContainer>
    </div>
  );
};

export default StepOtp;
