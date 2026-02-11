## DevCenter Blog Frontend

DevCenter Blog is a content-driven web application built with Next.js, designed to display blog posts, categories, and rich content managed entirely from a Strapi headless CMS. It focuses on a clean UI, fast performance, and easy content management for non-technical editors.

This app consumes a Strapi backend, so you **must** have Strapi running before starting the frontend.

---

## Prerequisites

- **Node.js** (LTS recommended)
- **npm** or **yarn**
- **Strapi backend** project cloned and configured

---

## 1. Configure environment variables

Create a `.env.local` file in the project root (same level as `package.json`) and add your environment variables, for example:

```bash
NEXT_PUBLIC_API_URL=http://localhost:1337
```

Adjust the URL/keys to match your Strapi backend configuration.

> If your project already uses a different `.env` file name (like `.env` or `.env.development`), place the values there instead.

---

## 2. Start the Strapi backend (required first)

From your **Strapi backend** project directory, install dependencies and start the server:

```bash
cd ../path-to-your-strapi-backend
npm install
npm run develop
```

Make sure Strapi is:

- Running successfully (no startup errors)
- Accessible at the URL you set in `NEXT_PUBLIC_API_URL` (for example `http://localhost:1337`)

Keep the Strapi server running while you work with the frontend.

---

## 3. Install frontend dependencies

From this frontend project directory:

```bash
cd blogfront
npm install
```

This will install all required packages listed in `package.json`.

---

## 4. Build the frontend

To create a production build:

```bash
npm run build
```

This runs the Next.js production build. It requires the Strapi backend URL to be correctly configured in your `.env` file.

---

## 5. Run the frontend

### Development

```bash
npm run dev
```

The app will typically be available at `http://localhost:3000`.

### Production (after build)

```bash
npm run start
```

This serves the previously built production bundle.

---

## Summary of setup steps

1. **Create `.env.local`** and set `NEXT_PUBLIC_API_URL` (and other needed vars).
2. **Run Strapi backend first** (`npm run develop` in your Strapi project).
3. In this project, run **`npm install`**.
4. Run **`npm run build`** for a production build (optional during development).
5. Run **`npm run dev`** (for development) or **`npm run start`** (for production).

