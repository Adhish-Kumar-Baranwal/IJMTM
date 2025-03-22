import React from "react";
import { Container, TextField, Button, Typography, Box, Paper, Card } from "@mui/material";
import Profile from "./Profile";
import Posts from "./Posts";
import "./Author.css";
import NavBar from "../components/NavBar/NavBar";
import HeroImg from "../assets/waves-white.svg"

const bgImage = {
  backgroundImage: `url(${HeroImg})`,
  backgroundRepeat: "repeat",
  backgroundPosition: "Bottom",
  backgroundSize: "contain",
  position: "relative",
}

const Author = () => {
  return (
    <Box component="section" style={bgImage} className="author-section" sx={{ position: "relative", overflow: "hidden" }}>
      <NavBar />
    {/* Background Image */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "250px", // Adjust height as needed
        backgroundImage: ('src/assets/bruce-mars.jpg'), // Replace with your actual image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.5)", // Optional: Darken the background image
      }}
    />

    <Container sx={{ position: "relative", zIndex: 2, mt: 8 }}>
      <Card className="author-card" sx={{ padding: 15, borderRadius: 3, boxShadow: 3 }}>
        <Profile />
        <Posts />
      </Card>

      <div className="Contactpart">
        {/* Flexbox container replacing Grid */}
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={4} mt={2}>
          {/* Left Section - Contact Info */}
          <Box flex="1" minWidth="320px" maxWidth="450px">
            <Paper elevation={3} className="contact-info">
              <Typography variant="h5" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body2">
                Fill out the form, and we’ll get back to you within 24 hours.
              </Typography>
              <Box mt={3}>
                <Typography variant="body2">📞 (+40) 772 100 200</Typography>
                <Typography variant="body2" mt={1}>✉️ hello@example.com</Typography>
                <Typography variant="body2" mt={1}>📍 Bucharest, Romania</Typography>
              </Box>
            </Paper>
          </Box>

          {/* Right Section - Contact Form */}
          <Box flex="1" minWidth="320px" maxWidth="700px">
            <Paper elevation={3} className="contact-form">
              <Typography variant="h4" gutterBottom>
                Say Hello to Author!
              </Typography>
              <Typography variant="body1" mb={2}>
                Send your feedback to the Author.
              </Typography>
              <form>
                <TextField label="Your Name" fullWidth variant="outlined" margin="normal" required />
                <TextField label="Your Email" fullWidth variant="outlined" margin="normal" required />
                <TextField
                  label="Your Message"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  margin="normal"
                  required
                />
                <Button variant="contained" color="primary">
                  Send Message
                </Button>
              </form>
            </Paper>
          </Box>
        </Box>
        </div>
      </Container>
    </Box>
  );
}

export default Author;
