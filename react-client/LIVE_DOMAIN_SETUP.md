# 🌐 Live Domain Setup for devscentral.tech

## 🔧 Supabase Configuration Update

Since your website is live at `devscentral.tech`, you need to update your Supabase authentication settings to work with your live domain.

### **Step 1: Update Supabase Authentication Settings**

1. Go to your Supabase dashboard: `https://supabase.com/dashboard/project/klqzieaqjxgvlxostntn`
2. Navigate to **Authentication** → **Settings**
3. Update the following settings:

#### **Site URL:**
```
https://devscentral.tech
```

#### **Redirect URLs (add all of these):**
```
https://devscentral.tech/verify-email
https://devscentral.tech/reset-password
https://devscentral.tech/profile
https://devscentral.tech/login
https://devscentral.tech/signup
```

### **Step 2: Update Environment Variables (if needed)**

If you're deploying to a hosting service, make sure your environment variables are set:

```env
VITE_SUPABASE_URL=https://klqzieaqjxgvlxostntn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtscXppZWFxanhndmx4b3N0bnRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MjA3ODksImV4cCI6MjA3MzA5Njc4OX0.ywNmWVvVC8BmXNTKQjn1hQZF0yVPkzc4NI9f80BVOzI
```

### **Step 3: Test Your Live Site**

1. Go to `https://devscentral.tech`
2. Try signing up for a new account
3. Check if OTP verification works
4. Test the profile system
5. Verify sign out functionality

## 🚀 Deployment Considerations

### **If using Vercel/Netlify:**
- Environment variables are automatically picked up from `.env.local`
- Make sure to add the environment variables in your hosting dashboard

### **If using other hosting:**
- Ensure your build process includes the environment variables
- Check that the Supabase URL and anon key are accessible

## 🔍 Troubleshooting

### **Common Issues:**

1. **OTP emails not sending:**
   - Check Supabase email settings
   - Verify SMTP configuration
   - Check spam folder

2. **Authentication redirects not working:**
   - Verify redirect URLs in Supabase settings
   - Check that all URLs use HTTPS

3. **Profile updates not saving:**
   - Verify database permissions
   - Check browser console for errors

## ✅ Verification Checklist

- [ ] Site URL updated to `https://devscentral.tech`
- [ ] All redirect URLs added
- [ ] Environment variables set correctly
- [ ] Sign up flow works
- [ ] OTP verification works
- [ ] Profile system works
- [ ] Sign out works
- [ ] All pages load correctly

## 🎉 Your Live Site Features

Once configured, your live site at `devscentral.tech` will have:

- ✅ **User Registration** with unique usernames
- ✅ **OTP Email Verification** (4-digit codes)
- ✅ **Login with username or email**
- ✅ **Complete Profile System**
- ✅ **Smooth Sign Out**
- ✅ **Beautiful Dark Theme**
- ✅ **Responsive Design**
- ✅ **Secure Database**

**Your authentication system is now ready for production!** 🚀
