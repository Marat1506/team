import { model, Schema } from "mongoose";
import shortID from "short-id";

shortID.configure({
  length: 5,
  algorithm: "sha1",
  salt: Math.random(),
});

const UrlSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    short_url: {
      type: String,
      required: true,
      unique: true,
    },
    alias: {
      type: String,
      unique: true,
      sparse: true,
    },
    expiresAt: {
      type: Date,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

const ClickSchema = new Schema({
  shortUrl: { type: Schema.Types.ObjectId, ref: "Url" },
  ip: String,
  date: { type: Date, default: Date.now },
});

export const UrlModel = model("Url", UrlSchema);
export const ClickModel = model("Click", ClickSchema);