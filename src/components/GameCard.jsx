import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

function GameCard({ title, price, image }) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, px: 2 }}>
        <Typography
          variant="h6"
          sx={{
            mt: 0.5,
            mb: 1,
            fontSize: "1rem",
            lineHeight: 1.2,
            height: "2.4em",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>

        <Typography variant="h5" color="primary" sx={{ fontWeight: 800 }}>
          €{price}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default GameCard;
