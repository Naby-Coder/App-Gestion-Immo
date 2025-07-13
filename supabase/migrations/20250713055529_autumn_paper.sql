/*
  # Création des tables pour l'administration

  1. Nouvelles Tables
    - `actions_admin` - Journal des actions administrateur
    - `parametres_systeme` - Configuration système

  2. Sécurité
    - Accès restreint aux administrateurs uniquement
    - Audit trail complet des actions

  3. Fonctionnalités
    - Traçabilité des actions administratives
    - Configuration centralisée du système
*/

-- Table des actions administrateur (audit trail)
CREATE TABLE IF NOT EXISTS actions_admin (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id uuid REFERENCES profils(id) ON DELETE CASCADE,
    type_action text NOT NULL,
    utilisateur_cible_id uuid,
    ressource_cible_id uuid,
    details jsonb,
    created_at timestamptz DEFAULT now()
);

-- Table des paramètres système
CREATE TABLE IF NOT EXISTS parametres_systeme (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    cle text UNIQUE NOT NULL,
    valeur jsonb NOT NULL,
    description text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Index pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_actions_admin_admin_id ON actions_admin(admin_id);
CREATE INDEX IF NOT EXISTS idx_actions_admin_created_at ON actions_admin(created_at);

-- Activation RLS
ALTER TABLE actions_admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE parametres_systeme ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour actions_admin
CREATE POLICY "Les admins peuvent voir toutes les actions"
    ON actions_admin FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profils
            WHERE profils.id = auth.uid() AND profils.role = 'admin'
        )
    );

CREATE POLICY "Les admins peuvent insérer des actions"
    ON actions_admin FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profils
            WHERE profils.id = auth.uid() AND profils.role = 'admin'
        )
    );

-- Politiques RLS pour parametres_systeme
CREATE POLICY "Les admins peuvent gérer les paramètres"
    ON parametres_systeme FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profils
            WHERE profils.id = auth.uid() AND profils.role = 'admin'
        )
    );

-- Trigger pour updated_at
CREATE TRIGGER update_parametres_systeme_updated_at
    BEFORE UPDATE ON parametres_systeme
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();