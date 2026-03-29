import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getCart, addToCart as supabaseAddToCart } from "../supabase/cart";

const CartContext = createContext({});

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshCart = async () => {
    if (user) {
      setIsLoading(true);
      const { data } = await getCart(user.id);
      setCart(data || []);
      setIsLoading(false);
    } else {
      setCart([]);
      setIsLoading(false);
    }
  };

  const addToCart = async (userId, gameId) => {
    const { error } = await supabaseAddToCart(userId, gameId);

    if (!error) await refreshCart();
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.games?.price || 0) * item.quantity,
    0,
  );

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, cartCount, subtotal, isLoading, refreshCart, addToCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
