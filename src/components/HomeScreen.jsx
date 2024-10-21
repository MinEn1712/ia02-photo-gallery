import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export default function HomeScreen() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        width: "100%",
        height: "100vh",
      }}
    >
      <Typography variant="h3" fontWeight={600} textAlign="center">
        Welcome to the Photo Gallery 📸!
      </Typography>
      <Button
        variant="contained"
        size="large"
        color="black"
        component={Link}
        to="/photos"
      >
        Click here to view photos!
      </Button>
    </div>
  );
}
