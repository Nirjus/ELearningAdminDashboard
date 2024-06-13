import React,{ReactNode} from "react";
import { Provider } from "react-redux";
import {Store} from "@/redux/Store";

interface ProviderProps {
    children: ReactNode;
}

export function Providers({children}: ProviderProps){
    return (
        <Provider store={Store}>
        {children}
        </Provider>
    )
} 