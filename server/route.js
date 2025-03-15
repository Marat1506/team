import { Router } from "express";
import { UrlModel, ClickModel } from "./DBModel/schema.js";

const router = Router();

// Create short URL
router.post("/shorten", async (req, res) => {
  const { originalUrl, alias, expiresAt } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ status: "originalUrl is required" });
  }

  try {
    // Если expiresAt не указан, устанавливаем срок действия по умолчанию (30 дней)
    const defaultExpiresAt = new Date();
    defaultExpiresAt.setDate(defaultExpiresAt.getDate() + 30);

    // Если алиас указан, используем его как short_url
    const short_url = alias || shortID.generate();

    const shortUrl = await UrlModel.create({
      url: originalUrl,
      short_url, // Используем алиас или сгенерированный short_url
      alias,
      expiresAt: expiresAt ? new Date(expiresAt) : defaultExpiresAt,
    });

    res.json({ short_url: shortUrl.short_url });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ status: "Alias or short URL already exists" });
    }
    res.status(500).json({ status: "Internal server error" });
  }
});
// Get URL info
router.get("/info/:shortUrl", async (req, res) => {
  const shortUrl = await UrlModel.findOne({ short_url: req.params.shortUrl });

  if (!shortUrl) {
    return res.status(404).json({ status: "Not found" });
  }

  res.json({
    originalUrl: shortUrl.url,
    createdAt: shortUrl.createdAt,
    clickCount: shortUrl.clicks,
  });
});

// Delete URL
router.delete("/delete/:shortUrl", async (req, res) => {
  const result = await UrlModel.deleteOne({ short_url: req.params.shortUrl });

  if (result.deletedCount === 0) {
    return res.status(404).json({ status: "Not found" });
  }

  res.json({ status: "Deleted" });
});

// Get analytics
router.get("/analytics/:shortUrl", async (req, res) => {
  const shortUrl = await UrlModel.findOne({ short_url: req.params.shortUrl });

  if (!shortUrl) {
    return res.status(404).json({ status: "Not found" });
  }

  const clicks = await ClickModel.find({ shortUrl: shortUrl._id })
    .sort({ date: -1 })
    .limit(5);

  res.json({
    clickCount: shortUrl.clicks,
    lastFiveIps: clicks.map((click) => click.ip),
  });
});

router.get("/urls", async (req, res) => {
  try {
    const urls = await UrlModel.find({});
    res.json(urls);
  } catch (error) {
    res.status(500).json({ status: "Internal server error" });
  }
});

export default router;