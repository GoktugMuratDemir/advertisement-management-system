import React from "react";
import { useRenderHomeAdvertData } from "@/context/home/home-context";
import Grid from "@mui/material/Grid";
import { useRenderPagination } from "@/context/home/pagination-context";
import { Pagination, Stack, useMediaQuery } from "@mui/material";
import AdvertNotFound from "@/components/empty-templates/advert-not-found";
import AdvertCard from "@/components/advert-card/advert-card";

export default function List() {
  const { filterAllAdvert } = useRenderHomeAdvertData();
  const { currentPage, handleChangePage } = useRenderPagination();
  const isMobile = useMediaQuery('(max-width:600px)');
  const itemsPerPage = 4;

  const pageCount = Math.ceil(filterAllAdvert?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = filterAllAdvert?.slice(startIndex, endIndex);

  if (filterAllAdvert?.length === 0) {
    return <AdvertNotFound />;
  }

  return (
    <Stack>
      <Grid container spacing={2}>
        {displayedProducts?.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <AdvertCard item={item} />
          </Grid>
        ))}
      </Grid>

      <Stack alignItems="center" my={4}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
          showFirstButton
          showLastButton
          // variant="outlined"
          size={isMobile ? "small" : "large"}
          // boundaryCount={2}
          // siblingCount={0}
          shape="rounded"
        />
      </Stack>
    </Stack>
  );
}
