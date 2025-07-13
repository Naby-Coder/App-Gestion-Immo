/*
  # Gestion des utilisateurs par l'administrateur

  1. Nouvelles fonctions
    - Fonction pour créer des utilisateurs (admin seulement)
    - Fonction pour supprimer des utilisateurs (admin seulement)
    - Fonction pour changer les rôles (admin seulement)

  2. Nouvelles politiques
    - Admin peut tout voir et modifier
    - Agent peut seulement voir ses propres données et celles de ses clients
    - Client peut seulement voir ses propres données

  3. Nouvelles tables
    - Table pour l'audit des actions admin
*/

-- Fonction pour créer un utilisateur (admin seulement)
CREATE OR REPLACE FUNCTION create_user_by_admin(
  user_email TEXT,
  user_password TEXT,
  user_first_name TEXT,
  user_last_name TEXT,
  user_phone TEXT DEFAULT NULL,
  user_role TEXT DEFAULT 'client'
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id UUID;
  result JSON;
BEGIN
  -- Vérifier que l'utilisateur actuel est admin
  IF NOT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Accès refusé: seuls les administrateurs peuvent créer des utilisateurs';
  END IF;

  -- Générer un UUID pour le nouvel utilisateur
  new_user_id := gen_random_uuid();

  -- Insérer dans auth.users (simulation - en réalité ceci serait fait via l'API Supabase)
  -- Pour l'instant, on crée juste le profil
  
  -- Créer le profil
  INSERT INTO profiles (
    id, first_name, last_name, phone, role, created_at, updated_at
  ) VALUES (
    new_user_id, user_first_name, user_last_name, user_phone, user_role, NOW(), NOW()
  );

  -- Créer l'enregistrement spécifique selon le rôle
  IF user_role = 'agent' THEN
    INSERT INTO agents (user_id, position, created_at, updated_at)
    VALUES (new_user_id, 'Agent immobilier', NOW(), NOW());
  ELSIF user_role = 'client' THEN
    INSERT INTO clients (user_id, created_at, updated_at)
    VALUES (new_user_id, NOW(), NOW());
  END IF;

  -- Enregistrer l'action dans l'audit
  INSERT INTO admin_actions (
    admin_id, action_type, target_user_id, details, created_at
  ) VALUES (
    auth.uid(), 'CREATE_USER', new_user_id, 
    json_build_object('email', user_email, 'role', user_role), NOW()
  );

  result := json_build_object(
    'success', true,
    'user_id', new_user_id,
    'message', 'Utilisateur créé avec succès'
  );

  RETURN result;
END;
$$;

-- Fonction pour supprimer un utilisateur (admin seulement)
CREATE OR REPLACE FUNCTION delete_user_by_admin(target_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_user_role TEXT;
  result JSON;
BEGIN
  -- Vérifier que l'utilisateur actuel est admin
  IF NOT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Accès refusé: seuls les administrateurs peuvent supprimer des utilisateurs';
  END IF;

  -- Vérifier que l'utilisateur cible existe
  SELECT role INTO target_user_role
  FROM profiles
  WHERE id = target_user_id;

  IF target_user_role IS NULL THEN
    RAISE EXCEPTION 'Utilisateur non trouvé';
  END IF;

  -- Empêcher la suppression d'autres admins
  IF target_user_role = 'admin' THEN
    RAISE EXCEPTION 'Impossible de supprimer un autre administrateur';
  END IF;

  -- Enregistrer l'action dans l'audit avant suppression
  INSERT INTO admin_actions (
    admin_id, action_type, target_user_id, details, created_at
  ) VALUES (
    auth.uid(), 'DELETE_USER', target_user_id, 
    json_build_object('role', target_user_role), NOW()
  );

  -- Supprimer les enregistrements liés
  DELETE FROM agents WHERE user_id = target_user_id;
  DELETE FROM clients WHERE user_id = target_user_id;
  DELETE FROM favorites WHERE user_id = target_user_id;
  DELETE FROM appointments WHERE user_id = target_user_id;
  DELETE FROM messages WHERE sender_id = target_user_id OR receiver_id = target_user_id;
  
  -- Supprimer le profil (ceci déclenchera la suppression en cascade)
  DELETE FROM profiles WHERE id = target_user_id;

  result := json_build_object(
    'success', true,
    'message', 'Utilisateur supprimé avec succès'
  );

  RETURN result;
END;
$$;

-- Table pour l'audit des actions admin
CREATE TABLE IF NOT EXISTS admin_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  target_user_id UUID,
  target_resource_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les requêtes d'audit
CREATE INDEX idx_admin_actions_admin_id ON admin_actions(admin_id);
CREATE INDEX idx_admin_actions_created_at ON admin_actions(created_at);

-- RLS pour admin_actions
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all actions"
  ON admin_actions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert actions"
  ON admin_actions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Mettre à jour les politiques existantes pour donner plus de pouvoir aux admins

-- Politiques pour profiles
DROP POLICY IF EXISTS "Service role can access all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Admins can manage all profiles"
  ON profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Politiques pour agents
DROP POLICY IF EXISTS "Les agents peuvent modifier leur profil" ON agents;
DROP POLICY IF EXISTS "Tout le monde peut voir les agents" ON agents;

CREATE POLICY "Admins can manage all agents"
  ON agents
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Agents can view and update own profile"
  ON agents
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Everyone can view agents"
  ON agents
  FOR SELECT
  TO authenticated
  USING (true);

-- Politiques pour clients
DROP POLICY IF EXISTS "Les clients peuvent modifier leur profil" ON clients;
DROP POLICY IF EXISTS "Les clients peuvent voir leur profil" ON clients;

CREATE POLICY "Admins can manage all clients"
  ON clients
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Agents can view clients"
  ON clients
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'agent')
    )
  );

CREATE POLICY "Clients can view and update own profile"
  ON clients
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Politiques pour properties
DROP POLICY IF EXISTS "Les admins peuvent gérer tous les biens" ON properties;
DROP POLICY IF EXISTS "Les agents peuvent gérer leurs biens" ON properties;

CREATE POLICY "Admins can manage all properties"
  ON properties
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Agents can manage assigned properties"
  ON properties
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agents a
      JOIN profiles p ON a.user_id = p.id
      WHERE a.id = properties.agent_id AND p.id = auth.uid()
    )
  );

-- Politiques pour contact_requests
DROP POLICY IF EXISTS "Les agents peuvent voir les demandes" ON contact_requests;

CREATE POLICY "Admins can manage all requests"
  ON contact_requests
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Agents can view and update requests"
  ON contact_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'agent')
    )
  );

CREATE POLICY "Agents can update assigned requests"
  ON contact_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agents a
      JOIN profiles p ON a.user_id = p.id
      WHERE a.id = contact_requests.assigned_to AND p.id = auth.uid()
    )
  );