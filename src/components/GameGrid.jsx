import { useState, useEffect } from "react";
import { Grid, Container } from "@mui/material";
import { getGames } from "../supabase/games";
import GameCard from "./GameCard";

function GameGrid() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await getGames();
      if (error) {
        setError(error.message);
      } else {
        setGames(data);
      }
      setIsLoading(false);
    };
    fetchGames();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
            <GameCard
              title={game.title}
              price={game.price}
              image={game.image_url}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default GameGrid;
