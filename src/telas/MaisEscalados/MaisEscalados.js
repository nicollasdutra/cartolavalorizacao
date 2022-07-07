import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, FlatList, View, Image } from 'react-native';

import apiMaisEscalados from '../../api/maisEscalados';

import { nomeClube, imagemClube } from '../../components/clubes/clubes';

const Item = ({ apelido, clube, escalacoes, foto, posicao }) => (
  
    <View style={estilos.cartao}>
        <View style={estilos.linha}>
            <View style={estilos.imagem}>
                <Image source={{uri:foto.replace("FORMATO","140x140")}} style={estilos.fotopeq} />
            </View>
            <View style={estilos.cartaoDestaque}>
                <Text style={estilos.apelido}>{apelido}</Text>
                <Text style={estilos.posicao}>{posicao}</Text>
                <Text style={estilos.nomeclube}>{nomeClube(clube)}</Text>
            </View>
        </View>
        <View style={estilos.escalado}>
            <Text style={estilos.textoEscalado}>{escalacoes}</Text>
        </View>
    </View>
  );

export default function MaisEscalados(){

    const [destaques, setDestaques] = useState([]);

    async function CarregaAPI(){

        const dadosDestaque = await apiMaisEscalados.get('')
        setDestaques(dadosDestaque.data);
        
    }

    useEffect(() => {
        CarregaAPI();

    },[]);


    const renderItem = ({ item }) => (
        <Item apelido={item.Atleta.apelido} clube={item.clube_id} escalacoes={item.escalacoes} foto={item.Atleta.foto} posicao={item.posicao_abreviacao} />
    );

    return <>

        <View style={estilos.titulo}><Text style={estilos.tituloTexto}>Mais escalados da rodada</Text></View>
        <Text style={estilos.subtituloTexto}>Num. de escalações</Text>
        <FlatList
            data={destaques}
            renderItem={renderItem}
            keyExtractor={item => item.Atleta.atleta_id}
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
