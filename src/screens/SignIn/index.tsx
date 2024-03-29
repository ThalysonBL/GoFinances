import React, {useState} from 'react';
import {Alert, ActivityIndicator, Platform} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useTheme} from 'styled-components'
import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'

import { useAuth} from '../../hooks/auth' //utilizando o hook

import {SignInSocialButton} from '../../components/SignInSocialButton'

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles';

export function SignIn(){
  const [isLoading, setIsLoading] = useState(false); 
  const {user, signInWithGoogle, signInWithApple} = useAuth()
  const theme = useTheme();

  async function handleSignInWithGoogle(){

    try {
      setIsLoading(true)
      return await signInWithGoogle();

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel conectar a conta Google')
      setIsLoading(false)

    }
  }
  async function handleSignInWithApple(){

    try {
      setIsLoading(true)

      return await signInWithApple();

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel conectar a conta Apple')
      setIsLoading(false)

    }
  }
  return(
    <Container>
      <Header>
        <TitleWrapper>
        <LogoSvg
          width={RFValue(120)}
          height={RFValue(68)}
        />
            <Title>
              Controle suas {'\n'}
              finanças 
              de forma muito simples
            </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com  {'\n'}
          uma das formas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
        <SignInSocialButton 
          title="Entrar com Google"
          svg={GoogleSvg}
          onPress={handleSignInWithGoogle}
        />
        {
          Platform.OS === 'ios' &&
          <SignInSocialButton 
          title="Entrar com Apple"
          svg={AppleSvg}
          onPress={handleSignInWithApple}
          
          
          />
        }
        
        </FooterWrapper>
        {isLoading && 
        <ActivityIndicator 
        color={theme.colors.shape}
        styles={{
        marginTop: 18}}/>}
      </Footer>

    </Container>
  )

}