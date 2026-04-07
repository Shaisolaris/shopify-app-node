# shopify-app-node


Shopify app backend with Node.js, Express, OAuth authentication, webhook handling, Admin API integration, and session management.

## Quick Start

```bash
npm install
cp .env.example .env
# Edit .env with your Shopify app credentials from partners.shopify.com
npm run dev
# App runs at http://localhost:3000
# Install on your dev store via: https://your-store.myshopify.com/admin/oauth/authorize?client_id=YOUR_API_KEY&scope=read_products,write_products&redirect_uri=http://localhost:3000/auth/callback
```


![CI](https://github.com/Shaisolaris/shopify-app-node/actions/workflows/ci.yml/badge.svg)

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

## Architecture

```
.editorconfig
.env.example
.github/workflows/ci.yml
.gitignore
DEMO.md
Dockerfile
README.md
package.json
src/demo-data.ts
src/index.ts
src/middleware/auth.ts
src/routes/products.ts
src/routes/webhooks.ts
src/services/shopify.ts
tsconfig.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

## License

MIT
