# Deployment Guide

This guide walks you through deploying the Student Housing application using **Supabase** (Database), **Render** (Backend), and **Vercel** (Frontend).

## Prerequisites

- A GitHub repository with your code pushed.
- Accounts on:
  - [Supabase](https://supabase.com/)
  - [Render](https://render.com/)
  - [Vercel](https://vercel.com/)

---

## Step 1: Database Setup (Supabase)

1.  **Create a New Project:** Log in to Supabase and create a new project.
2.  **Get Connection String:**
    *   Go to **Project Settings** > **Database**.
    *   Find the **Connection string** section and select **URI**.
    *   **Crucial:** Use the **Transaction Pooler** (Mode: Transaction, Port 6543) for your backend.
    *   Copy the URI. It should look like: `postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1`
    *   *Note: Replace `[PASSWORD]` with your actual database password.*

---

## Step 2: Backend Deployment (Render)

1.  **Create Web Service:** In Render, click **New +** > **Web Service**.
2.  **Connect Repo:** Select your GitHub repository.
3.  **Configure Service:**
    *   **Name:** `student-housing-api`
    *   **Root Directory:** `backend`
    *   **Runtime:** `Node`
    *   **Build Command:** `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
    *   **Start Command:** `npm start`
4.  **Environment Variables:** Add the following in the **Env Vars** tab:
    *   `DATABASE_URL`: Your Supabase connection string from Step 1.
    *   `JWT_SECRET`: A long, random secret key (e.g., `openssl rand -base64 32`).
    *   `NODE_ENV`: `production`
5.  **Copy URL:** Once deployed, copy your Render URL (e.g., `https://student-housing-api.onrender.com`).

---

## Step 3: Frontend Deployment (Vercel)

1.  **Create Project:** In Vercel, click **Add New** > **Project** and import your repository.
2.  **Project Settings:**
    *   **Root Directory:** Select `frontend`.
    *   **Framework Preset:** `Vite`.
    *   **Build Command:** `npm run build`
    *   **Output Directory:** `dist`
3.  **Environment Variables:** Add the following:
    *   `VITE_API_URL`: The **Render URL** you copied in Step 2.
4.  **Deploy:** Click **Deploy**.

---

## Step 4: Verification

1.  Visit your Vercel URL.
2.  Try to Register or Login.
3.  Check the "Network" tab in your browser's developer tools to ensure requests are going to your Render API.

## Troubleshooting

-   **Database Connections:** If Prisma fails to migrate on Render, ensure you are using the correct Supabase password and that "Allow all IP addresses" (0.0.0.0/0) is enabled in Supabase's Network Restrictions.
-   **CORS Issues:** If the frontend can't talk to the backend, ensure your backend `app.ts` or `server.ts` has `cors()` enabled without restrictive origins (or add your Vercel URL to the allowed list).
