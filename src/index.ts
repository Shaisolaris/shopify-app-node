import express from "express";
import dotenv from "dotenv";
import { productRoutes } from "./routes/products.js";
import { webhookRoutes } from "./routes/webhooks.js";
import { authMiddleware } from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT ?? "3000");

app.use("/api/webhooks", express.raw({ type: "application/json" }), webhookRoutes);
app.use(express.json());
app.use("/api", authMiddleware);
app.use("/api/products", productRoutes);

app.get("/health", (_req, res) => res.json({ status: "healthy", timestamp: new Date().toISOString() }));

app.listen(PORT, () => console.log(`Shopify app running on :${PORT}`));
