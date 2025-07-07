/*
  # Insert sample data for agents and properties

  1. Sample Data
    - Insert 3 sample agents with proper UUIDs
    - Insert 6 sample properties with proper UUIDs and references to agents
  
  2. Data includes
    - Agents with bio, position, and specialties
    - Properties with all required fields and proper relationships
*/

-- Insérer des agents d'exemple (ces IDs seront utilisés pour les biens)
INSERT INTO agents (id, bio, position, specialties) VALUES 
(
  'a1111111-1111-4111-8111-111111111111'::uuid,
  'Fort de 10 ans d''expérience dans l''immobilier de luxe à Dakar, expert en biens d''exception.',
  'Directeur des ventes',
  ARRAY['Immobilier de luxe', 'Villas', 'Appartements haut de gamme']
),
(
  'a2222222-2222-4222-8222-222222222222'::uuid,
  'Spécialiste du marché immobilier dakarois depuis 8 ans, connaissance parfaite de chaque quartier.',
  'Conseiller immobilier',
  ARRAY['Appartements', 'Bureaux', 'Négociation']
),
(
  'a3333333-3333-4333-8333-333333333333'::uuid,
  'Experte en droit immobilier avec 5 ans d''expérience, accompagnement juridique complet.',
  'Conseillère juridique',
  ARRAY['Droit immobilier', 'Contrats', 'Fiscalité']
);

-- Insérer des biens immobiliers d'exemple
INSERT INTO properties (
  id, title, type, status, price, surface, rooms, bedrooms, bathrooms, 
  description, street, city, zip_code, features, images, featured, agent_id
) VALUES 
(
  'b1111111-1111-4111-8111-111111111111'::uuid,
  'Villa moderne avec vue sur mer aux Almadies',
  'Maison',
  'Vente',
  250000000,
  350,
  6,
  4,
  3,
  'Magnifique villa moderne située dans le quartier prisé des Almadies. Cette propriété d''exception offre une vue imprenable sur l''océan et dispose d''un grand jardin paysager.',
  '123 Route des Almadies',
  'Dakar',
  '12000',
  ARRAY['Piscine', 'Jardin', 'Garage double', 'Climatisation', 'Sécurité 24/7', 'Vue mer'],
  ARRAY['https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'],
  true,
  'a1111111-1111-4111-8111-111111111111'::uuid
),
(
  'b2222222-2222-4222-8222-222222222222'::uuid,
  'Appartement de standing à Plateau',
  'Appartement',
  'Location',
  1500000,
  180,
  4,
  3,
  2,
  'Au cœur du quartier des affaires, superbe appartement de standing offrant des prestations haut de gamme.',
  '45 Avenue Léopold Sédar Senghor',
  'Dakar',
  '11500',
  ARRAY['Ascenseur', 'Parking', 'Climatisation', 'Sécurité', 'Balcon'],
  ARRAY['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg'],
  true,
  'a2222222-2222-4222-8222-222222222222'::uuid
),
(
  'b3333333-3333-4333-8333-333333333333'::uuid,
  'Local commercial à Ngor',
  'Commerce',
  'Location',
  800000,
  120,
  2,
  0,
  1,
  'Local commercial idéalement situé dans une zone à fort potentiel commercial.',
  '78 Route de Ngor',
  'Dakar',
  '12100',
  ARRAY['Climatisation', 'Parking', 'Sécurité', 'Grande vitrine'],
  ARRAY['https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'],
  true,
  'a3333333-3333-4333-8333-333333333333'::uuid
),
(
  'b4444444-4444-4444-8444-444444444444'::uuid,
  'Villa de luxe à Saly',
  'Maison',
  'Vente',
  350000000,
  450,
  8,
  5,
  4,
  'Somptueuse villa pieds dans l''eau à Saly. Cette propriété exceptionnelle offre des prestations haut de gamme avec accès direct à la plage.',
  '15 Boulevard Maritime',
  'Saly',
  '23000',
  ARRAY['Piscine', 'Accès plage', 'Jardin', 'Garage', 'Sécurité 24/7'],
  ARRAY['https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg'],
  true,
  'a1111111-1111-4111-8111-111111111111'::uuid
),
(
  'b5555555-5555-4555-8555-555555555555'::uuid,
  'Bureau moderne à Plateau',
  'Bureau',
  'Location',
  2500000,
  200,
  4,
  0,
  2,
  'Espace de bureau moderne et fonctionnel au cœur du quartier d''affaires.',
  '28 Rue Félix Faure',
  'Dakar',
  '11500',
  ARRAY['Climatisation', 'Fibre optique', 'Parking', 'Sécurité 24/7'],
  ARRAY['https://images.pexels.com/photos/1743555/pexels-photo-1743555.jpeg'],
  true,
  'a2222222-2222-4222-8222-222222222222'::uuid
),
(
  'b6666666-6666-4666-8666-666666666666'::uuid,
  'Villa contemporaine à Fann',
  'Maison',
  'Vente',
  280000000,
  380,
  7,
  4,
  3,
  'Magnifique villa contemporaine située dans le quartier prisé de Fann.',
  '45 Avenue Cheikh Anta Diop',
  'Dakar',
  '12100',
  ARRAY['Piscine chauffée', 'Salle de sport', 'Domotique', 'Jardin paysager', 'Garage double', 'Sécurité 24/7'],
  ARRAY['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'],
  true,
  'a3333333-3333-4333-8333-333333333333'::uuid
);