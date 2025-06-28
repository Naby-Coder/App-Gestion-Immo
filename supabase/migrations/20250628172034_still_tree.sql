/*
  # Données d'exemple pour ImmoExpert

  1. Création des profils utilisateurs
  2. Création des agents
  3. Création des biens immobiliers
  4. Création des clients avec préférences
  5. Création de quelques demandes de contact
*/

-- Insérer des profils utilisateurs d'exemple
INSERT INTO profiles (id, first_name, last_name, phone, role) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Mouhamed', 'Ndione', '+221 77 123 45 67', 'agent'),
  ('22222222-2222-2222-2222-222222222222', 'Fadel', 'Fall', '+221 76 234 56 78', 'agent'),
  ('33333333-3333-3333-3333-333333333333', 'Aïssatou', 'Sall', '+221 78 345 67 89', 'agent'),
  ('44444444-4444-4444-4444-444444444444', 'Amadou', 'Diallo', '+221 77 123 45 67', 'client'),
  ('55555555-5555-5555-5555-555555555555', 'Fatou', 'Sall', '+221 76 234 56 78', 'client'),
  ('66666666-6666-6666-6666-666666666666', 'Admin', 'System', '+221 33 123 45 67', 'admin')
ON CONFLICT (id) DO NOTHING;

-- Insérer des agents
INSERT INTO agents (id, user_id, bio, position, specialties) VALUES
  ('agent-1', '11111111-1111-1111-1111-111111111111', 
   'Fort de 10 ans d''expérience dans l''immobilier de luxe à Dakar, Mouhamed a développé une expertise particulière dans les biens d''exception.',
   'Directeur des ventes', 
   ARRAY['Immobilier de luxe', 'Villas', 'Investissement']),
  ('agent-2', '22222222-2222-2222-2222-222222222222',
   'Spécialiste du marché immobilier dakarois depuis 8 ans, Fadel connaît parfaitement chaque quartier et ses spécificités.',
   'Conseiller immobilier',
   ARRAY['Appartements', 'Bureaux', 'Location']),
  ('agent-3', '33333333-3333-3333-3333-333333333333',
   'Aïssatou a rejoint notre équipe il y a 5 ans après une formation en droit immobilier.',
   'Conseillère juridique',
   ARRAY['Droit immobilier', 'Contrats', 'Conseil'])
ON CONFLICT (id) DO NOTHING;

