# 🗄️ Database Setup Instructions

## Quick Database Setup (2 minutes)

### 1. Go to Supabase Dashboard
1. Open [supabase.com](https://supabase.com)
2. Go to your project: `klqzieaqjxgvlxostntn`
3. Click on **SQL Editor** in the left sidebar

### 2. Run the Database Schema
1. Click **"New Query"**
2. Copy and paste this entire SQL script:

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
```

3. Click **"Run"** to execute the script

### 3. Configure Authentication Settings
1. Go to **Authentication** → **Settings**
2. Set **Site URL** to: `http://localhost:5173`
3. Add **Redirect URLs**:
   - `http://localhost:5173/verify-email`
   - `http://localhost:5173/reset-password`

## ✅ You're Done!

Your database is now set up with:
- ✅ User profiles table
- ✅ Username uniqueness validation
- ✅ Automatic profile creation on signup
- ✅ Row-level security policies
- ✅ Email verification support

## 🎉 Test Your Setup

1. Go to your website: `http://localhost:5173`
2. You should see "✅ Configured" in the debug panel
3. Click "Sign Up" to create a test account
4. Check your email for verification link

Your authentication system is now fully functional! 🚀
