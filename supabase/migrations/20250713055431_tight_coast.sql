/*
  # Création des tables utilisateurs et profils

  1. Nouvelles Tables
    - `profils` - Profils utilisateurs étendus avec informations personnelles
    - `agents` - Informations spécifiques aux agents immobiliers
    - `clients` - Informations et préférences des clients

  2. Sécurité
    - Activation RLS sur toutes les tables
    - Politiques d'accès basées sur les rôles utilisateur
    - Contraintes de validation des données

  3. Fonctions
    - Fonction de mise à jour automatique des timestamps
    - Triggers pour updated_at
*/

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Table des profils utilisateurs (étend auth.users)
CREATE TABLE IF NOT EXISTS profils (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    prenom text NOT NULL,
    nom text NOT NULL,
    telephone text,
    avatar_url text,
    role text NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'agent', 'client')),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Table des agents immobiliers
CREATE TABLE IF NOT EXISTS agents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profils(id) ON DELETE CASCADE,
    bio text,
    poste text DEFAULT 'Agent immobilier',
    specialites text[],
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Table des clients
CREATE TABLE IF NOT EXISTS clients (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profils(id) ON DELETE CASCADE,
    types_biens text[] DEFAULT '{}',
    budget_min bigint DEFAULT 0,
    budget_max bigint DEFAULT 0,
    zones_preferees text[] DEFAULT '{}',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Activation RLS
ALTER TABLE profils ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour profils
CREATE POLICY "Les utilisateurs peuvent voir leur propre profil"
    ON profils FOR SELECT
    TO authenticated
    USING (id = auth.uid());

CREATE POLICY "Les utilisateurs peuvent insérer leur propre profil"
    ON profils FOR INSERT
    TO authenticated
    WITH CHECK (id = auth.uid());

CREATE POLICY "Les utilisateurs peuvent modifier leur propre profil"
    ON profils FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

CREATE POLICY "Les admins peuvent gérer tous les profils" --Les admins peuvent visualiser et modifier tous les profils utilisateurs
    ON profils FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profils p
            WHERE p.id = auth.uid() AND p.role = 'admin'
        )
    );

-- Politiques RLS pour agents
CREATE POLICY "Tout le monde peut voir les agents"
    ON agents FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Les utilisateurs peuvent insérer leur propre profil agent"
    ON agents FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Les agents peuvent modifier leur propre profil"
    ON agents FOR ALL
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Les admins peuvent gérer tous les agents"
    ON agents FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profils
            WHERE profils.id = auth.uid() AND profils.role = 'admin'
        )
    );

-- Politiques RLS pour clients
CREATE POLICY "Les clients peuvent voir et modifier leur propre profil"
    ON clients FOR ALL
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Les utilisateurs peuvent insérer leur propre profil client"
    ON clients FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Les agents peuvent voir les clients"
    ON clients FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profils
            WHERE profils.id = auth.uid() AND profils.role IN ('admin', 'agent')
        )
    );

CREATE POLICY "Les admins peuvent gérer tous les clients"
    ON clients FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profils
            WHERE profils.id = auth.uid() AND profils.role = 'admin'
        )
    );

-- Triggers pour updated_at
CREATE TRIGGER update_profils_updated_at
    BEFORE UPDATE ON profils
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at
    BEFORE UPDATE ON agents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON clients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
