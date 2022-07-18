import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View,FlatList, Image, TouchableOpacity  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import logo from './src/assets/logo.png';

import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import CartolaRotas from './src/rotas/CartolaRotas';
//import RodadaAtual from './src/telas/RodadaAtual/RodadaAtual';
import Valorizar from './src/telas/Valorizar/Valorizar';
import MaisEscalados from './src/telas/MaisEscalados/MaisEscalados';
import MaiorMedia from './src/telas/MaiorMedia/MaiorMedia';
import Estatisticas from './src/telas/EstatisticasClubes/Estatisticas';
//import MeuTime from './src/telas/Times/MeuTime';

import { InfoProvider } from './src/contexts/GlobalContext';

const Tab = createBottomTabNavigator();


function App(){

  
  return <>
  		  <View style={estilos.linha}><Image source={logo} style={estilos.logo} /><Text style={estilos.textologo}>Nikao do cartola</Text></View>
          
          <SafeAreaView style={estilos.tela}>

		  <InfoProvider>
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
              				case 'Mais Escalados':
								iconName = 'chevrons-up';
								break;
							case 'Meu Time':
								iconName = 'chevrons-up';
								break;
              				case 'Maiores Medias':
                  				iconName = 'bar-chart';
                  			break;
							case 'Estatisticas':
								iconName = 'bar-chart-2';
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
				<Tab.Screen name="Rodada Atual" component={CartolaRotas} />
				<Tab.Screen name="Mais Escalados" component={MaisEscalados} />
				{/*
					Este Tab abaixo cria um botao estilizado como se fosse para um post ou criar algo novo (MUITO BOM)
				*/}
         		<Tab.Screen
					name="Estatisticas"
					component={Estatisticas}
					options={() => ({
						tabBarIcon: ({tintColor}) => (
							<View>
								<LinearGradient style={estilos.iconTabRound} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={['#D500F9', '#4A148C']}>
									<Icon name="bar-chart-2" size={26} color='#FFF'/>
								</LinearGradient>
							</View>
						),
					})}
				/> 
        		<Tab.Screen name="Maiores Medias" component={MaiorMedia} />
				<Tab.Screen name="Min. Valorizar" component={Valorizar} />
			</Tab.Navigator>
		</NavigationContainer>
		</InfoProvider>
		
        </SafeAreaView>
        </>
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    marginTop: 16,
	backgroundColor: "#F6F6F6",
  },
  iconTabRound: {
    width: 40,
    height: 40,
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
},
logo: {
    width: 32,
    height: 32,
  },
  linha: {
	flexDirection: "row",
	marginBottom:-10,
	textAlignVertical: "center",
	marginLeft:6,
  },
  textologo:{
	textAlignVertical: "center",
  }
})

export default App;