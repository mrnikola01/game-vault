import supabase from "./client";

export const getGames = async () => {
  const { data, error } = await supabase.from("games").select("*");
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
