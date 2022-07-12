import React from 'react';
import {TouchableOpacityProps} from 'react-native'
import {
  Container,
  Icon,
  Title,
} from './styles';

const Icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}


interface Props extends TouchableOpacityProps {
  title; string;
  type: 'up' | 'down';
  isActive: boolean;
}



export function TransactionTypeButton({type, title, isActive, ...rest}: Props){
  return(
    <Container 
    isActive={isActive}
    type={type}
       {...rest}>
      

      <Icon name={Icons[type]}
      type={type}/>
      <Title>
        {title}
      </Title>
    </Container>
  )
}