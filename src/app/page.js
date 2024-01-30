"use client";
// import Image from "next/image";
// import styles from "./page.module.css";
import HomeMainView from "@/sections/home/main-view";
import { HomeAdvertsDataProvider } from "@/context/home/home-context";
import { PaginationProvider } from "@/context/home/pagination-context";

export default function Home() {
  return (
    <>
      <HomeAdvertsDataProvider>
        <PaginationProvider>
          <HomeMainView />
        </PaginationProvider>
      </HomeAdvertsDataProvider>
    </>
  );
}
