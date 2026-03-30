import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import {
  getCart,
  addToCart as supabaseAddToCart,
  removeFromCart as supabaseRemove,
  updateQuantity as supabaseUpdate,
} from "../supabase/cart";

const CartContext = createContext({});

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshCart = useCallback(
    async (showLoading = true) => {
      if (user) {
        if (showLoading) setIsLoading(true);
        const { data } = await getCart(user.id);
        setCart(data || []);
        setIsLoading(false);
      } else {
        setCart([]);
        setIsLoading(false);
      }
    },
    [user],
  );

  const addToCart = async (gameId) => {
    if (!user) return;
    const { error } = await supabaseAddToCart(user.id, gameId);

    if (!error) await refreshCart(false);
  };

  const removeFromCart = async (gameId) => {
    if (!user) return;
    const { error } = await supabaseRemove(user.id, gameId);

    if (!error) await refreshCart(false);
  };

  const updateQuantity = async (gameId, newQty) => {
    if (!user) return;
    const { error } = await supabaseUpdate(user.id, gameId, newQty);

    if (!error) await refreshCart(false);
  };

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.games?.price || 0) * item.quantity,
    0,
  );

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        isLoading,
        refreshCart,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
