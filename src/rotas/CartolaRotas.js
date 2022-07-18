import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RodadaAtual from '../telas/RodadaAtual/RodadaAtual';
import Scouts from '../telas/RodadaAtual/Scouts';

const Stack = createNativeStackNavigator();

const CartolaRotas = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="RodadaAtual"
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen
          name="RodadaAtual"
          component={RodadaAtual}
        />
        <Stack.Screen
          name="Scouts"
          component={Scouts}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default CartolaRotas;