"use client";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import _ from "lodash";
import Iconify from "./iconify/iconify";
import { useRenderHomeAdvertData } from "@/context/home/home-context";

export default function SortSelectBox() {
  const [selectedOption, setSelectedOption] = React.useState("");

  const { sortBy } = useRenderHomeAdvertData();

  const findItemByValue = (value) => {
    const selectedItem = _.find(sortedOptions, { value });
    return selectedItem || null;
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (selectedOption) {
      const selectedItem = findItemByValue(selectedOption);
      sortBy(
        selectedItem.key,
        selectedItem.order,
        selectedOption.secondOrderKey
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  const sortedOptions = [
    {
      value: 1,
      title: "Sırala (İlk Eklenen)",
      key: "date",
      order: "asc",
      secondOrderKey: "favCount",
    },
    {
      value: 2,
      title: "Sırala (Son Eklenen)",
      key: "date",
      order: "desc",
      secondOrderKey: "favCount",
    },
    {
      value: 3,
      title: "Sırala (Favori Sayısı Artan)",
      key: "favCount",
      order: "asc",
      secondOrderKey: "date",
    },
    {
      value: 4,
      title: "Sırala (Favori Sayısı Azalan)",
      key: "favCount",
      order: "desc",
      secondOrderKey: "date",
    },
  ];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          <Iconify icon="mi:filter" width={24} />
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedOption}
          label={<Iconify icon="mi:filter" width={24} />}
          onChange={handleChange}
          // sx={{
          //   height: "auto",
          //   fontSize: 12,
          //   "& .MuiSelect-select": {
          //     padding: "8px 16px",
          //   },
          // }}
        >
          {sortedOptions.map((item, index) => (
            <MenuItem value={item.value} key={index}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
