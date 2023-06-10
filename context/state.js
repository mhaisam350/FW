import { useState, createContext, useContext } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
    
    const [cartId, setCartId] = useState(null);
    const [isToggled, setIsToggled] = useState(false);
    
    return (

        <AppContext.Provider value={{ cartId, setCartId, isToggled, setIsToggled }}>
            { children }
        </AppContext.Provider>

    );

}

export function useAppContext() {
    return useContext(AppContext);
}