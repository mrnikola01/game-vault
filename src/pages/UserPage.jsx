import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, Divider } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { signOut } from "../supabase/auth";

function UserPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
          {user?.user_metadata?.full_name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Favorite Games
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No favorite games yet.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Button variant="outlined" color="error" onClick={handleSignOut}>
        Sign Out
      </Button>
    </Container>
  );
}

export default UserPage;
