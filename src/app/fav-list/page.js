import { HomeAdvertsDataProvider } from "@/context/home/home-context";
import { PaginationProvider } from "@/context/home/pagination-context";
import FavListMainView from "@/sections/fav-list/main-view";
import React from "react";

export default function FavList() {
  return (
    <HomeAdvertsDataProvider>
      <PaginationProvider>
        <FavListMainView />
      </PaginationProvider>
    </HomeAdvertsDataProvider>
  );
}
