import React from 'react';
import { Container, Title } from './styles';
import {TouchableOpacityprops} from 'react-native';

interface Props extends TouchableOpacityprops {
  title: string;
}

export function Button({title, ...rest}: Props){
  return(
    <Container {...rest}
    >
      <Title>
        {title}
      </Title>
    </Container>
  )
}
