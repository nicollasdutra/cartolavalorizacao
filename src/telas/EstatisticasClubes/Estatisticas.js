import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

import EstatisticasClubes from '../../components/clubes/EstatisticasClubes';

import apiRodada from '../../api/rodadaAtual';

import Icon from 'react-native-vector-icons/AntDesign';


const Item = ({ mandante, visitante}) => (
  
    <View style={estilos.cartao}>
        <Text style={estilos.interno}>{EstatisticasClubes(mandante,true)}</Text>
        <Icon name="close" style={estilos.x} />
        <Text style={estilos.interno}>{EstatisticasClubes(visitante,false)}</Text>
    </View>
  );

export default function Estatisticas(){

    const [partidas, setPartidas] = useState([]);
    

    async function CarregaAPI(){

        const dadosPartida = await apiRodada.get()
        setPartidas(dadosPartida.data);
        
    }

    useEffect(() => {
        CarregaAPI();
    },[]);

    const renderItem = ({ item }) => (
        <Item mandante={item.clube_casa_id} visitante={item.clube_visitante_id} />
    );

    return <>
        
        <Text style={estilos.titulo}>Gols dos últimos 3 jogos (casa x fora):</Text>
        <FlatList
            data={partidas.partidas}
            renderItem={renderItem}
            keyExtractor={item => item.partida_id}
        /> 
    
    </>


}

const estilos = StyleSheet.create({
    espaco:{
        marginBottom:16,
    },
    versus:{
        textAlign:"center",
        fontSize:16,
        fontWeight:"bold",
        textAlignVertical:"center",
    },
    linha:{
        flexDirection: "row",
        

    },
    titulo:{
        fontWeight:"bold",
        fontSize:16,
        textAlign:"center",
        alignItems:"center",
        marginBottom:10,
    },
    cartao:{
        backgroundColor: '#F6F6F6',
        marginBottom:16,
        justifyContent: "space-between",
        marginRight:10,
        marginLeft:10,
        borderRadius: 6,
        flexDirection: "row",
        elevation: 4, //para colocar sombra - somente android
    
        //para IOS a sombra é os itens até o final (shadowRadius)
        shadowColor: '#000',
        shadowOffset:{
            width: 0,
            height:2, 
        },
        shadowOpacity: 0.23,
        shadowRadius:2.62,
    },
    interno:{
        marginTop:6,
        marginLeft:6,
        marginRight:10,
        marginBottom:6,
    },
    x:{
        fontSize:24,
        alignItems:"center",
        textAlignVertical:"center",
    }

})