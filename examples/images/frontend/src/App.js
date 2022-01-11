import { useState, useMemo } from 'react';
import { apiClient, baseURL } from './api';
import { UploadButton } from './components/UploadButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useDropzone } from 'react-dropzone';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CircularProgress from '@mui/material/CircularProgress';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useLocalStorage from './hooks/useLocalStorage';
import {
  Alert,
  ButtonGroup,
  Container,
  IconButton,
  ImageListItemBar,
  LinearProgress,
  Snackbar,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/DownloadRounded';
import OpenIcon from '@mui/icons-material/OpenInNewRounded';
import { useCopyToClipboard, useToggle, useUnmount } from 'react-use';

const Loading = () => (
  <div style={{ alignSelf: 'center', justifyContent: 'center' }}>
    <CircularProgress />
  </div>
);
export const ProgressBar = ({ value, uploadStatus, ...props }) => (
  <Box width='80%' textAlign='center'>
    <Box display='flex' alignItems='center'>
      <Box width='100%' mr={1} sx={{ color: '#FD5750' }}>
        <LinearProgress value={value} color='inherit' {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant='body2' color='textSecondary'>{`${Math.round(
          value,
        )}%`}</Typography>
      </Box>
    </Box>
    <Box display='flex' justifyContent='center' alignItems='center'>
      <Typography variant='subtitle1' style={{ marginRight: 10 }}>
        Uploading {uploadStatus?.currentName} ({uploadStatus?.done || 0}/
        {uploadStatus?.total})
      </Typography>
    </Box>
  </Box>
);

export const useStyles = makeStyles((theme) => ({
  body: {
    background: 'black',
    minHeight: '100vh',
    // padding: '10vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '& h6': {
      color: '#fff',
    },
  },
  dropZone: {
    position: 'relative',
    border: '2px dashed #FD5750',
    height: 500,
    width: '100%',
    borderRadius: 6,
    transition: 'all .2s ease-in-out',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      background: '#141414',
    },
  },
  overlayBox: ({ isDragActive, uploadStatus }) => ({
    display: isDragActive || uploadStatus ? 'flex' : 'none',
    transition: 'all .2s ease-in-out',
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.8)',
    // border: `2px dashed #FD5750`,
    overflow: 'hidden',
    borderRadius: 6,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    '& h6': {},
  }),
  snackbar: {
    '& .MuiSnackbarContent-root': {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      background: '#4caf50',
      color: '#fff',
    },
  },
}));

function App() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [, copyToClipboard] = useCopyToClipboard();
  const [imagesIds, setImagesIds] = useLocalStorage('serverless-images', []);

  const progressValue = useMemo(
    () => (uploadStatus?.done * 100) / uploadStatus?.total || 0,
    [uploadStatus],
  );
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
  const uploadFile = async (file) => {
    setUploadStatus((prev) => ({ ...prev, currentName: file?.name }));
    const body = await file2Buffer(file);
    const res = await apiClient({
      body,
      method: 'PUT',
    });
    setUploadStatus((prev) => ({ ...prev, done: prev.done + 1 || 1 }));
    return res?.url.split('/').pop();
  };
  const onDrop = async (files) => {
    try {
      setUploadStatus((prev) => ({ ...prev, total: files.length }));
      const newIds = await Promise.all(files.map((file) => uploadFile(file)));

      setImagesIds([...(imagesIds || []), ...newIds]);

      setUploadStatus(null);
    } catch (err) {
      console.log('err', err);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });
  console.log('imagesIds', imagesIds);
  const classes = useStyles({ isDragActive, uploadStatus });
  const closeSnackbar = () => setOpenSnackbar(false);
  return (
    <Box className={classes.body}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        className={classes.snackbar}
        onClose={closeSnackbar}
        message='Image URL copied'
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      {/* <Alert
          onClose={closeSnackbar}
          severity='success'
          sx={{ width: '100%' }}
        >
          Image URL copied
        </Alert> */}
      <Container>
        <Box className={classes.dropZone} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography variant='h6'>
              {!isDragActive
                ? 'Drag and drop your files here'
                : 'Drop files here'}
            </Typography>
          ) : null}

          <Box className={classes.overlayBox}>
            <ProgressBar
              uploadStatus={uploadStatus}
              value={progressValue}
              valueBuffer={progressValue + 10}
              variant='buffer'
            />
          </Box>
          {imagesIds?.length ? (
            <ImageList
              sx={{ width: '100%', height: '100%' }}
              cols={6}
              gap={10}
              rowHeight={100}
              onClick={(e) => e.stopPropagation()}
            >
              {imagesIds.map((id) => (
                <ImageListItem key={id}>
                  <img
                    src={`${baseURL}/${id}`}
                    alt='serverless cloud images'
                    loading='lazy'
                  />

                  <ImageListItemBar
                    position='top'
                    actionIcon={
                      <ButtonGroup
                        variant='contained'
                        aria-label='outlined primary button group'
                      >
                        <IconButton
                          onClick={() => {
                            setOpenSnackbar(true);
                            copyToClipboard(`${baseURL}/${id}`);
                          }}
                          sx={{
                            fontSize: 15,
                            color: 'rgba(255, 255, 255, 0.54)',
                          }}
                          aria-label={`copy image ${id}`}
                        >
                          <CopyIcon fontSize='inherit' />
                        </IconButton>
                        <IconButton
                          sx={{
                            fontSize: 15,
                            color: 'rgba(255, 255, 255, 0.54)',
                          }}
                          aria-label={`download image ${id}`}
                        >
                          <DownloadIcon fontSize='inherit' />
                        </IconButton>
                        <IconButton
                          sx={{
                            fontSize: 15,
                            color: 'rgba(255, 255, 255, 0.54)',
                          }}
                          aria-label={`open image ${id}`}
                        >
                          <OpenIcon fontSize='inherit' />
                        </IconButton>
                      </ButtonGroup>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          ) : null}
        </Box>
      </Container>
    </Box>
  );
}

export default App;
