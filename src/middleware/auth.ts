import type { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  shopDomain?: string;
  accessToken?: string;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const sessionToken = req.headers["authorization"]?.replace("Bearer ", "");
  if (!sessionToken) { res.status(401).json({ error: "Missing session token" }); return; }

  // In production: verify JWT session token with Shopify
  // For demo: extract shop from token payload
  try {
    const payload = JSON.parse(Buffer.from(sessionToken.split(".")[1] ?? "", "base64").toString());
    req.shopDomain = payload.dest?.replace("https://", "") ?? "";
    req.accessToken = sessionToken;
    next();
  } catch {
    res.status(401).json({ error: "Invalid session token" });
  }
}
