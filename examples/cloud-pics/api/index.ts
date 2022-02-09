import { api, data, storage } from "@serverless/cloud";
import Jimp from "jimp";
import { ulid } from "ulid";
import cookieParser from "cookie-parser";
import mime from "mime-types";

import { login, logout, register, auth } from "./lib/auth";

type Image = {
  key: string;
  value: {
    id: string;
    lastModified: number;
    size: number;
    type: string;
    width: number;
    height: number;
    username: string;
  };
};

const width = 512;
const height = 512;

api.use(cookieParser());

api.post("/login", login(), async function (req: any, res: any) {
  res.send({
    user: req.user,
    systemWarning: req.systemWarning,
  });
});

api.post("/register", register(), async function (req: any, res) {
  res.send({
    user: req.user,
    systemWarning: req.systemWarning,
  });
});

api.post("/logout", logout(), async function (req: any, res: any) {
  res.status(204).end();
});

api.get("/images", async (req, res) => {
  const { items } = (await data.get("image:*", {
    limit: 100,
    reverse: true,
  })) as {
    items: Image[];
  };

  res.json({
    items: items.map(({ value }) => ({
      id: value.id,
      url: `/public/${value.id}-${value.width}-${value.height}.png`,
      width: value.width,
      height: value.height,
      username: value.username,
    })),
  });
});

api.get("/images/:id", async (req, res) => {
  const { value } = (await data.get(`image:${req.params.id}`, {
    meta: true,
  })) as Image;

  res.json({
    id: value.id,
    url: `/public/${value.id}-${value.width}-${value.height}.png`,
    width: value.width,
    height: value.height,
    username: value.username,
  });
});

api.use(auth());

api.get("/me", async (req, res) => {
  res.json({
    user: req.user,
    systemWarning: req.systemWarning,
  });
});

api.post("/upload-url", async (req, res) => {
  const id = ulid();

  const { username } = req.user;
  const { filename } = req.body;

  const type = mime.lookup(filename);
  if (!type.startsWith("image/")) {
    throw new Error("Not an image");
  }

  await data.set(`image:${id}`, {
    id,
    username,
    filename,
  });

  const ext = mime.extension(type);
  const uploadUrl = await storage.getUploadUrl(`uploads/${id}.${ext}`);

  res.json({
    url: uploadUrl,
  });
});

storage.on("write:uploads/*", async ({ path }) => {
  const [id] = path.split("/").pop()!.split(".");

  const item = (await data.get(`image:${id}`, {
    meta: true,
  })) as Image;

  if (!item) {
    console.log(`Image not found for ID ${id}`);
    await storage.remove(path);
    return;
  }

  const buffer = (await storage.read(path, { buffer: true })) as Buffer;
  const image = await Jimp.read(buffer);
  image.cover(width, height);

  const publicPath = `public/${id}-${width}-${height}.png`;
  const resizedBuff = await image.getBufferAsync(Jimp.MIME_PNG);

  await storage.write(publicPath, resizedBuff, {
    type: "image/png",
    metadata: { id },
  });
});

storage.on("write:public/*", async ({ path }) => {
  const { lastModified, size, type, metadata } = await storage.stat(path);
  const { id } = metadata;

  await data.set(`image:${id}`, {
    lastModified: lastModified.getTime(),
    size,
    type,
    width,
    height,
  });
});
