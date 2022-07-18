import React from 'react';
import { createContext, useState } from "react";

export const GlobalContext = createContext({})

export function InfoProvider( {children} ){

    const [dadosOriginal, setDadosOriginal] = useState([]);

    const [scouts, setScouts] = useState([]);

    return (
        
        <GlobalContext.Provider value={{dadosOriginal, setDadosOriginal, scouts, setScouts}}>
            {children}
        </GlobalContext.Provider>
    )
}