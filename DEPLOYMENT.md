# 🚀 Deployment Guide for TRC Academy Website

## Step 1: Create GitHub Repository

1. **Go to GitHub**
   - Navigate to: https://github.com/new
   - Or click the "+" icon in the top right and select "New repository"

2. **Create Repository**
   - Repository name: `trc-academy-website`
   - Description: "TRC Training Academy - Professional Coach Certification Program for 45+ Professionals"
   - Set as: **Public**
   - DO NOT initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

3. **Push Local Code to GitHub**
   ```bash
   # Add the remote repository (replace with your actual repo URL)
   git remote add origin https://github.com/mtn-mover/trc-academy-website.git
   
   # Push the code
   git branch -M main
   git push -u origin main
   ```

   Or if you prefer to keep 'master' branch:
   ```bash
   git remote add origin https://github.com/mtn-mover/trc-academy-website.git
   git push -u origin master
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Navigate to: https://vercel.com
   - Sign in with your GitHub account (mtn-mover)

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose your `mtn-mover/trc-academy-website` repository
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js** (should auto-detect)
   - Root Directory: `.` (leave as is)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)
   - Install Command: `npm install` (auto-filled)

4. **Environment Variables** (Optional)
   - Click "Environment Variables"
   - Add any variables from `.env.example` if needed
   - For now, you can skip this and add them later

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (usually 1-3 minutes)
   - Your site will be live at: `https://trc-academy-website.vercel.app`

### Option B: Deploy via CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd Git_Repository/trc-academy-website
   vercel
   ```

4. **Follow prompts**
   - Link to existing project? **No**
   - What's your project's name? **trc-academy-website**
   - In which directory is your code? **.**
   - Want to override settings? **No**

## Step 3: Set Up Custom Domain (Optional)

1. **In Vercel Dashboard**
   - Go to your project settings
   - Navigate to "Domains"
   - Add your custom domain (e.g., `trctrainingacademy.com`)

2. **Configure DNS**
   - Add the DNS records provided by Vercel to your domain provider
   - Usually an A record pointing to Vercel's IP
   - Or CNAME record for subdomains

## Step 4: Continuous Deployment

Once connected, your deployment is automatic:

- **Production**: Every push to `main` (or `master`) branch deploys to production
- **Preview**: Every pull request gets a preview deployment
- **Rollback**: Easy rollback to previous deployments via Vercel dashboard

## 📋 Quick Commands Reference

```bash
# Local development
npm run dev              # Start development server

# GitHub
git add .               # Stage changes
git commit -m "msg"     # Commit changes
git push                # Push to GitHub

# Deployment
npm run deploy          # Deploy to Vercel (after CLI setup)
npm run deploy:preview  # Deploy preview version
```

## 🔗 Important URLs

- **GitHub Repository**: https://github.com/mtn-mover/trc-academy-website
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Live Site**: https://trc-academy-website.vercel.app (after deployment)

## 📞 Need Help?

1. **Vercel Documentation**: https://vercel.com/docs
2. **Next.js Deployment**: https://nextjs.org/docs/deployment
3. **GitHub Help**: https://docs.github.com

## ✅ Deployment Checklist

- [ ] Code committed to Git
- [ ] GitHub repository created
- [ ] Pushed to GitHub
- [ ] Connected to Vercel
- [ ] Environment variables configured (if needed)
- [ ] Deployment successful
- [ ] Site accessible via Vercel URL
- [ ] Custom domain configured (optional)

---

**Note**: After deployment, share the Vercel URL with stakeholders for review!