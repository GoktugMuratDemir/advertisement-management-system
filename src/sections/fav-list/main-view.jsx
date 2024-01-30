"use client";
import SortSelectBox from "@/components/sort-selectbox";
import { Container } from "@mui/material";
import React from "react";

import SectionHeader from "@/components/section-header";
import List from "./list/list";

export default function FavListMainView() {
  return (
    <Container maxWidth="lg">
      <SectionHeader
        props={{
          title: "FAVORİLERİM",
          subtitle: "VİTRİNİ",
          rightSide: <SortSelectBox />,
        }}
      />

      <List />
    </Container>
  );
}
