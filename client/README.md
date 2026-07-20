# Vivaha — Wedding Management SaaS

A production-grade wedding management platform for planning studios. This
repository currently holds the Next.js frontend and will grow to include an
Express backend under `server/` in the future.

## Structure

```
app/                  Next.js App Router pages
components/
  landing/            Sections that compose the marketing site
  shared/             Reusable presentation atoms (progress bars, background)
  ui/                 shadcn/ui primitives
constants/            Static data, copy, design tokens
hooks/                Client-side reusable hooks
lib/                  Small utilities (className helpers, etc.)
middleware.js         Edge middleware placeholder
public/               Static assets
```

### Coding standards

1. Keep files under ~300 lines. Split large components into smaller ones.
2. Follow the Single Responsibility Principle for every module.
3. Never hardcode copy, palette colors, animation durations, routes or
   repeated strings inside components — add them to `constants/`.
4. Keep UI, data, hooks and utilities cleanly separated.
5. Prefer descriptive names and remove dead code after refactors.

## Development

```bash
yarn install
yarn dev
```

The app is served on `http://localhost:3000`.
