import React, {  createContext, useState ,useContext, useEffect} from 'react'
export const CartContextProvider=createContext()
const CartContext = ({children}) => {
    const[cart,setCart]=useState([])
    useEffect(()=>{
const existingCartitem=localStorage.getItem('cart')
if(existingCartitem){
  setCart(JSON.parse(existingCartitem))
}
    },[])
  return (
    <div>
        <CartContextProvider.Provider value={[cart,setCart]}>
            {children}
        </CartContextProvider.Provider>
    </div>
  )
}
const useCart = () => useContext(CartContextProvider);

export { useCart};
export default CartContext