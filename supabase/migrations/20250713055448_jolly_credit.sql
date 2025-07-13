/*
  # Création des tables pour les biens immobiliers

  1. Nouvelles Tables
    - `biens_immobiliers` - Catalogue des propriétés
    - `favoris` - Biens favoris des utilisateurs

  2. Sécurité
    - RLS activé avec politiques appropriées
    - Contraintes de validation des données

  3. Index
    - Index sur les colonnes fréquemment recherchées
    - Optimisation des performances de recherche
*/

-- Table des biens immobiliers
CREATE TABLE IF NOT EXISTS biens_immobiliers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    titre text NOT NULL,
    type_bien text NOT NULL CHECK (type_bien IN ('Appartement', 'Maison', 'Terrain', 'Commerce', 'Bureau')),
    statut text NOT NULL DEFAULT 'Vente' CHECK (statut IN ('Vente', 'Location')),
    prix bigint NOT NULL,
    surface integer NOT NULL,
    nombre_pieces integer DEFAULT 1,
    nombre_chambres integer DEFAULT 0,
    nombre_salles_bain integer DEFAULT 0,
    description text NOT NULL,
    rue text NOT NULL,
    ville text NOT NULL,
    code_postal text NOT NULL,
    pays text NOT NULL DEFAULT 'Sénégal',
    equipements text[] DEFAULT '{}',
    images text[] DEFAULT '{}',
    a_la_une boolean DEFAULT false,
    agent_id uuid REFERENCES agents(id),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Table des favoris
CREATE TABLE IF NOT EXISTS favoris (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profils(id) ON DELETE CASCADE,
    bien_id uuid REFERENCES biens_immobiliers(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id, bien_id)
);

-- Index pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_biens_type ON biens_immobiliers(type_bien);
CREATE INDEX IF NOT EXISTS idx_biens_statut ON biens_immobiliers(statut);
CREATE INDEX IF NOT EXISTS idx_biens_ville ON biens_immobiliers(ville);
CREATE INDEX IF NOT EXISTS idx_biens_prix ON biens_immobiliers(prix);
CREATE INDEX IF NOT EXISTS idx_biens_agent ON biens_immobiliers(agent_id);
CREATE INDEX IF NOT EXISTS idx_favoris_user ON favoris(user_id);

-- Activation RLS
ALTER TABLE biens_immobiliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE favoris ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour biens_immobiliers
CREATE POLICY "Tout le monde peut voir les biens"
    ON biens_immobiliers FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Les agents peuvent gérer les biens qui leur sont assignés"
    ON biens_immobiliers FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM agents a
            JOIN profils p ON a.user_id = p.id
            WHERE a.id = biens_immobiliers.agent_id AND p.id = auth.uid()
        )
    );

CREATE POLICY "Les admins peuvent gérer tous les biens"
    ON biens_immobiliers FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profils
            WHERE profils.id = auth.uid() AND profils.role = 'admin'
        )
    );

-- Politiques RLS pour favoris
CREATE POLICY "Les utilisateurs peuvent gérer leurs favoris"
    ON favoris FOR ALL
    TO authenticated
    USING (user_id = auth.uid());

-- Triggers pour updated_at
CREATE TRIGGER update_biens_immobiliers_updated_at
    BEFORE UPDATE ON biens_immobiliers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();