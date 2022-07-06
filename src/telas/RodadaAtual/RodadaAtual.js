import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, FlatList, Text, TouchableOpacity  } from 'react-native';

import apiRodada from '../../api/rodadaAtual';
import apiStatus from '../../api/status';

import { nomeClube, imagemClube } from '../../components/clubes/clubes';

import Icon from 'react-native-vector-icons/Feather';

const Item = ({ mandante, visitante, local, horario, placarmandante, placarvisitante }) => (
  
    <View style={estilos.cartao}>
        <View style={estilos.partida}>

        <View style={estilos.local}>
            <Text>{horario.substring(8,10)}/{horario.substring(5,7)}/{horario.substring(0,4)} : {horario.substring(11,16)}</Text>
        </View>

        <View style={estilos.clubes}>
            <View style={estilos.mandante}>
                <Image source={imagemClube(mandante)} style={estilos.clubefiltro}/>
                <Text style={estilos.placar}>{placarmandante === null ? '' : placarmandante}</Text>
            </View>
            <View style={estilos.visitante}>
                <Text style={estilos.placar}>{placarvisitante === null ? '' : placarvisitante}</Text>
                <Image source={imagemClube(visitante)} style={estilos.clubefiltro}/>
            </View>
        </View>

        <View style={estilos.clubes}>
            <View style={estilos.mandante}>
                <Text>{nomeClube(mandante)}</Text>
            </View>
            <View style={estilos.visitante}>
                <Text>{nomeClube(visitante)}</Text>
            </View>
        </View>
        
        <View style={estilos.local}>
            <Text>{local}</Text>
        </View>
        </View>
    </View>
  );



export default function RodadaAtual(){

    const [partidas, setPartidas] = useState([]);
    const [numRodada,setNumRodada] = useState('');
    const [numRodadaAtual,setNumRodadaAtual] = useState('');

    async function CarregaRodada(){

        const dadosStatus = await apiStatus.get()
        
        setNumRodadaAtual(dadosStatus.data.rodada_atual);

        numRodada === '' ? setNumRodada(numRodadaAtual) : numRodada
    }

    async function CarregaAPI(numero){

        
        const dadosPartida = await apiRodada.get(numero.toString())
        
        setPartidas(dadosPartida.data);
        
    }

    useEffect(() => {

        CarregaRodada();
      
      },);
  
      
    useEffect(() => {

        
      CarregaAPI(numRodada);
    
    },[numRodada]);

   

    const renderItem = ({ item }) => (

        <Item mandante={item.clube_casa_id} visitante={item.clube_visitante_id} local={item.local} horario={item.partida_data} placarmandante={item.placar_oficial_mandante} placarvisitante={item.placar_oficial_visitante} />
        
    );
      
    function aumentaNumero(numero){

        let x = parseInt(numero) + 1
        
        let z = numero === '38' ? '38' : x.toString()

        return z
    }
    
    function diminuiNumero(numero){

        let x = parseInt(numero) - 1
        
        let z = numero === '1' ? '1' : x.toString()

        return z
        
    }

    return <>
        
        <View style={estilos.navegacao}>
        <TouchableOpacity onPress={() => setNumRodada(diminuiNumero(numRodada))}><Icon name="arrow-left-circle" size={36} /></TouchableOpacity>
        {numRodada==numRodadaAtual
            ?
                <Text style={estilos.numeroRodada}>Rodada Atual</Text>
            :
            <Text style={estilos.numeroRodada}>Rodada {numRodada}</Text>
        }
        <TouchableOpacity onPress={() => setNumRodada(aumentaNumero(numRodada))}><Icon name="arrow-right-circle" size={36} /></TouchableOpacity>
        
        </View>
        <FlatList
            data={partidas.partidas}
            renderItem={renderItem}
            keyExtractor={item => item.partida_id}
        /> 
        
    </>
}


const estilos = StyleSheet.create({
    
    cartao:{
      backgroundColor: '#F6F6F6',
      marginVertical:8,
      marginHorizontal: 16,
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
  imagem:{
    marginLeft: 10,
    borderRadius: 6,
    alignContent: "center",
    justifyContent: "center",
    
  },
  partida:{
    alignContent: "center",
    justifyContent: "center",
  },
  clubes:{
    flexDirection:"row",
    width: '100%',
    marginTop:10,
  },
  mandante:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    flexDirection:"row",
  },
  visitante:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    flexDirection:"row",
},
  local:{
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  clubefiltro:{
    marginLeft:22,
    marginRight:22,
  },
  navegacao:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:"row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  numeroRodada:{
    fontWeight: "bold",
    fontSize: 16,
  },
  placar:{
    fontWeight: "bold",
    fontSize: 28,
    
  },
});