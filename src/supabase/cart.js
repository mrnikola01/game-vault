import supabase from "./client";

export const getCart = async (userId) => {
  const { data, error } = await supabase
    .from("cart")
    .select("*, games(*)")
    .eq("user_id", userId);
  return { data, error };
};

export const addToCart = async (userId, gameId) => {
  const { data: existing } = await supabase
    .from("cart")
    .select("id, quantity")
    .eq("user_id", userId)
    .eq("game_id", gameId)
    .single();

  if (existing) {
    const { data, error } = await supabase
      .from("cart")
      .update({ quantity: existing.quantity + 1 })
      .eq("id", existing.id);
    return { data, error };
  } else {
    const { data, error } = await supabase
      .from("cart")
      .insert({ user_id: userId, game_id: gameId, quantity: 1 });
    return { data, error };
  }
};

export const removeFromCart = async (userId, gameId) => {
  const { data, error } = await supabase
    .from("cart")
    .delete()
    .eq("user_id", userId)
    .eq("game_id", gameId);
  return { data, error };
};

export const updateQuantity = async (userId, gameId, quantity) => {
  const { data, error } = await supabase
    .from("cart")
    .update({ quantity })
    .eq("user_id", userId)
    .eq("game_id", gameId);
  return { data, error };
};
