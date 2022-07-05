import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View,FlatList, Image, TouchableOpacity  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import RodadaAtual from './src/telas/RodadaAtual/RodadaAtual';
import Valorizar from './src/telas/Valorizar/Valorizar';



const Tab = createBottomTabNavigator();

function App(){


  return <>
          <SafeAreaView style={estilos.tela}>
          <NavigationContainer>

              <Tab.Navigator screenOptions={({ route }) => ({ 
                headerShown: false, //remove os titulos superiores que aparecem em cada 
                tabBarActiveTintColor:'black', //cor do item escrito da tab selecionada
                tabBarInactiveTintColor: '#C7C7C7', //cor do item escrito nas tabs nao selecionadas
                
                })}>
                <Tab.Screen name='Rodada Atual' component={RodadaAtual} />
                <Tab.Screen name='Valorizar' component={Valorizar} />
              </Tab.Navigator>
          
          </NavigationContainer>
          
          </SafeAreaView>
        </>
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    marginTop: 16,
  },

})

export default App;