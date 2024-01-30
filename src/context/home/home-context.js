"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import _ from "lodash";
import dayjs from "dayjs";
import { _tempAdverts } from "@/mock/_tempAdverts";

const RenderDataContext = createContext();

export function useRenderHomeAdvertData() {
  return useContext(RenderDataContext);
}

export function HomeAdvertsDataProvider({ children }) {
  const [allAdvert, setAllAdvert] = useState(_tempAdverts);
  const [filterAllAdvert, setFilterAllAdvert] = useState(null);

  useEffect(() => {
    setFilterAllAdvert(allAdvert);
  }, [allAdvert]);

  useEffect(() => {
    const localStorageData = localStorage.getItem("all-local-data");

    if (localStorageData) {
      setFilterAllAdvert(JSON.parse(localStorageData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // yeni bir öğeyi filterAllAdvert dizisinin başına ekler
  const addNewItemToArray = (newItem) => {
    // Önce yeni bir dizi oluştur ve newItem'i listenin başına ekleyerek değişkenimize ata
    const updatedAdverts = [newItem, ...filterAllAdvert];

    localStorage.setItem("all-local-data", JSON.stringify(updatedAdverts));

    // Sonra setFilterAllAdvert fonksiyonunu çağırarak state'i güncelle
    setFilterAllAdvert(updatedAdverts);
  };

  const updateAdvertById = (updatedAdvert) => {
    // Lodash ile filter fonksiyonunu kullanarak id'ye göre objeyi bul
    const existingAdvert = _.find(filterAllAdvert, { id: updatedAdvert.id });

    // Eğer obje bulunduysa, index'ini al
    const index = _.indexOf(filterAllAdvert, existingAdvert);

    // Eğer obje bulunduysa ve index varsa, objeyi güncelle
    if (existingAdvert && index !== -1) {
      const updatedAdverts = [...filterAllAdvert];
      updatedAdverts[index] = updatedAdvert;

      localStorage.setItem("all-local-data", JSON.stringify(updatedAdverts));
      setFilterAllAdvert(updatedAdverts);
    }
  };

  // bir id'ye sahip olan item'i filterAllAdvert içinden kaldır
  const removeItemById = (id) => {
    const updatedAdverts = _.cloneDeep(filterAllAdvert);
    _.remove(updatedAdverts, { id: id });

    localStorage.setItem("all-local-data", JSON.stringify(updatedAdverts));
    setFilterAllAdvert(updatedAdverts);
  };

  // console.log(filterAllAdvert);

  // bir key ve order değeri(asc-desc) ile sıralama sağlar
  const sortBy = (key, order, secondOrderKey) => {
    const sortedAdverts = _.orderBy(
      filterAllAdvert,
      [key, secondOrderKey],
      [order, order]
    );
    setFilterAllAdvert(sortedAdverts);
  };

  // asc ve ya desc değeri vererek favCount değerini artırıp azaltma işlemi gerçekleştirir
  const updateFavCountById = (id, order, isFav) => {
    const updatedAdverts = filterAllAdvert.map((item) => {
      if (item.id === id) {
        item.favCount = order === "asc" ? item.favCount + 1 : item.favCount - 1;
        item.isFav = !isFav; // Toggle the isFav property
      }
      return item;
    });
    localStorage.setItem("all-local-data", JSON.stringify(updatedAdverts));
    setFilterAllAdvert(updatedAdverts);
  };

  const value = {
    allAdvert,
    setAllAdvert,
    filterAllAdvert,
    setFilterAllAdvert,
    sortBy,
    updateFavCountById,
    addNewItemToArray,
    updateAdvertById,
    removeItemById,
  };

  return (
    <RenderDataContext.Provider value={value}>
      {children}
    </RenderDataContext.Provider>
  );
}
