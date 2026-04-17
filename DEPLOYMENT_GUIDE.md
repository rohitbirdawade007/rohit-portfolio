# 🚀 Portfolio Platform Deployment Guide

This guide provides a step-by-step manual for deploying your Full-Stack AI & ML Portfolio. We will use **Render** for the Backend and **Vercel** for the Frontend for the best performance and reliability.

---

## 1. Prerequisites
- A [GitHub](https://github.com/) account.
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (which you already have).
- A [Render](https://render.com/) account (for the Backend).
- A [Vercel](https://vercel.com/) account (for the Frontend).

---

## 2. Prepare Your Repository
Ensure all your code is pushed to a private or public GitHub repository.

1. Initialize git (if not done): `git init`
2. Add your remote: `git remote add origin YOUR_GITHUB_REPO_URL`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Finalizing for deployment"
   git push origin main
   ```

---

## 3. Step 1: Deploy the Backend (Render)

Render is excellent for Node.js servers with persistent needs.

1. **Log in to Render** and click **New +** > **Web Service**.
2. Connect your GitHub repository.
3. **Configuration**:
   - **Name**: `portfolio-backend`
   - **Root Directory**: `backend` (IMPORTANT)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. **Environment Variables**:
   Click the "Advanced" button and add the variables from your local `backend/.env`:
   - `PORT`: `5000`
   - `MONGO_URI`: `your_atlas_connection_string`
   - `JWT_SECRET`: `something_very_random_and_long`
   - `ADMIN_REGISTRATION_TOKEN`: `your_secure_token`
   - `GEMINI_API_KEY`: `your_key_from_google`
5. **Click Create Web Service**.
6. **Wait for Deployment**: Once it says "Live", copy the URL (e.g., `https://portfolio-backend.onrender.com`).

---

## 4. Step 2: Update Frontend URL

Now that you have your backend URL, you must tell the frontend where to find it.

1. Open your local `.env.production` file.
2. Update the `VITE_API_URL` to your Render URL:
   ```env
   VITE_API_URL=https://portfolio-backend.onrender.com/api
   ```
3. Commit and push this change to GitHub.

---

## 5. Step 3: Deploy the Frontend (Vercel)

Vercel is the fastest way to host Vite/React applications.

1. **Log in to Vercel** and click **Add New** > **Project**.
2. Import your GitHub repository.
3. **Project Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (The root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Environment Variables**:
   Add the variable from your `.env.production`:
   - `VITE_API_URL`: `https://portfolio-backend.onrender.com/api`
5. **Click Deploy**.

---

## 6. Step 4: Whitelist Vercel in Backend CORS

To allow your frontend to talk to your backend safely:

1. Copy your Vercel URL (e.g., `https://rohit-portfolio.vercel.app`).
2. Go back to your **Render Dashboard** > **Backend Service** > **Environment**.
3. Add a new variable:
   - `FRONTEND_URL`: `https://rohit-portfolio.vercel.app`
4. Render will automatically redeploy the backend with the new whitelist.

---

## 🛠️ Post-Deployment Checklist

- [ ] **Admin Setup**: Navigate to `your-frontend-url.com/admin/login` and ensure you can log in.
- [ ] **AI Chatbot**: Verify the chat bubble responds (it will now use the production backend).
- [ ] **Image Uploads**: Test uploading a project image in the Admin panel.
- [ ] **SEO**: Visit your site to ensure meta tags and titles are rendering correctly.

---

**You are now officially LIVE! 🎉**
