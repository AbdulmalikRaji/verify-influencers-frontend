import { AppBar, Toolbar, Typography } from "@mui/material";
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
      </Toolbar>
    </AppBar>
  );
}
