/*
  # Données d'exemple pour l'application ImmoExpert

  1. Agents d'exemple
    - Insertion d'agents avec des UUIDs valides générés automatiquement
    - Profils complets avec spécialités et expérience

  2. Biens immobiliers d'exemple
    - Propriétés variées (villas, appartements, bureaux, commerces)
    - Données réalistes pour le marché sénégalais
    - Images et caractéristiques détaillées
*/

-- Insérer des agents d'exemple avec des UUIDs générés automatiquement
INSERT INTO agents (bio, position, specialties) VALUES 
(
  'Fort de 10 ans d''expérience dans l''immobilier de luxe à Dakar, expert en biens d''exception.',
  'Directeur des ventes',
  ARRAY['Immobilier de luxe', 'Villas', 'Appartements haut de gamme']
),
(
  'Spécialiste du marché immobilier dakarois depuis 8 ans, connaissance parfaite de chaque quartier.',
  'Conseiller immobilier',
  ARRAY['Appartements', 'Bureaux', 'Négociation']
),
(
  'Experte en droit immobilier avec 5 ans d''expérience, accompagnement juridique complet.',
  'Conseillère juridique',
  ARRAY['Droit immobilier', 'Contrats', 'Fiscalité']
);

-- Récupérer les IDs des agents pour les associer aux biens
DO $$
DECLARE
    agent1_id uuid;
    agent2_id uuid;
    agent3_id uuid;
