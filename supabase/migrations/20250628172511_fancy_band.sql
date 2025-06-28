/*
  # Insertion de données d'exemple

  1. Agents d'exemple
    - Création d'agents avec des UUIDs valides
    - Bio et spécialités pour chaque agent
  
  2. Biens immobiliers
    - 6 propriétés d'exemple avec images et caractéristiques
    - Liés aux agents créés
  
  3. Demandes de contact
    - Exemples de demandes clients
    - Différents statuts (Nouveau, En cours, Traité)
*/

-- Insérer des agents (sans user_id pour l'instant, ils seront liés lors de l'inscription)
INSERT INTO agents (id, bio, position, specialties) VALUES
  ('11111111-1111-1111-1111-111111111111', 
   'Fort de 10 ans d''expérience dans l''immobilier de luxe à Dakar, Mouhamed a développé une expertise particulière dans les biens d''exception.',
   'Directeur des ventes', 
   ARRAY['Immobilier de luxe', 'Villas', 'Investissement']),
  ('22222222-2222-2222-2222-222222222222',
   'Spécialiste du marché immobilier dakarois depuis 8 ans, Fadel connaît parfaitement chaque quartier et ses spécificités.',
   'Conseiller immobilier',
   ARRAY['Appartements', 'Bureaux', 'Location']),
  ('33333333-3333-3333-3333-333333333333',
   'Aïssatou a rejoint notre équipe il y a 5 ans après une formation en droit immobilier.',
   'Conseillère juridique',
   ARRAY['Droit immobilier', 'Contrats', 'Conseil'])
ON CONFLICT (id) DO NOTHING;

-- Insérer des biens immobiliers
INSERT INTO properties (id, title, type, status, price, surface, rooms, bedrooms, bathrooms, description, street, city, zip_code, features, images, featured, agent_id) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Villa moderne avec vue sur mer aux Almadies', 'Maison', 'Vente', 250000000, 350, 6, 4, 3,
   'Magnifique villa moderne située dans le quartier prisé des Almadies. Cette propriété d''exception offre une vue imprenable sur l''océan et dispose d''un grand jardin paysager. La villa comprend un vaste séjour lumineux, une cuisine équipée haut de gamme, quatre chambres avec salles de bains privatives, un bureau et une piscine à débordement.',
   '123 Route des Almadies', 'Dakar', '12000',
   ARRAY['Piscine', 'Jardin', 'Garage double', 'Climatisation', 'Sécurité 24/7', 'Vue mer'],
   ARRAY['https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', 'https://images.pexels.com/photos/1396127/pexels-photo-1396127.jpeg'],
   true, '11111111-1111-1111-1111-111111111111'),
  
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Appartement de standing à Plateau', 'Appartement', 'Location', 1500000, 180, 4, 3, 2,
   'Au cœur du quartier des affaires, superbe appartement de standing offrant des prestations haut de gamme. L''appartement comprend un double séjour avec balcon, une cuisine américaine équipée, trois chambres dont une suite parentale, et deux salles de bains modernes. Résidence sécurisée avec parking souterrain.',
   '45 Avenue Léopold Sédar Senghor', 'Dakar', '11500',
   ARRAY['Ascenseur', 'Parking', 'Climatisation', 'Sécurité', 'Balcon'],
   ARRAY['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg', 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg'],
   true, '22222222-2222-2222-2222-222222222222'),
   
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Local commercial à Ngor', 'Commerce', 'Location', 800000, 120, 2, 0, 1,
   'Local commercial idéalement situé dans une zone à fort potentiel commercial. Le local dispose d''une grande vitrine sur rue, d''un espace de stockage et d''un parking privé. Parfait pour tout type de commerce ou bureau.',
   '78 Route de Ngor', 'Dakar', '12100',
   ARRAY['Climatisation', 'Parking', 'Sécurité', 'Grande vitrine'],
   ARRAY['https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg', 'https://images.pexels.com/photos/3932931/pexels-photo-3932931.jpeg', 'https://images.pexels.com/photos/3932932/pexels-photo-3932932.jpeg'],
   true, '33333333-3333-3333-3333-333333333333'),
   
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Villa de luxe à Saly', 'Maison', 'Vente', 350000000, 450, 8, 5, 4,
   'Somptueuse villa pieds dans l''eau à Saly. Cette propriété exceptionnelle offre des prestations haut de gamme avec accès direct à la plage. Grande piscine, jardin tropical, et espaces de vie spacieux.',
   '15 Boulevard Maritime', 'Saly', '23000',
   ARRAY['Piscine', 'Accès plage', 'Jardin', 'Garage', 'Sécurité 24/7'],
   ARRAY['https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg', 'https://images.pexels.com/photos/1732415/pexels-photo-1732415.jpeg', 'https://images.pexels.com/photos/1732416/pexels-photo-1732416.jpeg'],
   true, '11111111-1111-1111-1111-111111111111'),
   
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Bureau moderne à Plateau', 'Bureau', 'Location', 2500000, 200, 4, 0, 2,
   'Espace de bureau moderne et fonctionnel au cœur du quartier d''affaires. Open space, salles de réunion, et bureaux privatifs. Idéal pour entreprise ou profession libérale.',
   '28 Rue Félix Faure', 'Dakar', '11500',
   ARRAY['Climatisation', 'Fibre optique', 'Parking', 'Sécurité 24/7'],
   ARRAY['https://images.pexels.com/photos/1743555/pexels-photo-1743555.jpeg', 'https://images.pexels.com/photos/1743556/pexels-photo-1743556.jpeg', 'https://images.pexels.com/photos/1743557/pexels-photo-1743557.jpeg'],
   true, '22222222-2222-2222-2222-222222222222'),
   
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Villa contemporaine à Fann', 'Maison', 'Vente', 280000000, 380, 7, 4, 3,
   'Magnifique villa contemporaine située dans le quartier prisé de Fann. Cette propriété d''exception offre des prestations haut de gamme avec une architecture moderne. La villa comprend un vaste séjour cathédrale, une cuisine entièrement équipée, quatre grandes chambres avec salles de bains, un bureau, une salle de sport, et une piscine chauffée.',
   '45 Avenue Cheikh Anta Diop', 'Dakar', '12100',
   ARRAY['Piscine chauffée', 'Salle de sport', 'Domotique', 'Jardin paysager', 'Garage double', 'Sécurité 24/7'],
   ARRAY['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', 'https://images.pexels.com/photos/1396127/pexels-photo-1396127.jpeg'],
   true, '33333333-3333-3333-3333-333333333333')
