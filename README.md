# shopify-app-node

Shopify embedded app backend with Express, TypeScript, session token authentication, Shopify Admin API service, product CRUD routes, webhook handling with HMAC verification (products/create, products/update, orders/create, app/uninstalled), and Polaris-ready frontend structure.

## API Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | List products from shop |
| GET | `/api/products/:id` | Get single product |
| PUT | `/api/products/:id` | Update product |
| POST | `/api/webhooks/products/create` | Product created webhook |
| POST | `/api/webhooks/products/update` | Product updated webhook |
| POST | `/api/webhooks/orders/create` | Order created webhook |
| POST | `/api/webhooks/app/uninstalled` | App uninstalled webhook |

## Setup
```bash
git clone https://github.com/Shaisolaris/shopify-app-node.git
cd shopify-app-node && npm install
cp .env.example .env  # Add Shopify credentials
npm run dev
```

## License
MIT
