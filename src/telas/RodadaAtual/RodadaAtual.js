import React, { useEffect, useState } from 'react';
import { RefreshControl, Image, StyleSheet, View, FlatList, Text, TouchableOpacity  } from 'react-native';

import apiRodada from '../../api/rodadaAtual';
import apiStatus from '../../api/status';
import apiMercado from '../../api/mercadoApi';
import apiScouts from '../../api/scouts';

import { nomeClube, imagemClube } from '../../components/clubes/clubes';

import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";


export default function RodadaAtual(){

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
  }, []);


  const { setDadosOriginal, setScouts, setStatusMercado } = useContext(GlobalContext)
  const navigation = useNavigation();

  const Item = ({ mandante, visitante, local, horario, placarmandante, placarvisitante, mandantepos, visitantepos, apm1, apm2, apm3, apm4, apm5, apv1, apv2, apv3, apv4, apv5, rodadaatual }) => (
    
      <TouchableOpacity style={estilos.cartao} onPress={() => rodadaatual === true ? navigation.navigate('Scouts', { mandante: mandante, visitante: visitante }) : ''}>
          <View style={estilos.partida}>
  
              <View style={estilos.local}>
                  <Text>{horario.substring(8,10)}/{horario.substring(5,7)}/{horario.substring(0,4)} {horario.substring(11,16)}</Text>
              </View>
              <View style={estilos.clubes}>
                  <View style={estilos.mandante}>
                      <Text style={estilos.posicao}>{mandantepos}º</Text>
                      <View style={estilos.coluna}>
                          <View style={estilos.linha}>
                              <Image source={imagemClube(mandante)} style={estilos.clubefiltro}/>
                              <View style={estilos.linhaultimas}>
                                  {placarmandante != null ? '' : apm1=="v" ? <Icon2 name="circle" size={8} color="green" style={estilos.ultimas} /> : apm1=="d" ? <Icon2 name="circle" size={8} color="red" style={estilos.ultimas} /> : <Icon2 name="circle" size={8} color="gray" style={estilos.ultimas} /> }
                                  {placarmandante != null ? '' : apm2=="v" ? <Icon2 name="circle" size={8} color="green" style={estilos.ultimas} /> : apm2=="d" ? <Icon2 name="circle" size={8} color="red" style={estilos.ultimas} /> : <Icon2 name="circle" size={8} color="gray" style={estilos.ultimas} /> }
                                  {placarmandante != null ? '' : apm3=="v" ? <Icon2 name="circle" size={8} color="green" style={estilos.ultimas} /> : apm3=="d" ? <Icon2 name="circle" size={8} color="red" style={estilos.ultimas} /> : <Icon2 name="circle" size={8} color="gray" style={estilos.ultimas} /> }
                                  {placarmandante != null ? '' : apm4=="v" ? <Icon2 name="circle" size={8} color="green" style={estilos.ultimas} /> : apm4=="d" ? <Icon2 name="circle" size={8} color="red" style={estilos.ultimas} /> : <Icon2 name="circle" size={8} color="gray" style={estilos.ultimas} /> }
                                  {placarmandante != null ? '' : apm5=="v" ? <Icon2 name="circle" size={8} color="green" style={estilos.ultimas} /> : apm5=="d" ? <Icon2 name="circle" size={8} color="red" style={estilos.ultimas} /> : <Icon2 name="circle" size={8} color="gray" style={estilos.ultimas} /> }
                              </View>
                              <Text style={estilos.placar}>{placarmandante === null ? '' : placarmandante}</Text>
                          </View>
                          {placarmandante === null ? <Text style={estilos.nomeclubemand2}>{nomeClube(mandante)}</Text> : <Text style={estilos.nomeclubemand}>{nomeClube(mandante)}</Text>}
                      </View>
                  </View>
                  <View style={estilos.visitante}>
                      <View style={estilos.coluna}>
                          <View style={estilos.linha}>
                              <View style={estilos.linhaultimas}>
                                  {placarvisitante != null ? '' : apv5=="v" ? <Icon2 name="circle" size={8} color="green" style={estilos.ultimas} /> : apv5=="d" ? <Icon2 name="circle" size={8} color="red" style={estilos.ultimas} /> : <Icon2 name="circle" size={8} color="gray" style={estilos.ultimas} /> }
                                  {placarvisitante != null ? '' : apv4=="v" ? <Icon2 name="circle" size={8} color="green" style={estilos.ultimas} /> : apv4=="d" ? <Icon2 name="circle" size={8} color="red" style={estilos.ultimas} /> : <Icon2 name="circle" size={8} color="gray" style={estilos.ultimas} /> }
                                  {placarvisitante != null ? '' : apv3=="v" ? <Icon2 name="circle" size={8} color="green" style={estilos.ultimas} /> : apv3=="d" ? <Icon2 name="circle" size={8} color="red" style={estilos.ultimas} /> : <Icon2 name="circle" size={8} color="gray" style={estilos.ultimas} /> }
                                  {placarvisitante != null ? '' : apv2=="v" ? <Icon2 name="circle" size={8} color="green" style={estilos.ultimas} /> : apv2=="d" ? <Icon2 name="circle" size={8} color="red" style={estilos.ultimas} /> : <Icon2 name="circle" size={8} color="gray" style={estilos.ultimas} /> }
                                  {placarvisitante != null ? '' : apv1=="v" ? <Icon2 name="circle" size={8} color="green" style={estilos.ultimas} /> : apv1=="d" ? <Icon2 name="circle" size={8} color="red" style={estilos.ultimas} /> : <Icon2 name="circle" size={8} color="gray" style={estilos.ultimas} /> }
                              </View>
                              <Text style={estilos.placar}>{placarvisitante === null ? '' : placarvisitante}</Text>
                              <Image source={imagemClube(visitante)} style={estilos.clubefiltro}/>
                          </View>
                          {placarvisitante === null ? <Text style={estilos.nomeclubevisit2}>{nomeClube(visitante)}</Text> : <Text style={estilos.nomeclubevisit}>{nomeClube(visitante)}</Text>}
                      </View>
                      <Text style={estilos.posicao}>{visitantepos}º</Text>
                  </View>
                  
              </View>
              <View style={estilos.local}>
                  <Text>{local}</Text>
              </View>
          </View>
      </TouchableOpacity>
    );


    const [partidas, setPartidas] = useState([]);
    const [numRodada,setNumRodada] = useState('');
    let numeroRodada = ''
    const [numRodadaAtual,setNumRodadaAtual] = useState('');

    async function CarregaRodada(){

        const dadosStatus = await apiStatus.get()
        setStatusMercado(dadosStatus.data.status_mercado)

        
        setNumRodadaAtual(dadosStatus.data.rodada_atual);
        numeroRodada = dadosStatus.data.rodada_atual

        numeroRodada === '1' ? numRodada === '1' ? numRodada : setNumRodada(numeroRodada) : setNumRodada(numeroRodada)
    }

    async function CarregaAPI(numero){
        
        const dadosPartida = await apiRodada.get(numero.toString())
        
        setPartidas(dadosPartida.data);
        numeroRodada = numero.toString()

    }

    async function CarregaDadosIniciais(){

		  const teste = await apiMercado.get('')
		
      setDadosOriginal(teste.data);

      const dadosScout = await apiScouts.get('')

      setScouts(dadosScout.data.atletas)
	  }
	


    useEffect(() => {
        
      //setNumRodada(1)
      async function fetchMyAPI() {

        await CarregaRodada();
      }
  
      fetchMyAPI()
      CarregaDadosIniciais();
      //setNumRodada(1)

    },[]);
  
      
    useEffect(() => {

      CarregaAPI(numRodada);
      
    },[numRodada]);

   

    const renderItem = ({ item }) => (

      numRodada==numRodadaAtual ?
        <Item mandante={item.clube_casa_id} visitante={item.clube_visitante_id} local={item.local} horario={item.partida_data} placarmandante={item.placar_oficial_mandante} placarvisitante={item.placar_oficial_visitante} mandantepos={item.clube_casa_posicao} visitantepos={item.clube_visitante_posicao} apm1={item.aproveitamento_mandante[0]} apm2={item.aproveitamento_mandante[1]} apm3={item.aproveitamento_mandante[2]} apm4={item.aproveitamento_mandante[3]} apm5={item.aproveitamento_mandante[4]} apv1={item.aproveitamento_visitante[0]} apv2={item.aproveitamento_visitante[1]} apv3={item.aproveitamento_visitante[2]} apv4={item.aproveitamento_visitante[3]} apv5={item.aproveitamento_visitante[4]} rodadaatual={true}/>
        :
        <Item mandante={item.clube_casa_id} visitante={item.clube_visitante_id} local={item.local} horario={item.partida_data} placarmandante={item.placar_oficial_mandante} placarvisitante={item.placar_oficial_visitante} mandantepos={item.clube_casa_posicao} visitantepos={item.clube_visitante_posicao} apm1={item.aproveitamento_mandante[0]} apm2={item.aproveitamento_mandante[1]} apm3={item.aproveitamento_mandante[2]} apm4={item.aproveitamento_mandante[3]} apm5={item.aproveitamento_mandante[4]} apv1={item.aproveitamento_visitante[0]} apv2={item.aproveitamento_visitante[1]} apv3={item.aproveitamento_visitante[2]} apv4={item.aproveitamento_visitante[3]} apv5={item.aproveitamento_visitante[4]} rodadaatual={false} />
        
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
        <View style={estilos.verrodadaatual}>
            { numRodada == numRodadaAtual ? '' : <TouchableOpacity onPress={() => setNumRodada(numRodadaAtual)}><Text style={estilos.linkrodadaatual}>ver rodada atual</Text></TouchableOpacity>}
        </View>
        <FlatList
            data={partidas.partidas}
            renderItem={renderItem}
            keyExtractor={item => item.partida_id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
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
  linha:{
    flexDirection: "row",
  },
  linhaultimas:{
    flexDirection: "row",
    marginTop:16,
  },
  coluna:{
    flexDirection: "column",
  },
  imagem:{
    marginLeft: 10,
    borderRadius: 6,
    alignContent: "center",
    justifyContent: "center",
    
  },
  nomeclubemand:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginRight: 10,
    marginTop: 10,
  },
  nomeclubevisit:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  nomeclubemand2:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginRight: 40,
    marginTop: 10,
  },
  nomeclubevisit2:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 40,
    marginTop: 10,
  },
  posicao:{
    marginBottom:30,
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
  ultimas:{
    marginLeft:2,
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
    width:36,
    height:36,
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
  verrodadaatual:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:4,
  },
  linkrodadaatual:{
    color:'#9C27B0' ,
  },
});