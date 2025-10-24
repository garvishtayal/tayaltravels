# Tayal Travels

**Blogging Website — Frontend & Backend (MERN + Next.js)**

A modern travel blogging platform built with the MERN stack and Next.js for SSR/SEO. It includes an Owner Panel with drag-and-drop blog creation, secure image uploads using DigitalOcean Spaces (signed URLs), and a production deployment setup using a DigitalOcean Droplet with Nginx, PM2, and Certbot (SSL).

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack & Architecture](#tech-stack--architecture)
4. [Quickstart (Development)](#quickstart-development)

   * Prerequisites
   * Environment variables
   * Install & run (backend)
   * Install & run (frontend)
5. [Deployment (Production)](#deployment-production)

   * Build and serve Next.js
   * Backend deployment with PM2
   * Nginx config (reverse proxy + load balancing)
   * SSL with Certbot
6. [API Endpoints](#api-endpoints)
7. [Image Uploads — DigitalOcean Spaces (Signed URLs)](#image-uploads---digitalocean-spaces-signed-urls)
8. [Project Structure](#project-structure)
9. [Contributing](#contributing)
10. [License & Contact](#license--contact)

---

## Project Overview

Tayal Travels lets bloggers create, manage, and publish travel stories with a rich, drag-and-drop editor. The site uses Next.js for server-side rendering to maximize SEO and initial load performance. Images are uploaded securely to DigitalOcean Spaces using signed URLs and lazy-loaded on the client.

Owner/Admin features include draft management, scheduled publishing, image management (drag-and-drop), and basic analytics for posts.

---

## Features

* Next.js front-end (SSR) for SEO-friendly pages
* Owner Panel with drag-and-drop blog editor
* Rich content blocks: text, images, galleries, embeds, maps
* Authentication (JWT-based) for owners/contributors
* Image uploads to DigitalOcean Spaces via signed URLs
* Lazy loading of images & responsive images (srcset)
* Backend REST API (Node.js + Express + MongoDB)
* Production deployment: Nginx, PM2, Certbot on DigitalOcean Droplet

---

## Tech Stack & Architecture

* **Frontend:** Next.js (React) + Tailwind CSS (or your preferred CSS framework)
* **Backend:** Node.js + Express + TypeScript (optional) + Mongoose
* **Database:** MongoDB (Atlas or self-hosted)
* **Storage:** DigitalOcean Spaces (S3-compatible)
* **Deployment:** DigitalOcean Droplet, Nginx, PM2
* **SSL:** Certbot (Let's Encrypt)

Architecture: Next.js handles public pages + SSR. API runs on a separate Express server (or same server under `/api` if deployed together). Images are uploaded securely to Spaces using backend-signed URLs.

---

## Quickstart (Development)

### Prerequisites

* Node.js >= 18
* npm or yarn
* MongoDB (local or cloud)
* DigitalOcean Spaces (for image uploads) — optional for local dev

### Environment variables (example)

Create a `.env` file in both `backend` and `frontend` (where needed). Example `backend/.env`:

```env
PORT=4000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/tayaltravels
JWT_SECRET=your_jwt_secret
SPACES_ENDPOINT=nyc3.digitaloceanspaces.com
SPACES_KEY=DO_SPACES_KEY
SPACES_SECRET=DO_SPACES_SECRET
SPACES_BUCKET=tayal-travels
SPACES_REGION=nyc3
FRONTEND_URL=http://localhost:3000
```

Example `frontend/.env.local` (Next.js):

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SPACES_BUCKET_URL=https://tayal-travels.nyc3.digitaloceanspaces.com
```

> **Security note:** Never commit `.env` files to source control.

### Install & run (backend)

```bash
# from repository root (or backend folder)
cd backend
npm install
npm run dev      # uses nodemon / ts-node-dev for development
# or
node dist/index.js  # for production build after `npm run build`
```

### Install & run (frontend)

```bash
cd frontend
npm install
npm run dev       # Next.js dev server at http://localhost:3000
# Build for production
npm run build
npm start          # or `next start`
```

---

## Deployment (Production)

High level steps (DigitalOcean Droplet):

1. Provision a Droplet (Ubuntu 22.04+ recommended).
2. Install Node.js, npm, Nginx, certbot, PM2, and git.
3. Pull repo, install dependencies, build frontend and backend.
4. Configure PM2 to run backend; optionally serve Next.js with `next start` behind Nginx, or use Vercel for front-end hosting.
5. Configure Nginx as a reverse proxy to forward requests to frontend and backend.
6. Obtain SSL certificates with Certbot and auto-renew.

Example PM2 commands:

```bash
# install pm2 globally
npm i -g pm2

# start backend
cd /var/www/tayaltravels/backend
pm ci
pm run start:prod      # or `pm2 start dist/index.js --name tayal-backend`

# start frontend (if self-hosting Next.js)
cd /var/www/tayaltravels/frontend
npm ci
npm run build
pm2 start "npm start" --name tayal-frontend

# save pm2 process list for startup
pm2 save
pm2 startup
```

### Example Nginx server block

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    location /_next/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:4000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
    }
}
```

After Nginx is configured and reloaded, obtain SSL with Certbot:

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

---

## API Endpoints (example)

> All endpoints are prefixed with `/api` (e.g. `https://example.com/api`)

**Auth**

* `POST /api/auth/login` — login, returns JWT
* `POST /api/auth/register` — create owner/contributor

**Posts**

* `GET /api/posts` — list published posts (pagination)
* `GET /api/posts/:slug` — get single post (SSR pages use this)
* `POST /api/posts` — create post (auth required)
* `PUT /api/posts/:id` — update post (auth)
* `DELETE /api/posts/:id` — delete post (auth)

**Images**

* `POST /api/uploads/sign` — returns a signed URL (pre-signed put URL) for Spaces
* `GET /api/uploads/:filename` — optional: proxy to spaces or return metadata

**Admin/Owner**

* `GET /api/admin/drafts` — list drafts (auth)
* `POST /api/admin/schedule` — schedule publish (auth)

---

## Image Uploads — DigitalOcean Spaces (Signed URLs)

Flow summary:

1. Client requests a signed URL from the backend (`POST /api/uploads/sign`) with the file name and MIME type.
2. Backend uses DO Spaces SDK (S3-compatible) and returns a pre-signed URL for `PUT`.
3. Client `PUT`s the file directly to the Spaces URL, avoiding heavy load on the backend.
4. Backend can validate and save the file URL as part of the post metadata.

Example backend pseudo-code (Node + AWS SDK compatible S3 client):

```js
// create presigned URL for putObject
const params = {
  Bucket: process.env.SPACES_BUCKET,
  Key: fileKey,
  ContentType: mimeType,
  ACL: 'public-read'
};
const url = await s3.getSignedUrlPromise('putObject', params);
return { url };
```

On the frontend, after receiving the signed URL, PUT the file:

```js
await fetch(signedUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } });
```

Use lazy loading attributes on `<img loading="lazy" />` and consider `srcset` for responsive images.

---

## Project Structure (example)

```
repo-root/
├─ backend/                 # Express API (Node.js + Mongoose)
│  ├─ src/
│  ├─ dist/
│  ├─ .env
│  └─ package.json
├─ frontend/                # Next.js app
│  ├─ pages/
│  ├─ components/
│  ├─ styles/
│  ├─ public/
│  └─ package.json
├─ README.md                # (this file)
└─ .gitignore
```

---

## Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome`)
3. Commit your changes (`git commit -am 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome`)
5. Open a Pull Request

Please follow the existing code style and add tests where applicable.

---

## License & Contact

This project is licensed under the MIT License (or change as desired).

**Maintainer:** Garvish Tayal — feel free to open issues or reach out via repository profile.

---

**Need changes?** I can tailor this README to: include your exact npm scripts, add CI/CD (GitHub Actions) steps, or produce a one-page `docs/` markdown for detailed API docs.
