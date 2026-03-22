import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { theme } from "./theme";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import GameDetailsPage from "./pages/GameDetailsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box
          sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games/:slug" element={<GameDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
