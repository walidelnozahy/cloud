import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Container, Grid, Snackbar, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import UploadIcon from '@mui/icons-material/UploadRounded';

import { ImageBox } from './components/ImageBox';
import { theme } from './components/Theme';
import useLocalStorage from './hooks/useLocalStorage';
import logo from './serverless-cloud-text.svg';
import { apiClient } from './api';

const MyImages = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagesIds, setImagesIds] = useLocalStorage('serverless-images', []);
  const uploadInputRef = useRef();

  const file2Buffer = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      const readFile = function () {
        const buffer = reader.result;
        resolve(buffer);
      };
      reader.addEventListener('load', readFile);
      reader.readAsArrayBuffer(file);
    });

  const onUpload = async (file) => {
    setUploading(true);
    try {
      const body = await file2Buffer(file);
      const res = await apiClient({
        body,
        method: 'PUT',
      });

      const newId = res?.url.split('/').pop();
      console.log('newId', newId);
      setImagesIds([newId, ...(imagesIds || [])]);
    } catch (err) {}
    setUploading(false);
  };
  const removeImage = (imageId) => {
    setImagesIds(imagesIds.filter((id) => id !== imageId));
  };
  const closeSnackbar = () => setOpenSnackbar(false);
  return (
    <Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={closeSnackbar}
        message='Image URL copied'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />

      <Box textAlign='center'>
        <img src={logo} alt='serverless cloud' />
        <Typography
          variant='h3'
          color='#fff'
          fontWeight='bold'
          textAlign='center'
          mb={15}
        >
          Host and resize images
        </Typography>
      </Box>
      <Container>
        <Box width={200} margin='auto' textAlign='center'>
          <input
            accept='image/*'
            type='file'
            style={{ display: 'none' }}
            onChange={(e) => onUpload(e.target.files[0])}
            ref={uploadInputRef}
          />
          {uploading ? (
            <Box textAlign='center'>
              <CircularProgress color='primary' />
            </Box>
          ) : (
            <Button
              variant='contained'
              color='primary'
              startIcon={<UploadIcon />}
              onClick={() => uploadInputRef?.current?.click()}
              size='large'
              style={{ width: 200, height: 50 }}
            >
              Upload Image
            </Button>
          )}
        </Box>
        <Box mt={15}>
          {imagesIds?.length ? (
            <Grid container spacing={2}>
              {imagesIds.map((imageId) => (
                <ImageBox
                  key={imageId}
                  imageId={imageId}
                  setOpenSnackbar={setOpenSnackbar}
                  removeImage={removeImage}
                />
              ))}
            </Grid>
          ) : null}
        </Box>
      </Container>
    </Box>
  );
};

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <MyImages />
  </ThemeProvider>
);
export default App;
