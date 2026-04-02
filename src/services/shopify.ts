import { LATEST_API_VERSION } from "@shopify/shopify-api";

export interface ShopifyProduct {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  handle: string;
  status: string;
  variants: Array<{ id: number; title: string; price: string; inventory_quantity: number }>;
  images: Array<{ id: number; src: string; alt: string | null }>;
}

export class ShopifyService {
  private shopDomain: string;
  private accessToken: string;
  private apiVersion = LATEST_API_VERSION;

  constructor(shopDomain: string, accessToken: string) {
    this.shopDomain = shopDomain;
    this.accessToken = accessToken;
  }

  private get baseUrl(): string {
    return `https://${this.shopDomain}/admin/api/${this.apiVersion}`;
  }

  private get headers(): Record<string, string> {
    return { "Content-Type": "application/json", "X-Shopify-Access-Token": this.accessToken };
  }

  async getProducts(params?: { limit?: number; since_id?: number }): Promise<ShopifyProduct[]> {
    const query = new URLSearchParams();
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.since_id) query.set("since_id", String(params.since_id));
    const url = `${this.baseUrl}/products.json?${query}`;
    const res = await fetch(url, { headers: this.headers });
    const data = await res.json() as { products: ShopifyProduct[] };
    return data.products;
  }

  async getProduct(id: number): Promise<ShopifyProduct> {
    const res = await fetch(`${this.baseUrl}/products/${id}.json`, { headers: this.headers });
    const data = await res.json() as { product: ShopifyProduct };
    return data.product;
  }

  async updateProduct(id: number, updates: Partial<ShopifyProduct>): Promise<ShopifyProduct> {
    const res = await fetch(`${this.baseUrl}/products/${id}.json`, {
      method: "PUT", headers: this.headers, body: JSON.stringify({ product: updates }),
    });
    const data = await res.json() as { product: ShopifyProduct };
    return data.product;
  }

  async getOrderCount(): Promise<number> {
    const res = await fetch(`${this.baseUrl}/orders/count.json`, { headers: this.headers });
    const data = await res.json() as { count: number };
    return data.count;
  }
}
