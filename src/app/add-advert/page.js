import { HomeAdvertsDataProvider } from "@/context/home/home-context";
import AddAdvertMainView from "@/sections/add-advert/main-view";
import React from "react";

export default function AddAdvert() {
  return (
    <HomeAdvertsDataProvider>
      <AddAdvertMainView />
    </HomeAdvertsDataProvider>
  );
}
