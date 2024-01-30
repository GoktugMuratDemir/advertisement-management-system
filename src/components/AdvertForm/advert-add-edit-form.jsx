"use client";
import { Stack, Container, Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import _ from "lodash";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { RHFTextField } from "../hook-form";
import FormProvider from "../hook-form/form-provider";
import { RHFCheckbox } from "../hook-form/rhf-checkbox";
import RHFUpload from "../hook-form/rhf-upload";
import { useRenderHomeAdvertData } from "@/context/home/home-context";
import { v4 as uuidv4 } from "uuid";
import { routes } from "@/routes/router";
import RHFSwitch from "../hook-form/rhf-switch";
import SuccessDialog from "../custom-dialog/success-dialog";
import { useBoolean } from "@/hooks/use-boolean";
import AdvertNotFound from "../empty-templates/advert-not-found";

export default function AddEditAdvertForm({ id }) {
  const { filterAllAdvert, addNewItemToArray, updateAdvertById } =
    useRenderHomeAdvertData();
  const router = useRouter();
  const confirm = useBoolean();

  const [filterIdData, setFilterIdData] = useState([]);

  const findItemById = () => {
    return _.find(filterAllAdvert, { id: id });
  };

  useEffect(() => {
    if (id && filterAllAdvert) {
      const findItemData = findItemById();
      setFilterIdData(findItemData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, filterAllAdvert]);

  const generateUniqueID = () => {
    const uniqueID = uuidv4();
    return uniqueID;
  };

  const NewAdvertScheme = Yup.object().shape({
    name: Yup.string().required("İlan Adı Zorunlu"),
    base64img: Yup.mixed().required("Resim Zorunlu"),
  });

  const defaultValues = useMemo(
    () => ({
      id: id || generateUniqueID(),
      name: "",
      favCount: 0,
      isFav: false,
      base64img: null,
      isEmergency: false,
      date: new Date(),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewAdvertScheme),
    defaultValues,
  });

  const {
    // reset,
    watch,
    // control,
    // trigger,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (id) {
      setValue("name", filterIdData?.name || "");
      setValue("favCount", filterIdData?.favCount || "");
      setValue("base64img", filterIdData?.base64img || null);
      setValue("isEmergency", filterIdData?.isEmergency || false);
      setValue("isFav", filterIdData?.isFav || false);
      setValue("date", dayjs(filterIdData?.date) || new Date());
      // console.log("id var");
    }
  }, [id, setValue, filterIdData]);

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    const sendData = {
      ...data,
      date: values.date.toISOString(),
    };

    if (id) {
      await updateAdvertById(sendData);
      await confirm.onTrue();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(routes.home, { scroll: false });
    } else {
      await addNewItemToArray(sendData);
      await confirm.onTrue();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(routes.home, { scroll: false });
    }
  });

  const handleUpload = (files) => {
    // Yüklenen dosyaları işleyin
    // console.log('Yüklenen dosyalar:', files)

    // İlk dosyayı alın (bu örnekte sadece bir resim yüklenmesine izin veriyoruz)
    const firstFile = files[0];

    // Dosyayı base64 formatına dönüştürün
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;

      // Set the base64Image value using setValue
      // console.log(base64Image);
      setValue("base64img", base64Image);
    };
    reader.readAsDataURL(firstFile);
  };

  const formSection = (
    <Stack spacing={2}>
      <RHFTextField name="name" label="İlan Başlığı" />
      <RHFTextField
        name="favCount"
        label="Başlangıçtaki Favori Sayısı"
        type="number"
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Yayınlanma Tarihi"
          value={dayjs(values.date)}
          format="DD/MM/YYYY"
          onChange={(newValue) => {
            setValue("date", newValue);
          }}
        />
      </LocalizationProvider>
      <RHFUpload
        name="base64img"
        onUpload={handleUpload}
        uploadedImageUp={values.base64img}
      />
      <RHFSwitch name="isFav" label="Favorilere Eklensin Mi?" />
      <RHFCheckbox name="isEmergency" label="Acil Mi?" />
    </Stack>
  );

  const renderFormProvider = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {/* <Box my={3}>
        <code>{JSON.stringify(values, null, 2)}</code>
      </Box> */}
      <Stack>
        {formSection}
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {!id ? "Yeni İlan Ekle" : "Değişiklikleri Kaydet"}
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );

  return (
    <Stack my={5}>
      {filterIdData === undefined ? (
        <AdvertNotFound />
      ) : (
        <Container maxWidth="md">{renderFormProvider}</Container>
      )}
      <SuccessDialog
        open={confirm.value}
        onClose={confirm.onFalse}
      />
    </Stack>
  );
}
