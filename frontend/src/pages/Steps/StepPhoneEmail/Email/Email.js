import React, { useState } from 'react'
import Input from '../../../../components/shared/Input/Input'
import CardContainer from '../../../../components/shared/card/CardContainer'
import Button from '../../../../components/shared/Button/Button'
import { sendOtp } from '../../../../http'
import { useDispatch } from 'react-redux'
import { setOtp } from '../../../../Store/Slices/user-slices'
import { toast } from 'react-hot-toast'

const Email = ({onNext ,title ,logo ,type }) => {
  const dispatch = useDispatch();
  const [email,setEmail] = useState("")
  async function onSubmit() {

    try {
     const toastId =  toast.loading("wait")
      if (email) {
        const { data } = await sendOtp({ email: `${email}` });

        dispatch(setOtp({ email: data?.email, hash: data?.hash }));

      
        toast.success(`Otp Successfully send on ${email}`)
        toast.dismiss(toastId)
        onNext();
      }else{
        toast.dismiss(toastId)
        toast.error("please insert email ")
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <CardContainer title={title} img={logo}>
   <form>
   <Input
      value={email}
      onChange={(e) => {
        e.preventDefault()
        setEmail(e.target.value)
      }}
      type={type}
      placeholder={title}
    >
   
    </Input>

    <Button buttonText={"Next"} onclick={onSubmit}></Button>
    <p>
      {` By entering your ${type}, you’re agreeing to our Terms of Service and
        Privacy Policy. Thanks!`}
    </p>
   </form>
  </CardContainer>
  )
}

export default Email