BEGIN
    -- Récupérer les IDs des agents dans l'ordre d'insertion
    SELECT id INTO agent1_id FROM agents WHERE position = 'Directeur des ventes' LIMIT 1;
    SELECT id INTO agent2_id FROM agents WHERE position = 'Conseiller immobilier' LIMIT 1;
    SELECT id INTO agent3_id FROM agents WHERE position = 'Conseillère juridique' LIMIT 1;

    -- Insérer des biens immobiliers d'exemple
    INSERT INTO properties (
      title, type, status, price, surface, rooms, bedrooms, bathrooms, 
      description, street, city, zip_code, features, images, featured, agent_id
    ) VALUES 
    (
      'Villa moderne avec vue sur mer aux Almadies',
      'Maison',
      'Vente',
      250000000,
      350,
      6,
      4,
      3,
      'Magnifique villa moderne située dans le quartier prisé des Almadies. Cette propriété d''exception offre une vue imprenable sur l''océan et dispose d''un grand jardin paysager. La villa comprend un vaste séjour lumineux, une cuisine équipée haut de gamme, quatre chambres avec salles de bains privatives, un bureau et une piscine à débordement.',
      '123 Route des Almadies',
      'Dakar',
      '12000',
      ARRAY['Piscine', 'Jardin', 'Garage double', 'Climatisation', 'Sécurité 24/7', 'Vue mer'],
      ARRAY['https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'],
      true,
      agent1_id
    ),
    (
      'Appartement de standing à Plateau',
      'Appartement',
      'Location',
      1500000,
      180,
      4,
      3,
      2,
      'Au cœur du quartier des affaires, superbe appartement de standing offrant des prestations haut de gamme. L''appartement comprend un double séjour avec balcon, une cuisine américaine équipée, trois chambres dont une suite parentale, et deux salles de bains modernes. Résidence sécurisée avec parking souterrain.',
      '45 Avenue Léopold Sédar Senghor',
      'Dakar',
      '11500',
      ARRAY['Ascenseur', 'Parking', 'Climatisation', 'Sécurité', 'Balcon'],
      ARRAY['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg'],
      true,
      agent2_id
    ),
    (
      'Local commercial à Ngor',
      'Commerce',
      'Location',
      800000,
      120,
      2,
      0,
      1,
      'Local commercial idéalement situé dans une zone à fort potentiel commercial. Le local dispose d''une grande vitrine sur rue, d''un espace de stockage et d''un parking privé. Parfait pour tout type de commerce ou bureau.',
      '78 Route de Ngor',
      'Dakar',
      '12100',
      ARRAY['Climatisation', 'Parking', 'Sécurité', 'Grande vitrine'],
      ARRAY['https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'],
      true,
      agent3_id
    ),
    (
      'Villa de luxe à Saly',
      'Maison',
      'Vente',
      350000000,
      450,
      8,
      5,
      4,
      'Somptueuse villa pieds dans l''eau à Saly. Cette propriété exceptionnelle offre des prestations haut de gamme avec accès direct à la plage. Grande piscine, jardin tropical, et espaces de vie spacieux.',
      '15 Boulevard Maritime',
      'Saly',
      '23000',
      ARRAY['Piscine', 'Accès plage', 'Jardin', 'Garage', 'Sécurité 24/7'],
      ARRAY['https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg'],
      true,
      agent1_id
    ),
    (
      'Bureau moderne à Plateau',
      'Bureau',
      'Location',
      2500000,
      200,
      4,
      0,
      2,
      'Espace de bureau moderne et fonctionnel au cœur du quartier d''affaires. Open space, salles de réunion, et bureaux privatifs. Idéal pour entreprise ou profession libérale.',
      '28 Rue Félix Faure',
      'Dakar',
      '11500',
      ARRAY['Climatisation', 'Fibre optique', 'Parking', 'Sécurité 24/7'],
      ARRAY['https://images.pexels.com/photos/1743555/pexels-photo-1743555.jpeg'],
      true,
      agent2_id
    ),
    (
      'Villa contemporaine à Fann',
      'Maison',
      'Vente',
      280000000,
      380,
      7,
      4,
      3,
      'Magnifique villa contemporaine située dans le quartier prisé de Fann. Cette propriété d''exception offre des prestations haut de gamme avec une architecture moderne. La villa comprend un vaste séjour cathédrale, une cuisine entièrement équipée, quatre grandes chambres avec salles de bains, un bureau, une salle de sport, et une piscine chauffée.',
      '45 Avenue Cheikh Anta Diop',
      'Dakar',
      '12100',
      ARRAY['Piscine chauffée', 'Salle de sport', 'Domotique', 'Jardin paysager', 'Garage double', 'Sécurité 24/7'],
      ARRAY['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'],
      true,
      agent3_id
    );

    -- Insérer quelques demandes de contact d'exemple
    INSERT INTO contact_requests (
      first_name, last_name, email, phone, message, property_id, status
    ) VALUES 
    (
      'Moussa',
      'Diop',
      'moussa.diop@email.com',
      '+221 77 123 45 67',
      'Bonjour, je suis intéressé par la villa aux Almadies. Serait-il possible d''organiser une visite ce weekend ? Merci d''avance.',
      (SELECT id FROM properties WHERE title = 'Villa moderne avec vue sur mer aux Almadies' LIMIT 1),
      'Nouveau'
    ),
    (
      'Khady',
      'Fall',
      'khady.fall@email.com',
      '+221 76 234 56 78',
      'Bonjour, je souhaiterais avoir plus d''informations sur l''appartement à Plateau, notamment concernant les charges et la disponibilité.',
      (SELECT id FROM properties WHERE title = 'Appartement de standing à Plateau' LIMIT 1),
      'En cours'
    ),
    (
      'Cheikh',
      'Mbaye',
      'cheikh.mbaye@email.com',
      '+221 78 345 67 89',
      'Bonjour, je cherche un bien pour investissement locatif dans le centre de Dakar. J''ai vu votre local commercial mais je serais plutôt intéressé pour l''acheter.',
      (SELECT id FROM properties WHERE title = 'Local commercial à Ngor' LIMIT 1),
      'Traité'
    ),
    (
      'Bineta',
      'Thiam',
      'bineta.thiam@email.com',
      '+221 70 456 78 90',
      'Bonjour, je souhaite prendre rendez-vous pour estimer ma maison située à Fann en vue d''une vente dans les prochains mois.',
      NULL,
      'Nouveau'
    );

END $$;