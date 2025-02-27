import { createContext , useContext} from "react";

export const context = createContext({
    Cart :[{}],
    setCart:()=>{},
    addtoCart:()=>{},
    
});

export const useCartContext=()=>{
    return useContext(context);
}
export const Provider= context.Provider;
