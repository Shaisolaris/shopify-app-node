import { Router } from "express";
import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.js";
import { ShopifyService } from "../services/shopify.js";

export const productRoutes = Router();

productRoutes.get("/", async (req: AuthenticatedRequest, res: Response) => {
  const service = new ShopifyService(req.shopDomain!, req.accessToken!);
  try {
    const products = await service.getProducts({ limit: 50 });
    res.json({ products, count: products.length });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

productRoutes.get("/:id", async (req: AuthenticatedRequest, res: Response) => {
  const service = new ShopifyService(req.shopDomain!, req.accessToken!);
  try {
    const product = await service.getProduct(Number(req.params["id"]));
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

productRoutes.put("/:id", async (req: AuthenticatedRequest, res: Response) => {
  const service = new ShopifyService(req.shopDomain!, req.accessToken!);
  try {
    const product = await service.updateProduct(Number(req.params["id"]), req.body);
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});
