/*
  # Schéma initial pour ImmoExpert

  1. Nouvelles tables
    - `profiles` - Profils utilisateurs étendus
    - `agents` - Agents immobiliers
    - `properties` - Biens immobiliers
    - `clients` - Clients
    - `contact_requests` - Demandes de contact
    - `favorites` - Biens favoris
    - `appointments` - Rendez-vous
    - `messages` - Messages entre agents et clients
    - `contracts` - Contrats
    - `payments` - Paiements

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques pour chaque rôle (admin, agent, client)
*/

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des profils utilisateurs (étend auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  avatar_url text,
  role text NOT NULL CHECK (role IN ('admin', 'agent', 'client')) DEFAULT 'client',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des agents immobiliers
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  bio text,
  position text DEFAULT 'Agent immobilier',
  specialties text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des biens immobiliers
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('Appartement', 'Maison', 'Terrain', 'Commerce', 'Bureau')),
  status text NOT NULL CHECK (status IN ('Vente', 'Location')) DEFAULT 'Vente',
  price bigint NOT NULL,
  surface integer NOT NULL,
  rooms integer NOT NULL DEFAULT 1,
  bedrooms integer NOT NULL DEFAULT 0,
  bathrooms integer NOT NULL DEFAULT 0,
  description text NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  zip_code text NOT NULL,
  country text NOT NULL DEFAULT 'Sénégal',
  features text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  agent_id uuid REFERENCES agents(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des clients
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  property_types text[] DEFAULT '{}',
  budget_min bigint DEFAULT 0,
  budget_max bigint DEFAULT 0,
  preferred_locations text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des demandes de contact
CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  property_id uuid REFERENCES properties(id),
  status text NOT NULL CHECK (status IN ('Nouveau', 'En cours', 'Traité')) DEFAULT 'Nouveau',
  assigned_to uuid REFERENCES agents(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des favoris
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, property_id)
);

-- Table des rendez-vous
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  agent_id uuid REFERENCES agents(id),
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  status text NOT NULL CHECK (status IN ('Programmé', 'Confirmé', 'Terminé', 'Annulé')) DEFAULT 'Programmé',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des messages
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  subject text NOT NULL,
  content text NOT NULL,
  read boolean DEFAULT false,
  property_id uuid REFERENCES properties(id),
  created_at timestamptz DEFAULT now()
);

-- Table des contrats
CREATE TABLE IF NOT EXISTS contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('Vente', 'Location')),
  status text NOT NULL CHECK (status IN ('Brouillon', 'En attente', 'Signé', 'Annulé')) DEFAULT 'Brouillon',
  client_id uuid REFERENCES clients(id),
  agent_id uuid REFERENCES agents(id),
  property_id uuid REFERENCES properties(id),
  amount bigint NOT NULL,
  signed_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des paiements
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('Commission', 'Loyer', 'Caution', 'Frais')),
  method text NOT NULL CHECK (method IN ('Virement', 'Chèque', 'Espèces', 'Carte')) DEFAULT 'Virement',
  status text NOT NULL CHECK (status IN ('En attente', 'Payé', 'Retard', 'Annulé')) DEFAULT 'En attente',
  contract_id uuid REFERENCES contracts(id),
  amount bigint NOT NULL,
  due_date date NOT NULL,
  paid_date timestamptz,
  reference text UNIQUE,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activer RLS sur toutes les tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Politiques pour les profils
CREATE POLICY "Les utilisateurs peuvent voir leur propre profil"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Les utilisateurs peuvent modifier leur propre profil"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Les admins peuvent tout voir"
  ON profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Politiques pour les agents
CREATE POLICY "Tout le monde peut voir les agents"
  ON agents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Les agents peuvent modifier leur profil"
  ON agents FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Politiques pour les biens
CREATE POLICY "Tout le monde peut voir les biens"
  ON properties FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Les agents peuvent gérer leurs biens"
  ON properties FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM agents a
      JOIN profiles p ON a.user_id = p.id
      WHERE a.id = agent_id AND p.id = auth.uid()
    )
  );

CREATE POLICY "Les admins peuvent gérer tous les biens"
  ON properties FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Politiques pour les clients
CREATE POLICY "Les clients peuvent voir leur profil"
  ON clients FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Les clients peuvent modifier leur profil"
  ON clients FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Politiques pour les favoris
CREATE POLICY "Les utilisateurs peuvent gérer leurs favoris"
  ON favorites FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Politiques pour les rendez-vous
CREATE POLICY "Les utilisateurs peuvent voir leurs rendez-vous"
  ON appointments FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM agents a
      JOIN profiles p ON a.user_id = p.id
      WHERE a.id = agent_id AND p.id = auth.uid()
    )
  );

CREATE POLICY "Les utilisateurs peuvent créer des rendez-vous"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Politiques pour les messages
CREATE POLICY "Les utilisateurs peuvent voir leurs messages"
  ON messages FOR SELECT
  TO authenticated
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Les utilisateurs peuvent envoyer des messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = auth.uid());

-- Politiques pour les demandes de contact
CREATE POLICY "Tout le monde peut créer des demandes"
  ON contact_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Les agents peuvent voir les demandes"
  ON contact_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'agent')
    )
  );

-- Index pour les performances
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_agent ON properties(agent_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_agent ON appointments(agent_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON contracts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();