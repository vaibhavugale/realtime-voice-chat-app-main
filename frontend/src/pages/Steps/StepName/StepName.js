import React, { useState } from 'react'
import Button from '../../../components/shared/Button/Button'
import CardContainer from '../../../components/shared/card/CardContainer'
import Input from "../../../components/shared/Input/Input"
import { useDispatch ,useSelector} from 'react-redux'
import { setName } from '../../../Store/Slices/activation-slice'

const StepName = ({onNext}) => {
 
  const [fullName , setFullName] = useState("")
  const dispatch = useDispatch();

  function setNameHandler(e){
 
     
      setFullName(e.target.value)
     // alert(otp)
    
  
  }
  function nextStep(){
    if(!fullName){
      return;
    }
    dispatch(setName(fullName));
    onNext();
    
  }
  return (
    <div className={  `Centre container`}>
    
    <CardContainer img={'/images/icon/lockEmoji.png'} title={"What's your full Name?"}>
    <div>
    <Input
    onChange={setNameHandler}
    value={fullName} 
    ></Input>
    </div>
    <div>
      <p>People use real names at THEVOICE!!!</p>
    </div>
    <Button buttonText={'Next'} onclick={nextStep}></Button>
    </CardContainer>

   </div>
  )
}

export default StepName