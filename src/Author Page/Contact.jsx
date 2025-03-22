import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

// Image Import
import bgImage from "assets/images/examples/blog2.jpg";

function Contact() {
  return (
    <Box component="section" py={{ xs: 0, lg: 6 }}>
      <Container>
        <Grid container>
          <Card sx={{ width: "100%", borderRadius: 2, boxShadow: 3, mb: 6 }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                lg={5}
                sx={{
                  position: "relative",
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgImage})`,
                  backgroundSize: "cover",
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  p: 4,
                }}
              >
                <Box>
                  <Typography variant="h4" mb={1}>
                    Contact Information
                  </Typography>
                  <Typography variant="body2" mb={3}>
                    Fill up the form and our team will get back to you within 24 hours.
                  </Typography>
                  <Typography variant="body2" display="flex" alignItems="center" mb={1}>
                    📞 (+40) 772 100 200
                  </Typography>
                  <Typography variant="body2" display="flex" alignItems="center" mb={1}>
                    ✉️ hello@example.com
                  </Typography>
                  <Typography variant="body2" display="flex" alignItems="center">
                    📍 Dyonisie Wolf Bucharest, RO 010458
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} lg={7}>
                <Box component="form" p={3}>
                  <Typography variant="h4" mb={1}>
                    Say Hi!
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mb={3}>
                    We'd like to talk with you.
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField label="Full Name" placeholder="My name is..." variant="standard" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="What you need" placeholder="I'm looking for..." variant="standard" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Your Message"
                        placeholder="I want to say that..."
                        variant="standard"
                        fullWidth
                        multiline
                        rows={4}
                      />
                    </Grid>
                  </Grid>
                  <Box mt={3} textAlign="right">
                    <Button variant="contained" color="primary">
                      Send Message
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Container>
    </Box>
  );
}

export default Contact;
