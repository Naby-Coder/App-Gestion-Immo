/*
  # Insertion des données initiales

  1. Données de base
    - Paramètres système par défaut
    - Configuration de l'application

  2. Données de démonstration
    - Profils utilisateurs de test
    - Agents et clients exemples
    - Biens immobiliers de démonstration

  3. Configuration
    - Paramètres de l'agence
    - Valeurs par défaut
*/

-- Insertion des paramètres système par défaut
INSERT INTO parametres_systeme (cle, valeur, description) VALUES
('nom_agence', '"ImmoExpert"', 'Nom de l''agence immobilière'),
('adresse_agence', '"123 Avenue Cheikh Anta Diop, Dakar, Sénégal"', 'Adresse de l''agence'),
('telephone_agence', '"+221 33 123 45 67"', 'Téléphone de l''agence'),
('email_agence', '"contact@immoexpert.sn"', 'Email de contact de l''agence'),
('site_web', '"www.immoexpert.sn"', 'Site web de l''agence'),
('taux_commission_defaut', '5', 'Taux de commission par défaut (%)'),
('devise', '"XOF"', 'Devise utilisée'),
('fuseau_horaire', '"Africa/Dakar"', 'Fuseau horaire'),
('langue_defaut', '"fr"', 'Langue par défaut'),
('notifications_email', 'true', 'Activer les notifications par email'),
('sauvegarde_auto', 'true', 'Activer la sauvegarde automatique'),
('mode_maintenance', 'false', 'Mode maintenance activé')
ON CONFLICT (cle) DO NOTHING;

-- Note: Les données utilisateurs seront créées via l'interface d'authentification Supabase
-- et les triggers/fonctions automatiques lors de l'inscription des utilisateurs.

-- Insertion de quelques types de biens standards
DO $$
BEGIN
    -- Cette section peut être utilisée pour insérer des données de démonstration
    -- si nécessaire, mais nous privilégions la création via l'interface utilisateur
    NULL;
END $$;
