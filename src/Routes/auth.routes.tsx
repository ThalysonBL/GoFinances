import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';

import { SignIn} from '../screens/SignIn'

const {Navigator, Screen} = createStackNavigator();

export function AuthRoutes(){
  return(

        <Navigator >
        <Screen 
          name="SignIn"//quando chamar o SignIn
          component={SignIn} // renderizará esse componente
          options={{
            headerMode:"false"
          }}/>
        </Navigator>
      )
}