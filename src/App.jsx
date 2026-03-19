import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { theme } from "../theme";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navbar />
      </Box>
    </ThemeProvider>
  );
}

export default App;
