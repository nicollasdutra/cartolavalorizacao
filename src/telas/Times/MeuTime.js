import React, { useEffect, useState } from 'react'
import { RefreshControl, Text, FlatList, View , StyleSheet, Image} from 'react-native'

import apiMeuTime from '../../api/meuTime'

import { nomeClube } from '../../components/clubes/clubes';

import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

const Item = ({ apelido, clube, pontos, foto, posicao, scoutsGeral }) => (
  
    <View style={estilos.cartao}>
        <View style={estilos.linha}>
            <View style={estilos.imagem}>
                <Image source={{uri:foto.replace("FORMATO","140x140")}} style={estilos.fotopeq} />
            </View>
            <View style={estilos.cartaoDestaque}>
                <Text style={estilos.apelido}>{apelido}</Text>
                <Text style={estilos.posicao}>{posicao}</Text>
                <Text style={estilos.nomeclube}>{scoutsGeral}</Text>
            </View>
        </View>
        <View style={estilos.escalado}>
            <Text style={estilos.textoEscalado}>{(Math.round(pontos * 100) / 100).toFixed(2)}</Text>
        </View>
    </View>
  );

  function posicao(posicao){

    switch(posicao){
      case 1:
        return 'GOL'
      case 2:
        return 'LAT'
      case 3:
        return 'ZAG'
      case 4:
        return 'MEI'
      case 5:
        return 'ATA'
      case 6:
        return 'TEC'
      default:
        return '-'
    }
  
  }


export default function MeuTime(){

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const { scouts } = useContext(GlobalContext)
    
    
    let dadosMeuTime
    const [dadosFinal, setDadosFinal] = useState([])
    
    async function CarregaAPI(){

        dadosMeuTime = await apiMeuTime.get('')
                
        setDadosFinal(dadosMeuTime.data)
        
    }

    useEffect(() => {

        CarregaAPI();

    },[]);


    const renderItem = ({ item }) => (
        <Item apelido={item.apelido} clube={item.clube_id} pontos={retornaPonto(item.atleta_id)} foto={item.foto} posicao={posicao(item.posicao_id)} scoutsGeral={exibeScouts(item.atleta_id)} />
    );


function retornaPonto(id)
{
    //console.log(scouts[id.toString()])
    return scouts[id.toString()] === undefined ? '' : scouts[id.toString()].pontuacao
}


function exibeScouts(id){

    let retorno
    scouts[id.toString()] === undefined ? retorno = '' : JSON.stringify(scouts[id.toString()].scout) === "null" ? retorno = '' : retorno = JSON.stringify(scouts[id.toString()].scout).replace('{','').replace('}','').split('"').join(' ')

    return retorno
}

    return <>

        <View style={estilos.titulo}><Text style={estilos.tituloTexto}>Meu Time</Text></View>
        <View style={estilos.linhaespacada}>
            <Text style={estilos.subtituloTextoEsq}>Titulares</Text>
            <Text style={estilos.subtituloTexto}>Pontuação</Text>
        </View>
        <FlatList
            data={dadosFinal.atletas?.sort((a,b) => a.posicao_id-b.posicao_id)}
            renderItem={renderItem}
            keyExtractor={item => item.atleta_id}
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
        /> 
        <View style={estilos.linhaespacada}>
            <Text style={estilos.subtituloTextoEsq}>Reservas</Text>
            <Text style={estilos.subtituloTexto}>Pontuação</Text>
        </View>
        <FlatList
            data={dadosFinal.reservas?.sort((a,b) => a.posicao_id-b.posicao_id)}
            renderItem={renderItem}
            keyExtractor={item => item.atleta_id}
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
      justifyContent: "space-between",
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
  linhaespacada: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  linha:{
    flexDirection: "row",
  },
  fotopeq: {
    width:64,
    height:64,
    marginTop: 10,
  },
  imagem:{
    marginLeft: 10,
    borderRadius: 6,
    alignContent: "center",
    justifyContent: "center",
    
  },
  cartaoDestaque: {
    marginLeft:16,
    marginTop: 10,
  },
  escalado: {
    marginRight: 20,
    marginTop: 25,
  },
  textoEscalado:{
    fontWeight: 'bold',
  },
  apelido:{
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtituloTexto: {
    fontWeight:'bold',
    textAlign: 'right',
    marginRight: 10,
  },
  subtituloTextoEsq: {
    fontWeight:'bold',
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 16,
  },
  tituloTexto: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  titulo: {
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 10,
  },

});
