import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {AuthRoutes} from './auth.routes'
import {AppRoutes} from './app.routes'
import {useAuth} from '../hooks/auth'

export default function  Routes(){
  const {user} = useAuth()
  return(
    <NavigationContainer>

      {user.id ?  <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
//o user se estiver autenticado usará o AppRoutes, se não, AuthRoutes