import AddEditAdvertForm from "@/components/AdvertForm/advert-add-edit-form";
import SectionHeader from "@/components/section-header";
import { Container } from "@mui/material";
import React from "react";

export default function EditAdvertMainView({ id }) {
  return (
    <Container maxWidth="lg">
      <SectionHeader
        props={{
          title: "İLANI",
          subtitle: "DÜZENLE",
        }}
      />
      <AddEditAdvertForm id={id} />
    </Container>
  );
}
