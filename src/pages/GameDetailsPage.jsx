import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  Chip,
  Divider,
  Paper,
  Rating,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Language as LanguageIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { getGameBySlug } from "../supabase/games";

function GameDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      const { data, error } = await getGameBySlug(slug);
      if (error) {
        setError(error.message);
      } else {
        setGame(data);
      }
      setIsLoading(false);
    };
    fetchGame();
  }, [slug]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!game) return null;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              mb: 4,
              backgroundColor: "transparent",
            }}
          >
            <Box
              component="img"
              src={game.image_url}
              alt={game.title}
              sx={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: 4,
                display: "block",
              }}
            />
          </Paper>

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
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: "#1e1e1e",
              position: "sticky",
              top: 100,
              border: "1px solid #333",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 900, mb: 1, lineHeight: 1.2 }}
            >
              {game.title}
            </Typography>

            <Divider sx={{ mb: 3, borderColor: "#333" }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="h2" color="primary" sx={{ fontWeight: 900 }}>
                €{game.price}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<ShoppingCartIcon />}
              sx={{ py: 2, fontSize: "1.2rem", fontWeight: 800, mb: 2 }}
            >
              Buy Now
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GameDetailsPage;
