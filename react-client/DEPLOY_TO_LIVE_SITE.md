# 🚀 Deploy React App to devscentral.tech

## 🎯 The Problem
Your live website at `devscentral.tech` is currently serving the old HTML files (`agents.html`, `ai.html`, etc.) instead of your new React app with authentication.

## ✅ The Solution
Replace the old HTML files with your new React app build.

## 📋 Deployment Steps

### **Step 1: Copy Built Files**
The React app has been built successfully in `react-client/dist/`. You need to copy these files to your website's root directory.

### **Step 2: Files to Replace**
Copy these files from `react-client/dist/` to your website root:

**Required Files:**
- `index.html` (replace the old one)
- `assets/` folder (new CSS and JS files)
- `data/` folder (JSON files for articles)
- `devscentral.jpg` (logo)
- `robots.txt`
- `sitemap.xml`
- `style.css`
- `vite.svg`

### **Step 3: Remove Old Files**
Delete these old files from your website root:
- `about.html`
- `agents.html`
- `ai.html`
- `developers.html`
- `programming-languages.html`
- `startups.html`
- `main.js` (old JavaScript)
- `favicon.png` (old favicon)

### **Step 4: Update Supabase Settings**
1. Go to Supabase dashboard
2. Authentication → Settings
3. Update Site URL to: `https://devscentral.tech`
4. Add Redirect URLs:
   - `https://devscentral.tech/verify-email`
   - `https://devscentral.tech/reset-password`
   - `https://devscentral.tech/profile`

## 🔧 Deployment Methods

### **Option 1: Manual Upload (Recommended)**
1. Download the `dist` folder contents
2. Upload to your web hosting service
3. Replace all old files

### **Option 2: Git Push (if using GitHub Pages)**
1. Copy `dist` contents to your repository root
2. Commit and push changes
3. GitHub Pages will auto-deploy

### **Option 3: FTP/SFTP**
1. Connect to your web server
2. Upload `dist` folder contents
3. Replace old files

## 🎉 After Deployment

Your live site will have:
- ✅ **React App** - Modern single-page application
- ✅ **Authentication** - Sign up, login, OTP verification
- ✅ **Profile System** - User profiles and settings
- ✅ **Dark Theme** - Beautiful UI
- ✅ **Responsive Design** - Works on all devices
- ✅ **Fast Loading** - Optimized production build

## 🔍 Verification

After deployment, test:
1. Go to `https://devscentral.tech`
2. You should see the new React app (not old HTML)
3. Try signing up for an account
4. Test OTP verification
5. Check profile functionality

## 🚨 Important Notes

- **Backup first** - Save your old files before replacing
- **Environment variables** - Make sure your hosting service has the Supabase credentials
- **HTTPS required** - Supabase requires HTTPS for live sites
- **Clear cache** - Browser cache might show old version initially

## 📞 Need Help?

If you need help with the deployment process, let me know:
- What hosting service you're using
- How you currently deploy files
- Any error messages you encounter

**Your authentication system is ready - it just needs to be deployed!** 🚀
