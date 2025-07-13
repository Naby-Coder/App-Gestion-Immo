/*
  # Création des tables pour les demandes et communications

  1. Nouvelles Tables
    - `demandes_contact` - Demandes d'information des clients
    - `messages` - Système de messagerie interne
    - `rendez_vous` - Gestion des rendez-vous

  2. Sécurité
    - RLS avec politiques basées sur les rôles
    - Accès contrôlé selon le type d'utilisateur

  3. Fonctionnalités
    - Suivi des demandes par statut
    - Messagerie sécurisée entre utilisateurs
    - Planification des rendez-vous
*/

-- Table des demandes de contact
CREATE TABLE IF NOT EXISTS demandes_contact (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    prenom text NOT NULL,
    nom text NOT NULL,
    email text NOT NULL,
    telephone text NOT NULL,
    message text NOT NULL,
    bien_id uuid REFERENCES biens_immobiliers(id),
    statut text NOT NULL DEFAULT 'Nouveau' CHECK (statut IN ('Nouveau', 'En cours', 'Traité')),
    assigne_a uuid REFERENCES agents(id),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Table des messages
CREATE TABLE IF NOT EXISTS messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    expediteur_id uuid REFERENCES profils(id) ON DELETE CASCADE,
    destinataire_id uuid REFERENCES profils(id) ON DELETE CASCADE,
    sujet text NOT NULL,
    contenu text NOT NULL,
    lu boolean DEFAULT false,
    bien_id uuid REFERENCES biens_immobiliers(id),
    created_at timestamptz DEFAULT now()
);

-- Table des rendez-vous
CREATE TABLE IF NOT EXISTS rendez_vous (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profils(id) ON DELETE CASCADE,
    bien_id uuid REFERENCES biens_immobiliers(id) ON DELETE CASCADE,
    agent_id uuid REFERENCES agents(id),
    date_rendez_vous date NOT NULL,
    heure_rendez_vous time NOT NULL,
    statut text NOT NULL DEFAULT 'Programmé' CHECK (statut IN ('Programmé', 'Confirmé', 'Terminé', 'Annulé')),
    notes text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Index pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_messages_expediteur ON messages(expediteur_id);
CREATE INDEX IF NOT EXISTS idx_messages_destinataire ON messages(destinataire_id);
CREATE INDEX IF NOT EXISTS idx_rendez_vous_user ON rendez_vous(user_id);
CREATE INDEX IF NOT EXISTS idx_rendez_vous_agent ON rendez_vous(agent_id);

-- Activation RLS
ALTER TABLE demandes_contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE rendez_vous ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour demandes_contact
CREATE POLICY "Tout le monde peut créer des demandes"
    ON demandes_contact FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Les agents peuvent voir et modifier les demandes"
    ON demandes_contact FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profils
            WHERE profils.id = auth.uid() AND profils.role IN ('admin', 'agent')
        )
    );

CREATE POLICY "Les agents peuvent modifier les demandes assignées"
    ON demandes_contact FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM agents a
            JOIN profils p ON a.user_id = p.id
            WHERE a.id = demandes_contact.assigne_a AND p.id = auth.uid()
        )
    );

CREATE POLICY "Les admins peuvent gérer toutes les demandes"
    ON demandes_contact FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profils
            WHERE profils.id = auth.uid() AND profils.role = 'admin'
        )
    );

-- Politiques RLS pour messages
CREATE POLICY "Les utilisateurs peuvent voir leurs messages"
    ON messages FOR SELECT
    TO authenticated
    USING (expediteur_id = auth.uid() OR destinataire_id = auth.uid());

CREATE POLICY "Les utilisateurs peuvent envoyer des messages"
    ON messages FOR INSERT
    TO authenticated
    WITH CHECK (expediteur_id = auth.uid());

-- Politiques RLS pour rendez_vous
CREATE POLICY "Les utilisateurs peuvent créer des rendez-vous"
    ON rendez_vous FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Les utilisateurs peuvent voir leurs rendez-vous"
    ON rendez_vous FOR SELECT
    TO authenticated
    USING (
        user_id = auth.uid() OR 
        EXISTS (
            SELECT 1 FROM agents a
            JOIN profils p ON a.user_id = p.id
            WHERE a.id = rendez_vous.agent_id AND p.id = auth.uid()
        )
    );

-- Triggers pour updated_at
CREATE TRIGGER update_demandes_contact_updated_at
    BEFORE UPDATE ON demandes_contact
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rendez_vous_updated_at
    BEFORE UPDATE ON rendez_vous
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();