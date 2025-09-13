-- =====================================================
-- COMPLETE SUPABASE DATABASE SETUP FOR DEVS CENTRAL
-- =====================================================
-- Run this entire script in your Supabase SQL Editor
-- This will set up everything you need for the profile system

-- 1. Create profiles table with all necessary fields
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

-- 2. Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create security policies
CREATE POLICY "Users can view all profiles" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own profile" ON profiles
  FOR DELETE USING (auth.uid() = id);

-- 4. Create function to handle new user signup
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

-- 5. Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Create trigger for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 8. Create indexes for better performance
CREATE INDEX IF NOT EXISTS profiles_username_idx ON profiles(username);
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);
CREATE INDEX IF NOT EXISTS profiles_created_at_idx ON profiles(created_at);

-- 9. Create function to check username availability
CREATE OR REPLACE FUNCTION public.check_username_availability(username_to_check TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM profiles WHERE username = username_to_check
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON profiles TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_username_availability TO anon, authenticated;

-- 11. Create a view for public profile information (optional)
CREATE OR REPLACE VIEW public.profile_public AS
SELECT 
  id,
  username,
  full_name,
  avatar_url,
  bio,
  website,
  location,
  created_at
FROM profiles;

-- 12. Grant access to the public view
GRANT SELECT ON public.profile_public TO anon, authenticated;

-- =====================================================
-- AUTHENTICATION SETTINGS (Run these in Supabase Dashboard)
-- =====================================================

-- Go to Authentication > Settings and configure:

-- 1. Site URL: http://localhost:5173 (for development)
-- 2. Redirect URLs:
--    - http://localhost:5173/verify-email
--    - http://localhost:5173/reset-password
--    - http://localhost:5173/profile

-- 3. Email Templates:
--    - Customize the "Confirm signup" template
--    - Customize the "Reset password" template

-- 4. Auth Providers:
--    - Enable Email provider
--    - Configure SMTP settings if needed

-- =====================================================
-- TESTING QUERIES (Optional - for testing)
-- =====================================================

-- Test profile creation (this will be done automatically via trigger)
-- INSERT INTO auth.users (id, email, raw_user_meta_data) 
-- VALUES (gen_random_uuid(), 'test@example.com', '{"username": "testuser"}');

-- Test username availability check
-- SELECT public.check_username_availability('newusername');

-- View all profiles
-- SELECT * FROM profiles;

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- Your database is now ready for the profile system!
-- Users can:
-- 1. Sign up with username, email, password
-- 2. Edit their profile information
-- 3. View other user profiles
-- 4. Sign out smoothly
-- 5. All data is secure with Row Level Security
