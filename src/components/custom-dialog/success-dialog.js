import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";
import Iconify from "../iconify";

const AnimatedDialogContent = animated(DialogContent);

export default function SuccessDialog({ open, onClose, ...other }) {
  const fadeIn = useSpring({
    opacity: open ? 1 : 0,
    transform: open ? "translateY(0%)" : "translateY(-100%)",
  });

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <AnimatedDialogContent sx={{ textAlign: "center" }} style={fadeIn}>
        <DialogTitle>
          <Typography variant="h6" color="success.main" textAlign="center">
            İşlem Başarıyla Tamamlandı
          </Typography>
        </DialogTitle>
        <Iconify
          icon="mdi:success-circle-outline"
          width={64}
          sx={{ color: "success.main" }}
        />
        <Typography variant="body2" sx={{mt:2,mb:3, color: "text.secondary" }}>
          Ana sayfaya yönlendiriliyorsunuz...
        </Typography>
      </AnimatedDialogContent>
    </Dialog>
  );
}
