import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import apiRouter from "./route.js";
import { UrlModel } from "./DBModel/schema.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;


app.use("/api", apiRouter);

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await UrlModel.findOne({
    short_url: req.params.shortUrl,
  });

  if (!shortUrl) {
    return res.status(404).json({ status: "Not found" });
  }

  if (shortUrl.expiresAt && new Date(shortUrl.expiresAt) < new Date()) {
    return res.status(410).json({ status: "Link expired" });
  }

  shortUrl.clicks++;
  await shortUrl.save();

  res.redirect(shortUrl.url);
});

async function start() {//mongodb://mongo:27017/team
  try {//mongodb://localhost:27017/team
    await mongoose.connect(`mongodb://mongo:27017/team`);
    app.listen(PORT, () => {
      console.log("Server started on port", PORT);
    });
  } catch (e) {
    console.log(e);
  }
}

start();