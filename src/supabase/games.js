import supabase from "./client";

export const getGames = async () => {
  const { data, error } = await supabase.from("games").select("*");
  return { data, error };
};
