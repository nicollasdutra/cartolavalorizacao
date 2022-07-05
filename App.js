import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View,FlatList, Image, TouchableOpacity  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';


import RodadaAtual from './src/telas/RodadaAtual/RodadaAtual';
import Valorizar from './src/telas/Valorizar/Valorizar';



const Tab = createBottomTabNavigator();

function App(){


  return <>
          <SafeAreaView style={estilos.tela}>
          <NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ color, size }) => {
						let iconName;

						switch (route.name) {
							case 'Rodada Atual':
								iconName = 'home';
								break;
							case 'Min. Valorizar':
								iconName = 'dollar-sign';
								break;
							
							default:
								iconName = 'circle';
								break;
						}

						return <Icon name={iconName} size={size} color={color} />;
					},
          headerShown: false, //remove os titulos superiores que aparecem em cada 
          tabBarActiveTintColor:'#9C27B0', //cor do item escrito da tab selecionada
          tabBarInactiveTintColor: '#C7C7C7', //cor do item escrito nas tabs nao selecionadas
          showLabel: false,
          
				})}
				
			>
				<Tab.Screen name="Rodada Atual" component={RodadaAtual} />
				{/*

          Este Tab abaixo cria um botao estilizado como se fosse para um post ou criar algo novo (MUITO BOM)

         <Tab.Screen
					name="Post"
					component={RodadaAtual}
					options={() => ({
						tabBarIcon: ({tintColor}) => (
							<View>
								<LinearGradient style={estilos.iconTabRound} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={['#D500F9', '#4A148C']}>
									<Icon name="plus" size={26} color='#FFF'/>
								</LinearGradient>
							</View>
						),
					})}
				/> */}
				<Tab.Screen name="Min. Valorizar" component={Valorizar} />
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
  iconTabRound: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
}
})

export default App;