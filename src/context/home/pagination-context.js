"use client"
import React, { createContext, useContext, useEffect, useState } from "react";

const RenderDataContext = createContext();

export function useRenderPagination() {
  return useContext(RenderDataContext);
}

export function PaginationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, scrollHeight);
    }
  };
  
  

  const value = {
    currentPage,
    scrollToBottom,
    setCurrentPage,
    handleChangePage,
    scrollToTop
  };

  return (
    <RenderDataContext.Provider value={value}>
      {children}
    </RenderDataContext.Provider>
  );
}
