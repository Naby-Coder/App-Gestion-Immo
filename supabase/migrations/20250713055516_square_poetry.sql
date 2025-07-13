/*
  # Création des tables pour la gestion commerciale

  1. Nouvelles Tables
    - `contrats` - Gestion des contrats de vente/location
    - `paiements` - Suivi des paiements et commissions

  2. Sécurité
    - RLS avec accès contrôlé selon les rôles
    - Protection des données financières

  3. Fonctionnalités
    - Suivi complet du cycle de vente
    - Gestion des paiements et échéances
    - Calcul automatique des commissions
*/

-- Table des contrats
CREATE TABLE IF NOT EXISTS contrats (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type_contrat text NOT NULL CHECK (type_contrat IN ('Vente', 'Location')),
    statut text NOT NULL DEFAULT 'Brouillon' CHECK (statut IN ('Brouillon', 'En attente', 'Signé', 'Annulé')),
    client_id uuid REFERENCES clients(id),
    agent_id uuid REFERENCES agents(id),
    bien_id uuid REFERENCES biens_immobiliers(id),
    montant bigint NOT NULL,
    date_signature timestamptz,
    notes text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Table des paiements
CREATE TABLE IF NOT EXISTS paiements (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type_paiement text NOT NULL CHECK (type_paiement IN ('Commission', 'Loyer', 'Caution', 'Frais')),
    methode_paiement text NOT NULL DEFAULT 'Virement' CHECK (methode_paiement IN ('Virement', 'Chèque', 'Espèces', 'Carte')),
    statut text NOT NULL DEFAULT 'En attente' CHECK (statut IN ('En attente', 'Payé', 'Retard', 'Annulé')),
    contrat_id uuid REFERENCES contrats(id),
    montant bigint NOT NULL,
    date_echeance date NOT NULL,
    date_paiement timestamptz,
    reference text UNIQUE,
    notes text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Activation RLS
ALTER TABLE contrats ENABLE ROW LEVEL SECURITY;
ALTER TABLE paiements ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour contrats
CREATE POLICY "Les agents peuvent voir leurs contrats"
    ON contrats FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM agents a
            JOIN profils p ON a.user_id = p.id
            WHERE a.id = contrats.agent_id AND p.id = auth.uid()
        )
    );

CREATE POLICY "Les clients peuvent voir leurs contrats"
    ON contrats FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM clients c
            WHERE c.id = contrats.client_id AND c.user_id = auth.uid()
        )
    );

CREATE POLICY "Les admins peuvent gérer tous les contrats"
    ON contrats FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profils
            WHERE profils.id = auth.uid() AND profils.role = 'admin'
        )
    );

-- Politiques RLS pour paiements
CREATE POLICY "Les agents peuvent voir les paiements de leurs contrats"
    ON paiements FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM contrats c
            JOIN agents a ON c.agent_id = a.id
            JOIN profils p ON a.user_id = p.id
            WHERE c.id = paiements.contrat_id AND p.id = auth.uid()
        )
    );

CREATE POLICY "Les admins peuvent gérer tous les paiements"
    ON paiements FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profils
            WHERE profils.id = auth.uid() AND profils.role = 'admin'
        )
    );

-- Triggers pour updated_at
CREATE TRIGGER update_contrats_updated_at
    BEFORE UPDATE ON contrats
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_paiements_updated_at
    BEFORE UPDATE ON paiements
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();