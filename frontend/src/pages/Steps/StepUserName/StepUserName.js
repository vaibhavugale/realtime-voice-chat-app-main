import React from 'react'
import Button from '../../../components/shared/Button/Button'

const StepUserName = ({onNext}) => {
  return (
    <div>StepUserName 
     <Button buttonText={'Next'} onClick={onNext}></Button>
    </div>
  )
}

export default StepUserName