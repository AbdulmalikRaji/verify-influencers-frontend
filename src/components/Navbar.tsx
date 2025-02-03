import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link"; // Import Link from next/link

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: "#1E1E1E", boxShadow: 3 }}>
      <Toolbar>
        <Link href="/" passHref>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, color: "#00FF7F", fontWeight: "bold", cursor: "pointer" }}
          >
            Verify Influencers
          </Typography>
        </Link>
        <Box sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}>
          <Link href="/leaderboard" passHref>
            <Button
              variant="outlined"
              sx={{
                color: "#00FF7F",
                borderColor: "#00FF7F",
                fontWeight: "bold",
                borderRadius: 2,
                padding: "6px 16px",
                "&:hover": {
                  backgroundColor: "#00FF7F",
                  color: "#1E1E1E",
                },
              }}
            >
              Influencer Leaderboard
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
