import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function AdvertNotFound() {
  return (
    <Card elevation={3} sx={{mb:5}}>
      <CardMedia
        component="img"
        height="100%"
        // sx={{maxHeight: 300}}
        image="/assets/empty_illustration.png"
        alt="Product Not Found"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          Sorry, No Advert Found Matching Your Criteria!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          We couldnt find any adverts that match your criteria. Please try
          another product.
        </Typography>
      </CardContent>
    </Card>
  );
}
