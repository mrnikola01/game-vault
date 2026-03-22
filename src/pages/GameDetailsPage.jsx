import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import {
  getGameBySlug,
  addFavorite,
  removeFavorite,
  isFavorite,
} from "../supabase/games";

function GameDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [favorited, setFavorited] = useState(false);

  const {
    data: game,
    isLoading,
    error,
  } = useFetch(() => getGameBySlug(slug), [slug]);

  useEffect(() => {
    if (user && game) {
      isFavorite(user.id, game.id).then((result) => setFavorited(result));
    }
  }, [user, game]);

  const handleFavorite = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (favorited) {
      await removeFavorite(user.id, game.id);
      setFavorited(false);
    } else {
      await addFavorite(user.id, game.id);
      setFavorited(true);
    }
  };

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );

  if (error) return <p>Error: {error}</p>;
  if (!game) return null;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            component="img"
            src={game.image_url}
            alt={game.title}
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 4,
              display: "block",
              mb: 4,
            }}
          />
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
            About the game
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", lineHeight: 1.8, mb: 4 }}
          >
            {game.description}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ position: "sticky", top: 100 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 900, mb: 1, lineHeight: 1.2 }}
            >
              {game.title}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Typography
              variant="h2"
              color="primary"
              sx={{ fontWeight: 900, mb: 4 }}
            >
              €{game.price}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<ShoppingCartIcon />}
              sx={{ py: 2, fontSize: "1.2rem", fontWeight: 800 }}
            >
              Buy Now
            </Button>

            <Button
              variant={favorited ? "contained" : "outlined"}
              fullWidth
              size="large"
              startIcon={<FavoriteIcon />}
              onClick={handleFavorite}
              sx={{ py: 2, fontSize: "1.2rem", fontWeight: 800, mt: 2 }}
            >
              {favorited ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GameDetailsPage;
