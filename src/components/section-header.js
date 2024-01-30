"use client"
import { Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";

export default function SectionHeader({ props }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  // console.log("isMobile : ",isMobile);
  return (
    <Stack spacing={2} mb={2}>
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isMobile ? "flex-start" : "center"}
        spacing={isMobile ? 2 : 0}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle1" fontWeight="bold">
            {props?.title}
          </Typography>
          <Typography variant="subtitle1">{props?.subtitle}</Typography>
        </Stack>
        {props.rightSide && <Stack>{props.rightSide}</Stack>}
      </Stack>
      <Divider variant="fullWidth" />
    </Stack>
  );
}
