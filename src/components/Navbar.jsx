import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Container,
  TextField,
  CircularProgress,
  Autocomplete,
} from "@mui/material";

import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getGames } from "../supabase/games";

function Navbar() {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value) => {
    if (!value) {
      setOptions([]);
      return;
    }

    setLoading(true);

    const { data } = await getGames(value);

    setOptions(data || []);
    setLoading(false);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#121212",
        borderBottom: "1px solid #333",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ px: 3, flexWrap: "wrap" }}>
          <Typography
            variant="h5"
            onClick={() => navigate("/")}
            sx={{
              fontWeight: 900,
              color: "primary.main",
              letterSpacing: "-1px",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            GameVault
          </Typography>

          <Autocomplete
            freeSolo
            options={options}
            getOptionLabel={(option) => option.title || ""}
            loading={loading}
            onInputChange={(event, value) => handleSearch(value)}
            onChange={(event, value) => {
              if (value?.slug) {
                navigate(`/games/${value.slug}`);
              }
            }}
            sx={{
              ml: { xs: 0, sm: 3 },
              mt: { xs: 1, sm: 0 },
              width: { xs: "100%", sm: "250px", md: "400px" },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search for games..."
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 1,
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                      {params.InputProps.startAdornment}
                    </>
                  ),
                  endAdornment: (
                    <>
                      {loading && <CircularProgress size={20} />}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />

          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
          <IconButton color="inherit">
            <PersonIcon onClick={() => navigate(`/login`)} />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
