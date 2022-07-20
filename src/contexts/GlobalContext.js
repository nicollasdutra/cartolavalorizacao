import React from 'react';
import { createContext, useState } from "react";

export const GlobalContext = createContext({})

export function InfoProvider( {children} ){

    const [dadosOriginal, setDadosOriginal] = useState([]);

    const [scouts, setScouts] = useState([]);

    const [statusMercado, setStatusMercado] = useState(0);

    return (
        
        <GlobalContext.Provider value={{dadosOriginal, setDadosOriginal, scouts, setScouts, statusMercado, setStatusMercado}}>
            {children}
        </GlobalContext.Provider>
    )
}