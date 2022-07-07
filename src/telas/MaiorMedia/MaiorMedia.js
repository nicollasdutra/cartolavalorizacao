import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View,FlatList, Image, TouchableOpacity, ScrollView  } from 'react-native';

import apiMercado from '../../../src/api/mercadoApi';

import { nomeClube } from '../../components/clubes/clubes';

import palmeiras from '../../../src/assets/275.png';
import flamengo from '../../../src/assets/262.png';
import botafogo from '../../../src/assets/263.png';
import corinthians from '../../../src/assets/264.png';
import fluminense from '../../../src/assets/266.png';
import saopaulo from '../../../src/assets/276.png';
import santos from '../../../src/assets/277.png';
import bragantino from '../../../src/assets/280.png';
import atleticomg from '../../../src/assets/282.png';
import internacional from '../../../src/assets/285.png';
import juventude from '../../../src/assets/286.png';
import goias from '../../../src/assets/290.png';
import atleticopr from '../../../src/assets/293.png';
import coritiba from '../../../src/assets/294.png';
import avai from '../../../src/assets/314.png';
import americamg from '../../../src/assets/327.png';
import ceara from '../../../src/assets/354.png';
import fortaleza from '../../../src/assets/356.png';
import atleticogo from '../../../src/assets/373.png';
import cuiaba from '../../../src/assets/1371.png';


import checkok from '../../../src/assets/check.png';


const Item = ({ foto, clube, provavel, posicao, nome, minValorizar, media, jogos }) => (
  
  <TouchableOpacity style={estilos.cartao}>
      <View style={estilos.imagem}>
        <Image source={{uri:foto.replace("FORMATO","140x140")}} style={estilos.fotopeq} />
      </View>
      <View style={estilos.informacoes}>
        <View>
        <View style={estilos.nome}>
          
          <Text>{nome}</Text>
          <View>{provavel==7 ? <Image style={estilos.provavel} source={checkok} /> : <Text></Text>}</View>
        </View>
        <View>
        <Text style={estilos.posicao}>{posicao}</Text>
        </View>
        <View>
          <Text>{clube}</Text>
        </View>
        </View>
        <View>
          <View style={estilos.linhaespacada}>
            <Text style={estilos.valorMedia}>{(Math.round(media * 100) / 100).toFixed(2)}</Text>
            <Text style={estilos.minimo}>{(Math.round(minValorizar * 100) / 100).toFixed(2)}</Text>
          </View>
          <View style={estilos.jogos}>
            <Text>{jogos} jogos</Text>
          </View>
        </View>
      </View>
  </TouchableOpacity>
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

export default function MaiorMedia()
{

  const [dados, setDados] = useState([]);
  
  const [timeEscolhido, setTimeEscolhido] = useState(0);

  const [vPosicao, setvPosicao] = useState(0);

  async function CarregaAPI(){

    
    const idClubeFiltrado = timeEscolhido > 1 ? timeEscolhido.toString() : ''

    const teste = await apiMercado.get(idClubeFiltrado)
    
    setDados(teste.data);


    
  }

  useEffect(() => {

  CarregaAPI();

},[timeEscolhido]);

useEffect(() => {

  CarregaAPI();

},[]);


async function CarregaClubeFiltro(id){
  await CarregaAPI(id);
}


const renderItem = ({ item }) => (

  item.status_id == 7 ?

    vPosicao > 0  ?

      item.posicao_id == vPosicao ?
        <Item foto={item.foto} clube={nomeClube(item.clube_id)} provavel={item.status_id} posicao={posicao(item.posicao_id)} nome={item.apelido} minValorizar={item.minimo_para_valorizar} media={item.media_num} jogos={item.jogos_num}/>
      :
      <></>
    :
    <Item foto={item.foto} clube={nomeClube(item.clube_id)} provavel={item.status_id} posicao={posicao(item.posicao_id)} nome={item.apelido} minValorizar={item.minimo_para_valorizar} media={item.media_num} jogos={item.jogos_num}/>
 
  : <></>
);




    return <>

        <ScrollView style={estilos.scrollView}>
          <Text style={estilos.titulotextoCima}>Posições</Text>
          <View style={estilos.posicoes}>
            <TouchableOpacity style={estilos.botaoPosicao} onPress={() => setvPosicao(0)}><Text style={estilos.textoPosicao}>TODOS</Text></TouchableOpacity>
            <TouchableOpacity style={estilos.botaoPosicao} onPress={() => setvPosicao(1)}><Text style={estilos.textoPosicao}>GOL</Text></TouchableOpacity>
            <TouchableOpacity style={estilos.botaoPosicao} onPress={() => setvPosicao(2)}><Text style={estilos.textoPosicao}>LAT</Text></TouchableOpacity>
            <TouchableOpacity style={estilos.botaoPosicao} onPress={() => setvPosicao(3)}><Text style={estilos.textoPosicao}>ZAG</Text></TouchableOpacity>
            <TouchableOpacity style={estilos.botaoPosicao} onPress={() => setvPosicao(4)}><Text style={estilos.textoPosicao}>MEI</Text></TouchableOpacity>
            <TouchableOpacity style={estilos.botaoPosicao} onPress={() => setvPosicao(5)}><Text style={estilos.textoPosicao}>ATA</Text></TouchableOpacity>
            <TouchableOpacity style={estilos.botaoPosicao} onPress={() => setvPosicao(6)}><Text style={estilos.textoPosicao}>TEC</Text></TouchableOpacity>
          </View>
          <Text style={estilos.titulotextoCima}>Clubes</Text>
          <View style={estilos.filtro}>
            <TouchableOpacity style={estilos.botaotodos} onPress={() => setTimeEscolhido(1)}><Text style={estilos.textotodos}>Todos</Text></TouchableOpacity>
          </View>
          
          
          <View style={estilos.filtroGeral}>
            <View style={estilos.filtro}>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(327)}><Image source={americamg} style={estilos.clubefiltro} /></TouchableOpacity>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(293)}><Image source={atleticopr} style={estilos.clubefiltro} /></TouchableOpacity>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(373)}><Image source={atleticogo} style={estilos.clubefiltro}/></TouchableOpacity>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(282)}><Image source={atleticomg} style={estilos.clubefiltro}/></TouchableOpacity>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(314)}><Image source={avai} style={estilos.clubefiltro}/></TouchableOpacity>
            </View>
            <View style={estilos.filtro}>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(263)}><Image source={botafogo} style={estilos.clubefiltro}/></TouchableOpacity>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(280)}><Image source={bragantino} style={estilos.clubefiltro}/></TouchableOpacity>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(354)}><Image source={ceara} style={estilos.clubefiltro}/></TouchableOpacity>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(264)}><Image source={corinthians} style={estilos.clubefiltro}/></TouchableOpacity>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(294)}><Image source={coritiba} style={estilos.clubefiltro}/></TouchableOpacity>
            </View>
            <View style={estilos.filtro}>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(1371)}><Image source={cuiaba} style={estilos.clubefiltro}/></TouchableOpacity>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(262)}><Image source={flamengo} style={estilos.clubefiltro}/></TouchableOpacity>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(266)}><Image source={fluminense} style={estilos.clubefiltro}/></TouchableOpacity>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(356)}><Image source={fortaleza} style={estilos.clubefiltro}/></TouchableOpacity>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(290)}><Image source={goias} style={estilos.clubefiltro}/></TouchableOpacity>
            </View>
            <View style={estilos.filtro}>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(285)}><Image source={internacional} style={estilos.clubefiltro}/></TouchableOpacity>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(286)}><Image source={juventude} style={estilos.clubefiltro}/></TouchableOpacity>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(275)}><Image source={palmeiras} style={estilos.clubefiltro}/></TouchableOpacity>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(277)}><Image source={santos} style={estilos.clubefiltro}/></TouchableOpacity>
            <TouchableOpacity style={estilos.botaofiltro} onPress={() => setTimeEscolhido(276)}><Image source={saopaulo} style={estilos.clubefiltro}/></TouchableOpacity>
            </View>
          </View>
          </ScrollView>


          <View style={estilos.titulo}>
            <View style={estilos.subtitulo}>
              <Image style={estilos.provavel} source={checkok} />
              <Text>Provável</Text>
            </View>
            <View style={estilos.linhaespacada}>
              <Text style={estilos.textoMedia}>Média</Text>
              <Text style={estilos.titulotexto}>Min. valorizar</Text>
            </View>
          </View>


          <FlatList
            data={dados.atletas?.sort((a,b) => b.media_num-a.media_num)}
            renderItem={renderItem}
            keyExtractor={item => item.atleta_id}
          /> 


    </>
}



