import supabase from "./client";

export const getGames = async (search = "") => {
  let query = supabase.from("games").select("*");

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data, error } = await query;
  return { data, error };
};

export const getGameBySlug = async (slug) => {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("slug", slug)
    .single();
  return { data, error };
};

export const addFavorite = async (userId, gameId) => {
  const { data, error } = await supabase
    .from("favorites")
    .insert({ user_id: userId, game_id: gameId });
  return { data, error };
};

export const removeFavorite = async (userId, gameId) => {
  const { data, error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("game_id", gameId);
  return { data, error };
};

export const isFavorite = async (userId, gameId) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("game_id", gameId)
    .single();
  return !!data;
};

export const getFavorites = async (userId) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("*, games(*)")
    .eq("user_id", userId);
  return { data, error };
};
