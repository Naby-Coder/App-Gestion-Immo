/*
  # Fonctions utilitaires et vues

  1. Fonctions utilitaires
    - Recherche de biens avec filtres
    - Calcul de statistiques
    - Fonctions de notification

  2. Vues
    - Vue complète des biens avec informations agent
    - Vue des statistiques utilisateur
    - Vue des demandes en attente

  3. Optimisations
    - Index composites pour les recherches
    - Fonctions de performance
*/

-- Fonction de recherche de biens immobiliers
CREATE OR REPLACE FUNCTION rechercher_biens(
    p_type_bien text DEFAULT NULL,
    p_statut text DEFAULT NULL,
    p_ville text DEFAULT NULL,
    p_prix_min bigint DEFAULT NULL,
    p_prix_max bigint DEFAULT NULL,
    p_surface_min integer DEFAULT NULL,
    p_pieces_min integer DEFAULT NULL
)
RETURNS TABLE (
    id uuid,
    titre text,
    type_bien text,
    statut text,
    prix bigint,
    surface integer,
    nombre_pieces integer,
    ville text,
    agent_nom text,
    agent_telephone text,
    images text[]
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        b.id,
        b.titre,
        b.type_bien,
        b.statut,
        b.prix,
        b.surface,
        b.nombre_pieces,
        b.ville,
        CONCAT(p.prenom, ' ', p.nom) as agent_nom,
        p.telephone as agent_telephone,
        b.images
    FROM biens_immobiliers b
    LEFT JOIN agents a ON b.agent_id = a.id
    LEFT JOIN profils p ON a.user_id = p.id
    WHERE 
        (p_type_bien IS NULL OR b.type_bien = p_type_bien)
        AND (p_statut IS NULL OR b.statut = p_statut)
        AND (p_ville IS NULL OR b.ville ILIKE '%' || p_ville || '%')
        AND (p_prix_min IS NULL OR b.prix >= p_prix_min)
        AND (p_prix_max IS NULL OR b.prix <= p_prix_max)
        AND (p_surface_min IS NULL OR b.surface >= p_surface_min)
        AND (p_pieces_min IS NULL OR b.nombre_pieces >= p_pieces_min)
    ORDER BY b.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Vue des biens avec informations complètes
CREATE OR REPLACE VIEW vue_biens_complets AS
SELECT 
    b.id,
    b.titre,
    b.type_bien,
    b.statut,
    b.prix,
    b.surface,
    b.nombre_pieces,
    b.nombre_chambres,
    b.nombre_salles_bain,
    b.description,
    b.rue,
    b.ville,
    b.code_postal,
    b.pays,
    b.equipements,
    b.images,
    b.a_la_une,
    b.created_at,
    b.updated_at,
    CONCAT(p.prenom, ' ', p.nom) as agent_nom,
    p.telephone as agent_telephone,
    p.avatar_url as agent_avatar,
    a.bio as agent_bio,
    a.poste as agent_poste
FROM biens_immobiliers b
LEFT JOIN agents a ON b.agent_id = a.id
LEFT JOIN profils p ON a.user_id = p.id;

-- Vue des statistiques par agent
CREATE OR REPLACE VIEW vue_stats_agents AS
SELECT 
    a.id as agent_id,
    CONCAT(p.prenom, ' ', p.nom) as agent_nom,
    COUNT(b.id) as nombre_biens,
    COUNT(CASE WHEN b.statut = 'Vente' THEN 1 END) as biens_vente,
    COUNT(CASE WHEN b.statut = 'Location' THEN 1 END) as biens_location,
    COUNT(c.id) as nombre_contrats,
    COUNT(CASE WHEN c.statut = 'Signé' THEN 1 END) as contrats_signes,
    COALESCE(SUM(CASE WHEN c.statut = 'Signé' THEN c.montant END), 0) as chiffre_affaires
FROM agents a
JOIN profils p ON a.user_id = p.id
LEFT JOIN biens_immobiliers b ON a.id = b.agent_id
LEFT JOIN contrats c ON a.id = c.agent_id
GROUP BY a.id, p.prenom, p.nom;

-- Vue des demandes en attente
CREATE OR REPLACE VIEW vue_demandes_attente AS
SELECT 
    d.id,
    d.prenom,
    d.nom,
    d.email,
    d.telephone,
    d.message,
    d.statut,
    d.created_at,
    b.titre as bien_titre,
    b.ville as bien_ville,
    CONCAT(p.prenom, ' ', p.nom) as agent_assigne
FROM demandes_contact d
LEFT JOIN biens_immobiliers b ON d.bien_id = b.id
LEFT JOIN agents a ON d.assigne_a = a.id
LEFT JOIN profils p ON a.user_id = p.id
WHERE d.statut IN ('Nouveau', 'En cours')
ORDER BY d.created_at DESC;

-- Fonction pour obtenir les statistiques générales
CREATE OR REPLACE FUNCTION obtenir_statistiques_generales()
RETURNS jsonb AS $$
DECLARE
    stats jsonb;
BEGIN
    SELECT jsonb_build_object(
        'total_biens', (SELECT COUNT(*) FROM biens_immobiliers),
        'biens_vente', (SELECT COUNT(*) FROM biens_immobiliers WHERE statut = 'Vente'),
        'biens_location', (SELECT COUNT(*) FROM biens_immobiliers WHERE statut = 'Location'),
        'total_agents', (SELECT COUNT(*) FROM agents),
        'total_clients', (SELECT COUNT(*) FROM clients),
        'demandes_attente', (SELECT COUNT(*) FROM demandes_contact WHERE statut IN ('Nouveau', 'En cours')),
        'contrats_signes', (SELECT COUNT(*) FROM contrats WHERE statut = 'Signé'),
        'chiffre_affaires_total', (SELECT COALESCE(SUM(montant), 0) FROM contrats WHERE statut = 'Signé')
    ) INTO stats;
    
    RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Index composites pour optimiser les recherches
CREATE INDEX IF NOT EXISTS idx_biens_recherche ON biens_immobiliers(type_bien, statut, ville, prix);
CREATE INDEX IF NOT EXISTS idx_biens_surface_pieces ON biens_immobiliers(surface, nombre_pieces);
CREATE INDEX IF NOT EXISTS idx_contrats_agent_statut ON contrats(agent_id, statut);
CREATE INDEX IF NOT EXISTS idx_demandes_statut_date ON demandes_contact(statut, created_at);
