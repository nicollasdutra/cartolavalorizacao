import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import apiRodada from '../../api/rodadaAtual';

import apiStatus from '../../api/status';

import { imagemClube } from './clubes';

export default function EstatisticasClubes(clube, casa){


    const [golsFeitos,setGolsFeitos] = useState(0);
    const [golsSofridos,setGolsSofridos] = useState(0);
    const [mediaGolMarcado,setmediaGolMarcado] = useState(0);
    const [mediaGolSofrido,setmediaGolSofrido] = useState(0);

    async function CarregaAPI(){
   
        let rodada = 0
        let vpartidas
        let existe = false
        let dadosPartida
        let totalgolsfeitos = 0
        let totalgolssofridos = 0
        let totalpartidascontadas = 0
        let continuawhile = true
        let mediagolsofrido = 0
        let mediagolmarcado = 0

        const dadosStatus = await apiStatus.get()
        rodada = dadosStatus.data.rodada_atual
               
        while(continuawhile === true)
        {
            rodada = (rodada - 1) === 0 ? 1 : (rodada - 1)

            dadosPartida = await apiRodada.get(rodada.toString())
        
            vpartidas = dadosPartida.data.partidas;

            if(casa){
                existe = vpartidas.some((item) => item.clube_casa_id === clube)
            
                if(existe)
                {
                    totalgolsfeitos = totalgolsfeitos + vpartidas.find((item) => item.clube_casa_id === clube).placar_oficial_mandante
                    totalgolssofridos = totalgolssofridos + vpartidas.find((item) => item.clube_casa_id === clube).placar_oficial_visitante

                    totalpartidascontadas = totalpartidascontadas + 1
                }
            }else
            {
                existe = vpartidas.some((item) => item.clube_visitante_id === clube)
            
                if(existe)
                {
                    totalgolsfeitos = totalgolsfeitos + vpartidas.find((item) => item.clube_visitante_id === clube).placar_oficial_visitante
                    totalgolssofridos = totalgolssofridos + vpartidas.find((item) => item.clube_visitante_id === clube).placar_oficial_mandante

                    totalpartidascontadas = totalpartidascontadas + 1
                }
            }

            if(totalpartidascontadas === 3)
            {
                continuawhile = false
            }

            if(rodada === 1)
            {
                continuawhile=false
            }

        }

        mediagolmarcado = totalgolsfeitos / totalpartidascontadas
        mediagolsofrido = totalgolssofridos / totalpartidascontadas
            
        
        setGolsFeitos(totalgolsfeitos);
        setGolsSofridos(totalgolssofridos);
        setmediaGolMarcado(mediagolmarcado);
        setmediaGolSofrido(mediagolsofrido);

    }
    
    useEffect(() => {

        CarregaAPI();
      
    },[]);

    return <>
    
    <View style={estilos.clube}>
        <View style={estilos.linha}>
            <Image source={imagemClube(clube)} style={estilos.clubefiltro}/>
            <View style={estilos.coluna}>
                <Text style={estilos.texto}>marcados: {golsFeitos}</Text>
                <Text>Média: {(Math.round(mediaGolMarcado * 100) / 100).toFixed(2)}</Text>
                <Text style={estilos.texto}>sofridos: {golsSofridos}</Text>
                <Text>Média: {(Math.round(mediaGolSofrido * 100) / 100).toFixed(2)}</Text>
            </View>
        </View>
    </View>
    
    </>
}


const estilos = StyleSheet.create({
    clube:{
        marginTop:6,
        marginLeft:6,
        marginBottom:6,
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
  linha:{
    flexDirection: "row",
    alignItems:"center",
  },
  coluna:{
    flexDirection: "column",
  },
  clubefiltro:{
    marginLeft:10,
    marginRight:10,
    width:36,
    height:36,
  },
  texto:{
    fontSize:14,
    fontWeight:"bold",
    textAlignVertical:"center",
    
  },
})  