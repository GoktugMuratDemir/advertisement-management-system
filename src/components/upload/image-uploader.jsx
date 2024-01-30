"use client"
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

const ImageUploader = ({ onUpload }) => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
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
  }, [onUpload]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Card>
      <CardContent>
        <div {...getRootProps()} style={dropzoneStyles}>
          <input {...getInputProps()} />
          <Typography variant="h6" align="center" gutterBottom>
            Resim Yükle
          </Typography>
          {uploadedImage ? (
            <CardMedia component="img" alt="Yüklenen Resim" height="140" image={uploadedImage} />
          ) : (
            <Typography variant="body2" color="textSecondary" align="center">
              Sürükle bırak yapın veya tıklayın
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default ImageUploader;
