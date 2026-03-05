# StoreCraft SaaS

A multi-tenant SaaS platform for creating beautiful online stores.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js (Credentials + Google)
- **Payments:** Stripe
- **State:** Zustand (cart)

## Quick Start

### 1. Clone & Install

```bash
cd storecraft-saas
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Start Database

```bash
docker compose up -d postgres
```

### 4. Run Migrations

```bash
npx prisma generate
npx prisma db push
```

### 5. Start Dev Server

```bash
npm run dev
```

Visit http://localhost:3000

## Docker (Full Stack)

```bash
docker compose up -d
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── onboarding/           # Store setup wizard
│   ├── auth/signin/          # Authentication
│   ├── dashboard/            # Admin (overview, products, orders, settings)
│   ├── store/[slug]/         # Public storefront
│   │   ├── cart/             # Shopping cart
│   │   └── checkout/         # Stripe checkout
│   └── api/
│       ├── auth/             # NextAuth
│       ├── products/         # Products CRUD
│       ├── orders/           # Orders
│       ├── stores/           # Stores
│       ├── tenants/          # User registration
│       ├── checkout/         # Checkout session
│       ├── upload/           # File upload
│       ├── admin/stats/      # Dashboard stats
│       └── webhooks/stripe/  # Stripe webhooks
├── components/
│   ├── ui/                   # shadcn/ui components
│   └── storefront/           # Store templates (minimalist, bold)
├── hooks/                    # Cart hook (Zustand)
├── lib/                      # Prisma, Stripe, auth, utils
└── types/                    # TypeScript types
```

## Store Templates

- **Minimalist:** Clean, white, typography-focused
- **Bold & Colorful:** Vibrant, dynamic, eye-catching

## License

MIT
