import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getCart } from "../supabase/cart";

const CartContext = createContext({});

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (user) {
      getCart(user.id).then(({ data }) => {
        if (data) setCartCount(data.length);
      });
    } else {
      setCartCount(0);
    }
  }, [user]);

  const refreshCart = async () => {
    if (user) {
      const { data } = await getCart(user.id);
      if (data) setCartCount(data.length);
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
