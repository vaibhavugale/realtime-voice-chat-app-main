import React, { useState } from "react";
import Button from "../../../components/shared/Button/Button";
import CardContainer from "../../../components/shared/card/CardContainer";
import style from "./StepAvatar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAvatar } from "../../../Store/Slices/activation-slice";
import { activate } from "../../../http";
import { setAuth } from "../../../Store/Slices/user-slices";
import { toast } from "react-hot-toast";
const StepAvatar = ({ onNext }) => {
  const { name, avatar } = useSelector((state) => state.activationSlice);
  const [image, setImage] = useState("/images/icon/avatarimage.png");
  const dispatch = useDispatch();

 

 async function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }
  async function submit() {
   
    try {
      const result = await activate({ name, avatar });
      console.log(result)
      if (result?.data?.auth) {
          dispatch(setAuth(result?.data));
      
      }else{
        
        toast.error("All field required")
      }
     
  } catch (err) {
    
      console.log(err);
  }
  }
  return (
    <div className={`Centre container`}>
      <CardContainer img={"/images/icon/lockEmoji.png"} title={`Okay, ${name}`}>
        <p>How’s this photo?</p>
        <div>
          <img className={style.avatarImg} src={image} alt="avatar" />
          <label className={style.label} htmlFor="avatarImg">
            <p>choose different photo</p>

            <input
              onChange={captureImage}
              className={style.labelInput}
              type="file"
              id="avatarImg"
            />
          </label>
        </div>

        <Button buttonText={"Next"} onclick={submit}></Button>
      </CardContainer>
    </div>
  );
};

export default StepAvatar;
