"use client";
import HeartIconButton from "@/components/heart-icon-button";
import Iconify from "@/components/iconify";
import { useRouter } from "next/navigation";
import { fDateTime } from "@/utils/format-time";
import { Avatar, Paper, Stack, Typography, Button } from "@mui/material";
import React from "react";
import { routes } from "@/routes/router";
import { useRenderHomeAdvertData } from "@/context/home/home-context";
import { ConfirmDialog } from "@/components/custom-dialog";
import { useBoolean } from "@/hooks/use-boolean";

export default function AdvertCard({ item }) {
  const { removeItemById } = useRenderHomeAdvertData();
  const router = useRouter();
  const confirm = useBoolean();
  return (
    <>
      <Paper variant="elevation">
        <Stack>
          <Stack position="relative">
            <Avatar
              variant="rounded"
              src={item.base64img}
              alt={item.name}
              sx={{ width: 1, height: 200 }}
            />
            <Stack
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                cursor: "pointer",
              }}
            >
              <HeartIconButton item={item} />
            </Stack>

            {item.isEmergency && (
              <Stack
                direction="row"
                spacing={0.5}
                p={1}
                sx={{
                  position: "absolute",
                  alignItems: "center",
                  borderRadius: 1,
                  background: (theme) => theme.palette.error.main,
                  color: "white",
                  top: 16,
                  left: 16,
                }}
              >
                <Iconify icon="solar:fire-bold" width={16} />
                <Typography variant="body2">ACİL</Typography>
              </Stack>
            )}
          </Stack>

          <Stack p={1} spacing={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              {item.name}
            </Typography>
            <Stack direction="row" spacing={0.5}>
              <Iconify icon="mingcute:location-line" />
              <Typography variant="caption">
                Toplam Beğeni Sayısı:{item.favCount}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <Iconify icon="solar:calendar-line-duotone" />
              <Typography variant="caption">
                Son Güncellenme:{fDateTime(item.date)}
              </Typography>
            </Stack>
          </Stack>

          <Stack justifyContent="center" direction="row" spacing={1} my={2}>
            <Button
              variant="contained"
              onClick={() =>
                router.push(`${routes.edit_advert}/${item.id}`, {
                  scroll: false,
                })
              }
            >
              Detay
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => confirm.onTrue()}
            >
              <Iconify icon="material-symbols:delete-sharp" />
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Sil"
        content={`${item.name} isimli ilanı silmek istediğinize emin misiniz?`}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              removeItemById(item.id);
              confirm.onFalse();
            }}
          >
            Sil
          </Button>
        }
      />
    </>
  );
}
