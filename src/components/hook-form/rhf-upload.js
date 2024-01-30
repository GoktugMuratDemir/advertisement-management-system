"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const RHFUpload = ({ name, onUpload, uploadedImageUp }) => {
  const { control } = useFormContext();

  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    if (uploadedImageUp) {
      setUploadedImage(uploadedImageUp);
    }
  }, [uploadedImageUp]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Dosyaları işleyebilir veya yükleyebilirsiniz
      onUpload(acceptedFiles);

      // İlk dosyayı alın (bu örnekte sadece bir resim yüklenmesine izin veriyoruz)
      const firstFile = acceptedFiles[0];

      // Dosyayı base64 formatına dönüştürün
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(firstFile);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Card>
            <CardContent>
              <div
                {...getRootProps()}
                style={error ? dropzoneStylesWithError : dropzoneStyles}
              >
                <input {...getInputProps()} />
                <Typography variant="h6" align="center" gutterBottom>
                  Resim Yükle
                </Typography>
                {uploadedImage ? (
                  <CardMedia
                    component="img"
                    alt="Yüklenen Resim"
                    height="340"
                    image={uploadedImage}
                  />
                ) : (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                  >
                    Sürükle bırak yapın veya tıklayın
                  </Typography>
                )}
              </div>
            </CardContent>
          </Card>
          {error && (
            <Typography variant="caption" color="error" align="center">
              {error.message}
            </Typography>
          )}
        </>
      )}
    />
  );
};

const dropzoneStyles = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const dropzoneStylesWithError = {
  border: "2px dashed #d32f2f",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default RHFUpload;
