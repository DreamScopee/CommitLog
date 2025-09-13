# 🚀 Supabase Setup Guide

## Quick Setup (5 minutes)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up/Login with GitHub
4. Click "New Project"
5. Choose your organization
6. Enter project details:
   - **Name**: `devscentral-auth`
   - **Database Password**: (choose a strong password)
   - **Region**: Choose closest to your users

### 2. Get Your Credentials
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

### 3. Update Environment Variables
1. Open `react-client/.env.local`
2. Replace the placeholder values:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### 4. Set Up Database
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase-schema.sql`
4. Click "Run" to execute the script

### 5. Configure Authentication
1. Go to **Authentication** → **Settings**
2. Set **Site URL** to: `http://localhost:5173` (for development)
3. Add **Redirect URLs**:
   - `http://localhost:5173/verify-email`
   - `http://localhost:5173/reset-password`

### 6. Test Your Setup
1. Restart your dev server: `npm run dev`
2. You should see "✅ Configured" in the debug panel
3. Try creating an account at `/signup`

## 🎉 You're Done!

Your authentication system is now fully functional with:
- ✅ User registration with unique usernames
- ✅ Login with username or email
- ✅ Password reset functionality
- ✅ Email verification
- ✅ Beautiful dark theme UI

## 🔧 Troubleshooting

**If you see "❌ Not configured":**
- Check your `.env.local` file has the correct values
- Make sure there are no extra spaces
- Restart your dev server after changes

**If authentication doesn't work:**
- Check the browser console for errors
- Verify your Supabase project is active
- Make sure the database schema was created successfully

## 🚀 Next Steps

Now you can add features like:
- Bookmark articles
- Reading history
- User preferences
- Comments system
- Personalized recommendations
