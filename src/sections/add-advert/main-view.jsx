import AddEditAdvertForm from "@/components/AdvertForm/advert-add-edit-form";
import SectionHeader from "@/components/section-header";
import { Container } from "@mui/material";
import React from "react";

export default function AddAdvertMainView() {
  return (
    <Container maxWidth="lg">
      <SectionHeader
        props={{
          title: "YENİ İLAN",
          subtitle: "EKLE",
        }}
      />
      <AddEditAdvertForm />
    </Container>
  );
}
