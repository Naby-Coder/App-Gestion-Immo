/*
  # Fix profiles table RLS policies

  1. Security Changes
    - Drop existing problematic policies that cause infinite recursion
    - Create new simplified policies that don't cause circular references
    - Ensure users can access their own profiles
    - Allow admins to access all profiles without recursion

  2. Policy Updates
    - Replace recursive admin policy with service role access
    - Simplify user access policies
    - Maintain security while preventing infinite loops
*/

-- Drop existing policies that cause infinite recursion
DROP POLICY IF EXISTS "Les admins peuvent tout voir" ON profiles;
DROP POLICY IF EXISTS "Les utilisateurs peuvent modifier leur propre profil" ON profiles;
DROP POLICY IF EXISTS "Les utilisateurs peuvent voir leur propre profil" ON profiles;

-- Create new simplified policies
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow service role to access all profiles (for admin operations)
CREATE POLICY "Service role can access all profiles"
  ON profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);