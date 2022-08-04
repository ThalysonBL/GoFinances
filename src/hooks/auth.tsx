import React, {createContext, ReactNode, useContext, useState} from 'react'
import {AsyncStorage} from '@react-native-async-storage/async-storage'
const {CLIENT_ID} = process.env
const {REDIRECT_URI} = process.env

//ReactNode é tipagem para o elemento
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
interface AuthProviderProps {
  children: ReactNode; //No children é "armazenado" o Conteúdo do context, deve ser passado no App.tsx
}

interface User {
  id: string;
  name: string; 
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>; //estamos exportando nossa function tipada com Promise<void>
  signInWithApple(): Promise<void>; //estamos exportando nossa function tipada com Promise<void>

}
interface AuthorizationResponse {
  params: {
    access_token: string;

  },
  type: string;
}

const AuthContext = createContext({} as IAuthContextData); //O array rcebe um objeto(User)
 
function AuthProvider({children}: AuthProviderProps){
  const [user, setUser] = useState<User>({} as User)


  async function signInWithGoogle(){
    try {
      
      
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email'); //scope é o que quero acessar do usuário

      //const authUrl = `https://accounts.google.com/o/oauth2/v2/auth`;//link da auth
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
     const {type, response} = await AuthSession.startAsync({authUrl}) as AuthorizationResponse;
      if(type === 'success'){
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access.token}`)

        const userInfo = await response.json();
            console.log(response);
            setUser({
              id: String(userInfo.id),
              email: userInfo.email,
              name: userInfo.given_name,
              photo: userInfo.picture,
            });

            setUser(userLogged);
            await AsyncStorage.setItem('@goFinances:user', JSON.stringfy(userLogged))
          }

    } catch (error) {
      throw new Error(error);
      
    }
  }

  async function signInWithApple(){
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL

        ]
      });
      if(crendential) {
        const userLogged = {
          id: String(crendential.id),
              email: crendential.email!,
              name: crendential.fullName!.givenName!,
              photo: underfined,
        };
        
        setUser(userLogged) //alterando estado
        await AsyncStorage.setItem('@goFinances:user', JSON.stringfy(userLogged))
      }

    } catch (error) {
      throw new Error(error);
    }
  }

  return(


  <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple}}>

    {children}

  </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext)

  return context;
}

export {AuthProvider, useAuth}