import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: "#1E1E1E", boxShadow: 3 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#00FF7F", fontWeight: "bold" }}>
          Verify Influencers
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
