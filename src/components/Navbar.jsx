import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

function Navbar() {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar sx={{ px: 3, flexWrap: "wrap" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              color: "primary.main",
              letterSpacing: "-1px",
              textTransform: "uppercase",
            }}
          >
            GameVault
          </Typography>

          <TextField
            placeholder="Search for games..."
            size="small"
            sx={{
              ml: { xs: 0, sm: 3 },
              mt: { xs: 1, sm: 0 },
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 1,
              width: { xs: "100%", sm: "250px", md: "400px" },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
          <IconButton color="inherit">
            <PersonIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