-- Insérer des biens immobiliers
INSERT INTO properties (id, title, type, status, price, surface, rooms, bedrooms, bathrooms, description, street, city, zip_code, features, images, featured, agent_id) VALUES
  ('prop-1', 'Villa moderne avec vue sur mer aux Almadies', 'Maison', 'Vente', 250000000, 350, 6, 4, 3,
   'Magnifique villa moderne située dans le quartier prisé des Almadies. Cette propriété d''exception offre une vue imprenable sur l''océan.',
   '123 Route des Almadies', 'Dakar', '12000',
   ARRAY['Piscine', 'Jardin', 'Garage double', 'Climatisation', 'Sécurité 24/7', 'Vue mer'],
   ARRAY['https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'],
   true, 'agent-1'),
  
  ('prop-2', 'Appartement de standing à Plateau', 'Appartement', 'Location', 1500000, 180, 4, 3, 2,
   'Au cœur du quartier des affaires, superbe appartement de standing offrant des prestations haut de gamme.',
   '45 Avenue Léopold Sédar Senghor', 'Dakar', '11500',
   ARRAY['Ascenseur', 'Parking', 'Climatisation', 'Sécurité', 'Balcon'],
   ARRAY['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
   true, 'agent-2'),
   
  ('prop-3', 'Local commercial à Ngor', 'Commerce', 'Location', 800000, 120, 2, 0, 1,
   'Local commercial idéalement situé dans une zone à fort potentiel commercial.',
   '78 Route de Ngor', 'Dakar', '12100',
   ARRAY['Climatisation', 'Parking', 'Sécurité', 'Grande vitrine'],
   ARRAY['https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg'],
   true, 'agent-3'),
   
  ('prop-4', 'Villa de luxe à Saly', 'Maison', 'Vente', 350000000, 450, 8, 5, 4,
   'Somptueuse villa pieds dans l''eau à Saly. Cette propriété exceptionnelle offre des prestations haut de gamme.',
   '15 Boulevard Maritime', 'Saly', '23000',
   ARRAY['Piscine', 'Accès plage', 'Jardin', 'Garage', 'Sécurité 24/7'],
   ARRAY['https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg'],
   true, 'agent-1'),
   
  ('prop-5', 'Bureau moderne à Plateau', 'Bureau', 'Location', 2500000, 200, 4, 0, 2,
   'Espace de bureau moderne et fonctionnel au cœur du quartier d''affaires.',
   '28 Rue Félix Faure', 'Dakar', '11500',
   ARRAY['Climatisation', 'Fibre optique', 'Parking', 'Sécurité 24/7'],
   ARRAY['https://images.pexels.com/photos/1743555/pexels-photo-1743555.jpeg'],
   true, 'agent-2'),
   
  ('prop-6', 'Villa contemporaine à Fann', 'Maison', 'Vente', 280000000, 380, 7, 4, 3,
   'Magnifique villa contemporaine située dans le quartier prisé de Fann.',
   '45 Avenue Cheikh Anta Diop', 'Dakar', '12100',
   ARRAY['Piscine chauffée', 'Salle de sport', 'Domotique', 'Jardin paysager', 'Garage double', 'Sécurité 24/7'],
   ARRAY['https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'],
   true, 'agent-3')
ON CONFLICT (id) DO NOTHING;

-- Insérer des clients
INSERT INTO clients (id, user_id, property_types, budget_min, budget_max, preferred_locations) VALUES
  ('client-1', '44444444-4444-4444-4444-444444444444',
   ARRAY['Appartement', 'Maison'], 50000000, 150000000, ARRAY['Dakar', 'Thiès']),
  ('client-2', '55555555-5555-5555-5555-555555555555',
   ARRAY['Appartement'], 30000000, 80000000, ARRAY['Dakar'])
ON CONFLICT (id) DO NOTHING;

-- Insérer quelques demandes de contact
INSERT INTO contact_requests (first_name, last_name, email, phone, message, property_id, status, assigned_to) VALUES
  ('Moussa', 'Diop', 'moussa.diop@email.com', '+221 77 123 45 67',
   'Bonjour, je suis intéressé par la villa aux Almadies. Serait-il possible d''organiser une visite ce weekend ?',
   'prop-1', 'Nouveau', 'agent-1'),
  ('Khady', 'Fall', 'khady.fall@email.com', '+221 76 234 56 78',
   'Bonjour, je souhaiterais avoir plus d''informations sur l''appartement à Plateau.',
   'prop-2', 'En cours', 'agent-2'),
  ('Bineta', 'Thiam', 'bineta.thiam@email.com', '+221 70 456 78 90',
   'Bonjour, je souhaite prendre rendez-vous pour estimer ma maison située à Fann.',
   NULL, 'Nouveau', NULL);

-- Insérer quelques favoris
INSERT INTO favorites (user_id, property_id) VALUES
  ('44444444-4444-4444-4444-444444444444', 'prop-1'),
  ('44444444-4444-4444-4444-444444444444', 'prop-2'),
  ('44444444-4444-4444-4444-444444444444', 'prop-4'),
  ('55555555-5555-5555-5555-555555555555', 'prop-2'),
  ('55555555-5555-5555-5555-555555555555', 'prop-5')
ON CONFLICT (user_id, property_id) DO NOTHING;

-- Insérer quelques rendez-vous
INSERT INTO appointments (user_id, property_id, agent_id, appointment_date, appointment_time, status, notes) VALUES
  ('44444444-4444-4444-4444-444444444444', 'prop-1', 'agent-1', '2025-01-25', '14:00', 'Confirmé', 'Visite de la villa aux Almadies'),
  ('44444444-4444-4444-4444-444444444444', 'prop-3', 'agent-3', '2025-01-28', '10:30', 'Programmé', 'Visite du local commercial à Ngor')
ON CONFLICT DO NOTHING;

-- Insérer quelques messages
INSERT INTO messages (sender_id, receiver_id, subject, content, property_id) VALUES
  ('11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444',
   'Confirmation de votre visite',
   'Bonjour, je vous confirme notre rendez-vous pour la visite de la villa aux Almadies le 25 janvier à 14h.',
   'prop-1'),
  ('22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444',
   'Nouvelle proposition',
   'Suite à votre recherche, j''ai trouvé un appartement qui pourrait vous intéresser.',
   NULL),
  ('33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444',
   'Documents pour le dossier',
   'Merci de me faire parvenir les documents demandés pour finaliser votre dossier.',
   NULL);