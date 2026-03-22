import { useNavigate } from "react-router-dom";
import { Container, Paper, Typography, Button } from "@mui/material";
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
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
          {user?.user_metadata?.full_name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {user?.email}
        </Typography>
        <Button variant="outlined" color="error" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Paper>
    </Container>
  );
}

export default UserPage;
