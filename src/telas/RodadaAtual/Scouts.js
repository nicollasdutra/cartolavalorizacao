import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';

import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";


import { nomeClube, imagemClube } from '../../components/clubes/clubes';

export default function Scouts()
{
    
    const { dadosOriginal, scouts, statusMercado } = useContext(GlobalContext)


    const navigation = useNavigation();

    const Item = ({ apelido, foto, pontuacao, posicao, scoutsgeral }) => (
  
        <View style={estilos.cartao} >
            <View style={estilos.imagem}>
              <Image source={{uri:foto.replace("FORMATO","140x140")}} style={estilos.fotopeq} />
            </View>
            <View style={estilos.informacoes}>
              <View>
              <View style={estilos.nome}>
                <Text>{apelido}</Text>
              </View>
              <View>
              <Text style={estilos.posicao}>{posicao}</Text>
              </View>
              <View>
                <Text style={estilos.scouts}>{scoutsgeral}</Text>
              </View>
              </View>
              <View>
                <View style={estilos.linhaespacada}>
                    <Text style={estilos.valorMedia}>{(Math.round(pontuacao * 100) / 100).toFixed(2)}</Text>
                </View>
              </View>
            </View>
        </View>
      );

    const route = useRoute();
    
    const [scoutsFiltradoMand,setScoutsFiltradoMand] = useState([])
    const [scoutsFiltradoVisit,setScoutsFiltradoVisit] = useState([])
    
    const [mandante,setMandante] = useState('')
    const [visitante,setVisitante] = useState('')
    
    const [atualiza, setAtualiza] = useState(0)
    
    
    useEffect(() => {
        
        atualiza === 0 ? setAtualiza(atualiza + 1) : setAtualiza(1)

        setMandante(route.params.mandante)
        setVisitante(route.params.visitante)

        setScoutsFiltradoMand(dadosOriginal.atletas.filter((item) => item.clube_id === mandante))
        setScoutsFiltradoVisit(dadosOriginal.atletas.filter((item) => item.clube_id === visitante))

       
    }, [atualiza]);

    function exibeScouts(scoutsgeral){

        let retorno
        scoutsgeral === "null" ? retorno = '' : retorno = scoutsgeral.toString().replace('{','').replace('}','').split('"').join(' ')

        return retorno
    }

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

   

    const renderItem = ({ item }) => (

        

        scouts[item.atleta_id] 
        ? 
            <Item apelido={scouts[item.atleta_id].apelido} posicao={posicao(item.posicao_id)} foto={scouts[item.atleta_id].foto} pontuacao={scouts[item.atleta_id].pontuacao} scoutsgeral={exibeScouts(JSON.stringify(scouts[item.atleta_id].scout))} />
        : 
            <></>
        
    );

    function RenderizaBotao(){

      return <> <TouchableOpacity onPress={() => navigation.goBack()}><Text style={estilos.voltar}>Voltar</Text></TouchableOpacity></>
    }
    function RenderizaTela(){

      return <>
        {RenderizaBotao()}

        <View style={estilos.linhaespacada}>
        <View style={estilos.linha}>
            <Image source={imagemClube(mandante)} style={estilos.clubefiltro}/>
            <Text style={estilos.titulotextoCima}>{nomeClube(mandante)}</Text>
        </View>
        <Text style={estilos.textoParcial}>Pontuação Parcial</Text>
        </View>
        <FlatList style={estilos.touch}
            data={scoutsFiltradoMand}
            renderItem={renderItem}
            keyExtractor={item => item.atleta_id}
        /> 

        <View style={estilos.linhaespacada}>
        <View style={estilos.linha}>
            <Image source={imagemClube(visitante)} style={estilos.clubefiltro}/>
            <Text style={estilos.titulotextoCima}>{nomeClube(visitante)}</Text>
        </View>
            <Text style={estilos.textoParcial}>Pontuação Parcial</Text>
        </View>

        <FlatList style={estilos.touch}
            data={scoutsFiltradoVisit}
            renderItem={renderItem}
            keyExtractor={item => item.atleta_id}
        /> 
    

    </>

    }

    {statusMercado === 1 ? RenderizaBotao() : RenderizaTela() }


    

}


const estilos = StyleSheet.create({
    tela: {
      flex: 1,
      marginTop: 16,
      backgroundColor: "#F6F6F6",
    },
    touch:{
        backgroundColor: '#F6F6F6',
        marginVertical:4,
        marginHorizontal: 6,
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
      cartao:{
        backgroundColor: '#F6F6F6',
        flexDirection: "row",
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
    marginVertical: 6,
    marginRight:6,
    backgroundColor: "#F6F6F6",
  },
  nome:{
    flexDirection:"row",
    justifyContent: "space-between",
  },
  posicao:{
    marginRight:5,
    fontWeight: "bold"
  },
  minimo:{
    
  },
  voltar:{
    fontSize:14,
    fontWeight:"bold",
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    width: '100%',
    textAlign: 'center'
  },
  scouts:{
    fontSize: 12,
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
    marginBottom:8,
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
    width:40,
    height:40,
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
  clubefiltro:{
    marginLeft:22,
    marginRight:22,
    width:36,
    height:36,
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
  linha: {
    flexDirection: "row",
    marginBottom: 6,
    marginTop: 6,
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
    fontSize: 14,
  },
  textoParcial:{
    alignItems:"center",
    textAlign:"center",
    marginBottom:4,
    marginTop:12,
    marginRight: 12,
    fontSize: 14,
  },
  scrollView: {
    height: 400,
  },
  jogos:{
    alignItems:"flex-end",
    marginTop:16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width:"50%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 6,
    elevation: 2,
    marginTop:10,
    marginBottom:10,
  },
  buttonClose: {
    backgroundColor: "#9C27B0",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginTop: 6,
    textAlign: "center",
  },
  modalTextBold: {
    marginTop: 6,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  }
  })