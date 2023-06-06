import React from 'react'
import Input from '../../../../components/shared/Input/Input'
import CardContainer from '../../../../components/shared/card/CardContainer'
import Button from '../../../../components/shared/Button/Button'

const Email = ({onNext ,title ,logo ,type }) => {
  return (
    <CardContainer title={title} img={logo}>
    <Input
      value={''}
      // onchange={(e) => setPhoneNumber(e.target.value)}
      type={"telephone"}
      placeholder={"91701418191"}
    >
      <img src="/images/icon/IndianEmoji.png" alt="" />
    </Input>

    <Button buttonText={"Next"} onClick={onNext}></Button>
    <p>
      {` By entering your ${type}, you’re agreeing to our Terms of Service and
        Privacy Policy. Thanks!`}
    </p>
  </CardContainer>
  )
}

export default Email