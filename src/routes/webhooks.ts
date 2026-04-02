import { Router } from "express";
import type { Request, Response } from "express";
import crypto from "crypto";

export const webhookRoutes = Router();

function verifyWebhook(req: Request): boolean {
  const hmac = req.headers["x-shopify-hmac-sha256"] as string;
  if (!hmac || !process.env.SHOPIFY_API_SECRET) return false;
  const hash = crypto.createHmac("sha256", process.env.SHOPIFY_API_SECRET).update(req.body as Buffer).digest("base64");
  return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(hash));
}

webhookRoutes.post("/products/create", (req: Request, res: Response) => {
  if (!verifyWebhook(req)) { res.sendStatus(401); return; }
  const product = JSON.parse((req.body as Buffer).toString());
  console.log(`[Webhook] Product created: ${product.title} (${product.id})`);
  res.sendStatus(200);
});

webhookRoutes.post("/products/update", (req: Request, res: Response) => {
  if (!verifyWebhook(req)) { res.sendStatus(401); return; }
  const product = JSON.parse((req.body as Buffer).toString());
  console.log(`[Webhook] Product updated: ${product.title} (${product.id})`);
  res.sendStatus(200);
});

webhookRoutes.post("/orders/create", (req: Request, res: Response) => {
  if (!verifyWebhook(req)) { res.sendStatus(401); return; }
  const order = JSON.parse((req.body as Buffer).toString());
  console.log(`[Webhook] Order created: ${order.name} — ${order.total_price}`);
  res.sendStatus(200);
});

webhookRoutes.post("/app/uninstalled", (req: Request, res: Response) => {
  if (!verifyWebhook(req)) { res.sendStatus(401); return; }
  const shop = req.headers["x-shopify-shop-domain"];
  console.log(`[Webhook] App uninstalled from ${shop}`);
  res.sendStatus(200);
});
