/*
  # Fix RLS policies for user registration

  This migration adds the missing RLS policies that are preventing user registration from working properly.

  ## Changes Made

  1. **Profiles Table**
     - Add INSERT policy for authenticated users to create their own profile
     - Ensure users can only insert profiles with their own user ID

  2. **Clients Table** 
     - Add INSERT policy for authenticated users to create their own client record
     - Ensure users can only insert client records linked to their own profile

  3. **Agents Table**
     - Add INSERT policy for authenticated users to create their own agent record  
     - Ensure users can only insert agent records linked to their own profile

  ## Security
  - All policies use auth.uid() to ensure users can only create records for themselves
  - Maintains data isolation and security while allowing proper registration flow
*/

-- Add INSERT policy for profiles table
CREATE POLICY "Users can insert own profile during registration"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Add INSERT policy for clients table  
CREATE POLICY "Users can insert own client record"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
  );

-- Add INSERT policy for agents table
CREATE POLICY "Users can insert own agent record"
  ON agents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
  );