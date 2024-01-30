import React from "react";
import { useRenderHomeAdvertData } from "@/context/home/home-context";
import Grid from "@mui/material/Grid";
import { useRenderPagination } from "@/context/home/pagination-context";
import { Pagination, Stack, useMediaQuery } from "@mui/material";
import AdvertNotFound from "@/components/empty-templates/advert-not-found";
import _ from "lodash"; // lodash ekledik
import AdvertCard from "@/components/advert-card/advert-card";

export default function List() {
  const { filterAllAdvert } = useRenderHomeAdvertData();
  const { currentPage, handleChangePage } = useRenderPagination();
  const isMobile = useMediaQuery('(max-width:600px)');
  const itemsPerPage = 4;

  // isFav true olanları filtreledik
  const filteredAdverts = _.filter(filterAllAdvert, { isFav: true });

  const pageCount = Math.ceil(filteredAdverts?.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = filteredAdverts?.slice(startIndex, endIndex);

  if (filteredAdverts?.length === 0) {
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
          size={isMobile ? "small" : "large"}
          shape="rounded"
        />
      </Stack>
    </Stack>
  );
}