ON CONFLICT (id) DO NOTHING;

-- Insérer quelques demandes de contact (sans assigned_to pour l'instant)
INSERT INTO contact_requests (first_name, last_name, email, phone, message, property_id, status) VALUES
  ('Moussa', 'Diop', 'moussa.diop@email.com', '+221 77 123 45 67',
   'Bonjour, je suis intéressé par la villa aux Almadies. Serait-il possible d''organiser une visite ce weekend ? Merci d''avance.',
   'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Nouveau'),
  ('Khady', 'Fall', 'khady.fall@email.com', '+221 76 234 56 78',
   'Bonjour, je souhaiterais avoir plus d''informations sur l''appartement à Plateau, notamment concernant les charges et la disponibilité. Pourriez-vous me contacter par téléphone ? Merci.',
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'En cours'),
  ('Cheikh', 'Mbaye', 'cheikh.mbaye@email.com', '+221 78 345 67 89',
   'Bonjour, je cherche un bien pour investissement locatif dans le centre de Dakar. J''ai vu votre local commercial mais je serais plutôt intéressé pour l''acheter. Avez-vous des biens similaires à vendre ? Cordialement.',
   'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Traité'),
  ('Bineta', 'Thiam', 'bineta.thiam@email.com', '+221 70 456 78 90',
   'Bonjour, je souhaite prendre rendez-vous pour estimer ma maison située à Fann en vue d''une vente dans les prochains mois. Quelles sont vos disponibilités ? Merci.',
   NULL, 'Nouveau'),
  ('Mamadou', 'Gueye', 'mamadou.gueye@email.com', '+221 75 567 89 01',
   'Bonjour, je suis à la recherche d''un bureau moderne dans le quartier Plateau pour y installer mon cabinet. J''ai vu votre annonce qui m''intéresse. Pourriez-vous me préciser les charges mensuelles et si un parking est inclus ? Cordialement.',
   'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'En cours')
ON CONFLICT DO NOTHING;