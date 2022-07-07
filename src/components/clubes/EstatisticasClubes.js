import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import apiRodada from '../../api/rodadaAtual';


export default function EstatisticasClubes(clube){

    const [golsFeitos,setGolsFeitos] = useState(0);
    const [golsSofridos,setGolsSofridos] = useState(0);
    const [partidas, setPartidas] = useState([]);
    

    async function CarregaAPI(){
   
        let numero = 15
        const dadosPartida = await apiRodada.get(numero.toString())
        
        setPartidas(dadosPartida.data);
        console.log(JSON.stringify(dadosPartida.data.partidas[0]))
        
        
        setGolsSofridos(dadosPartida.data.partidas[0].placar_oficial_mandante);
        
    }
    
    useEffect(() => {

        CarregaAPI();
      
    },[]);

    return golsSofridos;
}
