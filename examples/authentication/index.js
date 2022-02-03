import { api, data, params } from "@serverless/cloud";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

api.post("/signup", async (req, res) => {
  const { username, password, profile } = req.body;

  if (!username || !password) {
    res
      .status(400)
      .json({ message: `Missing "username" or "password" properties.` });
  }

  const usernameExists = await data.get(`users:${username}`);

  if (usernameExists) {
    res.status(400).json({ message: `Username ${username} already exists.` });
  }

  if (password.length < 8) {
    res.status(400).json({ message: `Password must be at least 8 character.` });
  }

  const hash = bcrypt.hashSync(password);

  await data.set(`users:${username}`, { username, hash, profile });

  const token = jwt.sign(
    {
      username,
      profile,
    },
    params.JWT_SECRET
  );

  res.json({
    username,
    token,
  });
});

api.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(400)
      .json({ message: `Missing "username" or "password" properties.` });
  }

  const user = await data.get(`users:${username}`);

  if (!user) {
    res.status(400).json({ message: `Username ${username} does not exist.` });
  }

  const isCorrectPaassword = bcrypt.compareSync(password, user.hash);

  if (!isCorrectPaassword) {
    res
      .status(400)
      .json({ message: `The password you provided is not correct.` });
  }

  const token = jwt.sign(
    {
      username,
      profile: user.profile,
    },
    params.JWT_SECRET
  );

  res.json({
    username,
    token,
  });
});

api.get("/me", async (req, res) => {
  const { Authorization: token } = req.headers;

  if (!token) {
    res.status(401).json({ message: `Unauthorized.` });
  }

  try {
    const user = jwt.verify(token, params.JWT_SECRET);

    res.json({
      username,
      token,
    });
  } catch (e) {
    res.status(401).json({ message: `Unauthorized.` });
  }
});
