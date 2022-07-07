import React from 'react';
import { Text } from 'react-native';

import EstatisticasClubes from '../../components/clubes/EstatisticasClubes';

export default function Estatisticas(){

    return <>
    
        <Text>{EstatisticasClubes(5)}</Text>
        <Text>{EstatisticasClubes(4)}</Text>
        <Text>{EstatisticasClubes(3)}</Text>
    </>
}