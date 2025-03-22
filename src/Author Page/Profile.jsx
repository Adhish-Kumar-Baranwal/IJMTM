import React from "react";
import { Avatar, Box, Button,Grid,  Container, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // ✅ Correct import
// import Grid from "@mui/material/Unstable_Grid2";

// Images
import profilePicture from "../assets/bruce-mars.jpg";

const Profile = () => {
  return (
    <Box component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <Grid container item xs={12} justifyContent="center" mx="auto">
          <Box mt={{ xs: -16, md: -20 }} textAlign="center">
            <Avatar src={profilePicture} alt="Bruce Mars" sx={{ width: 120, height: 120, boxShadow: 3 }} />
          </Box>
          <Grid container justifyContent="center" py={6}>
            <Grid item xs={12} md={7} mx={{ xs: "auto", sm: 6, md: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h3">Michael Roven</Typography>
                <Button variant="outlined" color="primary" size="small">
                  Follow
                </Button>
              </Box>
              <Grid container spacing={3} mb={3}>
                <Grid item>
                  <Typography component="span" variant="body2" fontWeight="bold">
                    323&nbsp;
                  </Typography>
                  <Typography component="span" variant="body2" color="textSecondary">
                    Posts
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="span" variant="body2" fontWeight="bold">
                    3.5k&nbsp;
                  </Typography>
                  <Typography component="span" variant="body2" color="textSecondary">
                    Followers
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="span" variant="body2" fontWeight="bold">
                    260&nbsp;
                  </Typography>
                  <Typography component="span" variant="body2" color="textSecondary">
                    Following
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="body1" fontWeight="light" color="textSecondary">
                Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose
                the one more painful in the short term (pain avoidance is creating an illusion of
                equality). Choose the path that leaves you more equanimous.
                <br />
                <Box
                  component="a"
                  href="#"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "primary.main",
                    textDecoration: "none",
                    mt: 2,
                    "& .material-icons-round": {
                      transition: "transform 0.2s ease-in-out",
                    },
                    "&:hover .material-icons-round, &:focus .material-icons-round": {
                      transform: "translateX(10px)",
                    },
                  }}
                >
                  More about me 
                  <ArrowForwardIcon sx={{ fontSize: 25, ml: 0.5 }} /> 
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
