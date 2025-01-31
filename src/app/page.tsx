"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, subDays } from "date-fns";
import Navbar from "@/components/Navbar";

interface Influencer {
  name: string;
  username: string;
  followers: number;
  trustScore: number;
  url: string;
  bio: string;
}

export default function SearchPage() {
  // const router = useRouter();
  const [username, setUsername] = useState("");
  const [date, setDate] = useState<Date | null>(subDays(new Date(), 7));
  const [loading, setLoading] = useState(false);
  const [influencer, setInfluencer] = useState<Influencer | null>(null);

  const handleSearch = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setInfluencer(null);

    try {
      // Simulated API request
      const response = await fetch(
        `/api/influencers?username=${username}&date=${format(
          date!,
          "yyyy-MM-dd"
        )}`
      );
      const data = await response.json();
      setInfluencer(data);
    } catch (error) {
      console.error("Error fetching influencer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ bgcolor: "#121212", minHeight: "100vh", color: "white" }}>
        <Navbar />
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
          }}
        >
          <Box
            sx={{
              p: 4,
              bgcolor: "#1E1E1E",
              borderRadius: 3,
              boxShadow: 4,
              width: "100%",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                mb: 3,
                color: "#00FF7F",
                fontWeight: "bold",
              }}
            >
              Find an Influencer
            </Typography>

            <TextField
              label="Username"
              fullWidth
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 3, bgcolor: "white", borderRadius: 1 }}
            />

            <DatePicker
              label="Select Date"
              value={date}
              onChange={setDate}
              minDate={subDays(new Date(), 7)}
              maxDate={new Date()}
              sx={{ width: "100%", mb: 3 }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleSearch}
              sx={{
                bgcolor: "#00FF7F",
                color: "black",
                borderRadius: 3,
                fontWeight: "bold",
              }}
            >
              Search
            </Button>
          </Box>

          {loading && <CircularProgress sx={{ mt: 4, color: "#00FF7F" }} />}

          {influencer && (
            <Box
              sx={{
                p: 3,
                bgcolor: "#1E1E1E",
                borderRadius: 3,
                boxShadow: 4,
                width: "100%",
                mt: 5,
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#00FF7F", fontWeight: "bold" }}
              >
                {influencer.name} (@{influencer.username})
              </Typography>
              <Typography>Followers: {influencer.followers}</Typography>
              <Typography>Trust Score: {influencer.trustScore}</Typography>
              <Typography>Bio: {influencer.bio}</Typography>
              <Typography>
                <a
                  href={influencer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#00FF7F" }}
                >
                  View Profile
                </a>
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </LocalizationProvider>
  );
}
