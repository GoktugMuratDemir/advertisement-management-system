"use client";
import SortSelectBox from "@/components/sort-selectbox";
import { Container } from "@mui/material";
import React from "react";
import List from "./list/list";
import SectionHeader from "@/components/section-header";

export default function HomeMainView() {
  return (
    <Container maxWidth="lg">
      <SectionHeader
        props={{
          title: "ANA SAYFA",
          subtitle: "VİTRİNİ",
          rightSide: <SortSelectBox />,
        }}
      />

      <List />
    </Container>
  );
}
