"use client";
import { useRenderHomeAdvertData } from "@/context/home/home-context";
import React, { useState } from "react";
import Iconify from "./iconify";

export default function HeartIconButton({ item }) {
  const { updateFavCountById } = useRenderHomeAdvertData();

  return (
    <Iconify
      icon={item.isFav ? "mdi:heart" : "mdi:heart-outline"}
      width={24}
      onClick={() => {
        updateFavCountById(item.id, item.isFav ? "desc" : "asc", item.isFav);
      }}
    />
  );
}

