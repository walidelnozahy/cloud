import { baseURL } from '../api';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import { useCopyToClipboard } from 'react-use';
import { useMemo, useState } from 'react';
import CopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/DownloadRounded';
import CloseIcon from '@mui/icons-material/Close';

export const ImageBox = ({ imageId, removeImage, setOpenSnackbar }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  const imageUrl = useMemo(
    () =>
      `${baseURL}/${imageId}${width ? `?w=${width}` : ``}${
        height ? `&h=${height}` : ``
      }`,
    [width, height, imageId],
  );
  const onCopy = () => {
    setOpenSnackbar(true);
    copyToClipboard(imageUrl);
  };

  const onOpen = () => {
    window.open(imageUrl);
  };

  return (
    <Grid item xs={6}>
      <Paper elevation={0} variant='outlined' width='100%'>
        <Box p={2}>
          <Box display='grid' gridTemplateColumns='1fr 2fr' gap={2}>
            <img
              src={`${baseURL}/${imageId}`}
              alt='serverless cloud images'
              loading='lazy'
              style={{
                width: '100%',
                maxHeight: 120,
                minHeight: 120,
                borderRadius: 6,
              }}
            />
            <Stack justifyContent='space-between'>
              <Box>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography variant='subtitle2' gutterBottom>
                    Image size
                  </Typography>
                  <IconButton
                    color='secondary'
                    size='small'
                    onClick={() => removeImage(imageId)}
                  >
                    <CloseIcon fontSize='small' />
                  </IconButton>
                </Stack>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      type='number'
                      variant='outlined'
                      onChange={(e) => setWidth(e.target.value)}
                      size='small'
                      style={{ width: '100%' }}
                      placeholder='width'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type='number'
                      variant='outlined'
                      onChange={(e) => setHeight(e.target.value)}
                      size='small'
                      style={{ width: '100%' }}
                      placeholder='height'
                    />
                  </Grid>
                </Grid>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    // variant='outlined'
                    startIcon={<CopyIcon />}
                    size='small'
                    color='secondary'
                    style={{ width: '100%' }}
                    onClick={onCopy}
                  >
                    Copy URL
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    // variant='outlined'
                    startIcon={<DownloadIcon />}
                    size='small'
                    color='secondary'
                    style={{ width: '100%' }}
                    onClick={onOpen}
                  >
                    Download Image
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};
