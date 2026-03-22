import { useState } from "react";
import { signUp } from "../supabase/auth";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!email || !password) {
      setError("All fields are requested");
      return;
    }

    const { data, error } = await signUp(username, email, password);

    if (error) {
      setError(error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at center, #1e1e1e 0%, #121212 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 6, borderRadius: 4 }}>
          <IconButton onClick={() => navigate("/")} sx={{ mb: 2 }}>
            <ArrowBackIcon />
          </IconButton>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: "primary.main",
              mb: 1,
              textAlign: "center",
            }}
          >
            GAMEVAULT
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}
          >
            Join our community
          </Typography>

          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Button
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              size="large"
              sx={{ py: 1.5, fontWeight: 700 }}
            >
              Sign Up
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Link
                  component="button"
                  onClick={() => navigate("/login")}
                  color="primary"
                  sx={{
                    fontWeight: 700,
                    textDecoration: "none",
                    verticalAlign: "baseline",
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default RegisterPage;