const estilos = StyleSheet.create({
    tela: {
      flex: 1,
      marginTop: 16,
    },
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
  informacoes:{
    flex:1,
    flexDirection:"row",
    justifyContent: "space-between",
    marginLeft:8,
    marginVertical: 16,
    marginRight:16,
  },
  nome:{
    flexDirection:"row",
    justifyContent: "space-between"
  },
  posicao:{
    marginRight:5,
    fontWeight: "bold"
  },
  minimo:{
    
  },
  titulo:{
    flexDirection: "row",
    marginTop:10,
    marginLeft:10,
    marginBottom:10,
    marginRight:10,
    justifyContent: "space-between"
    },
    titulotexto:{
      
    },
    provavel:{
      width:16,
      height:16,
      marginLeft: 10
  },
  subtitulo:{
    flexDirection: "row",
  },
  filtro: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:16,
    marginBottom:15,
    marginRight: 16,
  },
  filtroGeral:{
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clubefiltro:{
    marginLeft:22,
    marginRight:22,
  },
  botaofiltro:{
    //elevation: 4, //para colocar sombra - somente android
  
    //para IOS a sombra é os itens até o final (shadowRadius)
    shadowColor: '#000',
    shadowOffset:{
        width: 0,
        height:2, 
    },
    shadowOpacity: 0.23,
    shadowRadius:2.62,
  },
  fotopeq: {
    width:48,
    height:48,
  },
  botaotodos: {
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
    alignSelf: 'center'
  },
  textotodos: {
    marginRight:'5%',
    marginLeft:'5%',
    marginBottom:5,
    marginTop: 5,
    width: '90%',
    textAlign:"center",
    alignSelf: 'center'
  },
  botaoPosicao: {
    backgroundColor: '#F6F6F6',
    marginVertical:4,
    marginHorizontal: 11,
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
    alignSelf: 'center',
    
  },
  textoPosicao: {
    marginLeft:4,
    marginRight:4,
    marginTop:4,
    marginBottom:4,

  },
  linhaespacada: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textoMedia:{
    marginRight:10,
    fontWeight: "bold",
  },
  valorMedia:{
    marginRight:50,
    fontWeight: "bold",
  },
  posicoes:{
    flexDirection: "row",
    alignItems: "center",
  },
  titulotextoCima:{
    fontWeight:"bold",
    alignItems:"center",
    textAlign:"center",
    marginBottom:4,
    marginTop:4,
  },
  scrollView: {
    height: 400,
  },
  jogos:{
    alignItems:"flex-end",
    marginTop:16,
  }
})