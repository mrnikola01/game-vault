import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { signOut } from "../supabase/auth";
import { getFavorites } from "../supabase/games";
import GameCard from "../components/GameCard";

function UserPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      getFavorites(user.id).then(({ data }) => {
        if (data) setFavorites(data);
      });
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
            {user?.user_metadata?.full_name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/admin")}
          >
            Admin Panel
          </Button>

          <Button variant="outlined" color="error" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Box>
      </Box>
      <Divider sx={{ mb: 4 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Favorite Games
        </Typography>
        {favorites.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No favorite games yet.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {favorites.map((fav) => (
              <Grid size={{ xs: 12, sm: 6 }} key={fav.id}>
                <GameCard
                  title={fav.games.title}
                  price={fav.games.price}
                  image={fav.games.image_url}
                  slug={fav.games.slug}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default UserPage;
