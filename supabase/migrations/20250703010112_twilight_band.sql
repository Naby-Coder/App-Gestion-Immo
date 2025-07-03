/*
  # Politiques RLS (Row Level Security)

  1. Profiles
    - Les utilisateurs peuvent voir et modifier leur propre profil
    - Les admins peuvent tout voir et modifier

  2. Properties
    - Tout le monde peut voir les biens
    - Seuls les agents/admins peuvent créer/modifier leurs biens

  3. Favorites
    - Les utilisateurs peuvent gérer leurs propres favoris

  4. Messages
    - Les utilisateurs peuvent voir leurs messages (envoyés/reçus)

  5. Appointments
    - Les utilisateurs peuvent voir leurs rendez-vous
    - Les agents peuvent voir les rendez-vous qui leur sont assignés
*/

-- Politiques pour profiles
CREATE POLICY "Service role can access all profiles" ON profiles FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Politiques pour agents
CREATE POLICY "Tout le monde peut voir les agents" ON agents FOR SELECT TO authenticated USING (true);
CREATE POLICY "Les agents peuvent modifier leur profil" ON agents FOR UPDATE TO authenticated USING (
  user_id = auth.uid()
);

-- Politiques pour clients
CREATE POLICY "Les clients peuvent voir leur profil" ON clients FOR SELECT TO authenticated USING (
  user_id = auth.uid()
);
CREATE POLICY "Les clients peuvent modifier leur profil" ON clients FOR UPDATE TO authenticated USING (
  user_id = auth.uid()
);

-- Politiques pour properties
CREATE POLICY "Tout le monde peut voir les biens" ON properties FOR SELECT TO authenticated USING (true);
CREATE POLICY "Les agents peuvent gérer leurs biens" ON properties FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM agents a 
    JOIN profiles p ON a.user_id = p.id 
    WHERE a.id = properties.agent_id AND p.id = auth.uid()
  )
);
CREATE POLICY "Les admins peuvent gérer tous les biens" ON properties FOR ALL TO authenticated USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Politiques pour contact_requests
CREATE POLICY "Tout le monde peut créer des demandes" ON contact_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Les agents peuvent voir les demandes" ON contact_requests FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'agent')
  )
);

-- Politiques pour favorites
CREATE POLICY "Les utilisateurs peuvent gérer leurs favoris" ON favorites FOR ALL TO authenticated USING (
  user_id = auth.uid()
) WITH CHECK (user_id = auth.uid());

-- Politiques pour appointments
CREATE POLICY "Les utilisateurs peuvent créer des rendez-vous" ON appointments FOR INSERT TO authenticated WITH CHECK (
  user_id = auth.uid()
);
CREATE POLICY "Les utilisateurs peuvent voir leurs rendez-vous" ON appointments FOR SELECT TO authenticated USING (
  user_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM agents a 
    JOIN profiles p ON a.user_id = p.id 
    WHERE a.id = appointments.agent_id AND p.id = auth.uid()
  )
);

-- Politiques pour messages
CREATE POLICY "Les utilisateurs peuvent voir leurs messages" ON messages FOR SELECT TO authenticated USING (
  sender_id = auth.uid() OR receiver_id = auth.uid()
);
CREATE POLICY "Les utilisateurs peuvent envoyer des messages" ON messages FOR INSERT TO authenticated WITH CHECK (
  sender_id = auth.uid()
);