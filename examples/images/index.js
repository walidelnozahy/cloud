import { api, storage } from '@serverless/cloud';
import Jimp from 'jimp';
import cors from 'cors';

const random = (length = 6) => Math.random().toString(20).substr(2, length);

api.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

api.upload('/', async (req, res) => {
  const fileBuff = req.files[0].buffer;

  if (!fileBuff) {
    return res.status(400).send('No file provided');
  }

  try {
    const imageId = random();
    await storage.write(imageId, fileBuff);

    return res.send({ url: `https://${req.hostname}/${imageId}` });
  } catch (error) {
    console.error(error);

    return res.status(500).send(error.message);
  }
});

api.get('/:imageId', async (req, res) => {
  const imageId = req.params.imageId;
  const width = parseInt(req.query.w);
  const height = parseInt(req.query.h);

  try {
    if (width && height) {
      const resizedImageId = `${imageId}-${width}-${height}`;

      if (!(await storage.exists(resizedImageId))) {
        const imageBuffer = await storage.readBuffer(imageId);

        const image = await Jimp.read(imageBuffer);
        image.resize(width, height);
        const resizedImageBuffer = await image.getBufferAsync(Jimp.AUTO);

        await storage.write(resizedImageId, resizedImageBuffer);
      }
      return await res.sendFile(resizedImageId);
    }

    return await res.sendFile(imageId);
  } catch (error) {
    console.error(error);

    let status = error.message === 'NotFound' ? 400 : 500;

    return res.status(status).send(error.message);
  }
});
