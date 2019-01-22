import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  padding: 10px;
  height: 34px;
  border-radius: 6px;
`;

export default function InputField(props) {
  return <Input {...props} />
}
