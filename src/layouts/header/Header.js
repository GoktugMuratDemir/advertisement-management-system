"use client";
import {
  Box,
  Stack,
  Button,
  Paper,
  Container,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/routes/router";
import { usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleRoute = (url) => {
    router.push(url, { scroll: false });
  };

  return (
    <Stack
      sx={{
        background: (theme) => theme.palette.grey[300],
      }}
      mb={isMobile ? 5 : 10}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent={"space-between"}
          py={2}
          height="5vh"
        >
          <Paper
            variant="elevation"
            sx={{
              background: (theme) => theme.palette.grey[500],
              height: "100%",
              width: isMobile ? 50 : 200,
              cursor: "pointer",
            }}
            onClick={() => handleRoute(routes.home)}
          />

          <Stack direction="row" spacing={isMobile ? 1 : 2}>
            <Box>
              <Button
                sx={{ height: "100%", fontSize: isMobile && 8 }}
                variant="contained"
                color="secondary"
                onClick={() => handleRoute(routes.fav_list)}
              >
                Favori Listesi
              </Button>
            </Box>
            {pathname !== routes.add_advert && (
              <Box>
                <Button
                  sx={{ height: "100%", fontSize: isMobile && 8 }}
                  variant="contained"
                  onClick={() => handleRoute(routes.add_advert)}
                >
                  Yeni İlan Ekle
                </Button>
              </Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
