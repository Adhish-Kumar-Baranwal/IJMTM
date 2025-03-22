import React from "react";
import { Box, Container, Grid, Typography, Button, Card, CardMedia, CardContent } from "@mui/material";

// Images
import post1 from "../assets/ai.jpg";
import post2 from "../assets/Devops.jpg";
import post3 from "../assets/neural-link.jpg";
import post4 from "../assets/neural-link-2.jpg";

const blogPosts = [
  {
    image: post1,
    title: "Paper Artificial Intelligence ",
    description:
      "If you’ve ever wanted to train a machine learning model and integrate it with IFTTT, you now can with ...",
    // route: "/pages/blogs/author",
  },
  {
    image: post2,
    title: "Paper on Devops",
    description:
      "If you’ve ever wanted to train a machine learning model and integrate it with IFTTT, you now can with ...",
    // route: "/pages/blogs/author",
  },
  {
    image: post3,
    title: "Paper on Neural Linking",
    description:
      "If you’ve ever wanted to train a machine learning model and integrate it with IFTTT, you now can with ...",
    // route: "/pages/blogs/author",
  },
  {
    image: post4,
    title: "Paper on Machine Learning",
    description:
      "If you’ve ever wanted to train a machine learning model and integrate it with IFTTT, you now can with ...",
    // route: "/pages/blogs/author",
  },
];

function Posts() {
  return (
    <Box component="section" py={2}>
      <Container>
        <Grid container item xs={12} lg={6}>
          <Typography variant="h3" mb={6}>
            Check my latest Publishes
          </Typography>
        </Grid>
        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card>
                <CardMedia component="img" height="140" className="posts-image" image={post.image} alt={post.title} />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.description}
                  </Typography>
                  <Button variant="contained" color="primary" size="small" href={post.route} sx={{ mt: 2 }}>
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Posts;
