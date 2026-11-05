# 🛒 Monolithic E-Commerce Storefront & Administrative Panel

A full-stack, enterprise-grade E-Commerce web application engineered as a pure **Monolithic Node.js & Express Architecture**. This system eliminates complex frontend build loops by utilizing server-side compiled **EJS templates** combined with **Tailwind CSS** styling and an asynchronous, cookie-protected, role-enforced state machine.

---

## ⚡ Architecture Framework & Core Features

### 💻 Client Web Storefront
* **Server-Rendered Catalog Structure:** Fast rendering cycles powered by server-side compiled EJS components.
* **Instant Dynamic Data Filters:** High-performance URL parameter and database query routing for searching and category sorting.
* **Synchronized Session Basket:** Failsafe state caching using native client `localStorage` models paired with server-side stock-verification safety buffers.
* **Secure Payment Routing:** Checkout pipelines natively bound to isolated Stripe Test-Mode pages.

### 📊 Administrative Backoffice Control Room
* **RBAC Route Security:** Security layer protected by custom crypto-signed JWT sessions running exclusively via HTTP-Only proxy channels.
* **Inventory Allocation Suite:** Product entry dashboard for publishing items, altering stock configurations, and uploading media references.
* **Transaction Ingestion Pipeline:** Automated accounting logs displaying Stripe session tokens, settlement amounts, and transaction statuses.

### 🛡️ Critical Infrastructure & Safety
* **Database Resource Resilience:** Cached global database client pools that block connection leaks during high server stress.
* **Atomic Race-Condition Verification:** Automated pre-flight validations auditing exact inventory limits prior to generating checkout fields.
* **Idempotent Webhook Processing:** Asynchronous Stripe listener engines that update accounting metrics and deduct stock amounts *only* after a successful checkout verification signal passes.

---

## 📂 System File Architecture

```text
vanilla-node-ecommerce/
├── middleware/               # Token decoding & permission guards
│   └── auth.js               # Enforces cookie-session and role verifications
├── models/                   # Mongoose Database Data Models
│   ├── User.js               # Enforces security profiles and account tracking
│   ├── Product.js            # Tracks physical inventory counts and pricing
│   └── Order.js              # Audits completed transaction hashes
├── routes/                   # Pure HTTP Service Paths
│   ├── auth.js               # Resolves authentication requests
│   ├── checkout.js           # Builds validated Stripe checkout sessions
│   ├── products.js           # REST CRUD routing operations for catalog updates
│   ├── views.js              # Processes and passes state to EJS engines
│   └── webhook.js            # Asynchronous validation handler for events
├── views/                    # Server-Compiled HTML Blueprint Assets (EJS)
│   ├── partials/             
│   │   ├── header.ejs        # Universal navigation interface and cart counter
│   │   └── footer.ejs        # Core structural document bindings
│   ├── storefront.ejs        # Product rendering grid with operational sorting
│   ├── cart.ejs              # Storage data parsing framework with quantity adjustments
│   ├── admin.ejs             # Protected inventory control workspace
│   ├── login.ejs             # Authentication portal interface
│   ├── register.ejs          # Registration view component
│   └── success.ejs           # Payment settlement victory screen
├── .env                      # Universal API credentials dashboard
├── package.json              # System configuration and script variables
└── server.js                 # Unified web entry checkpoint
```

---
