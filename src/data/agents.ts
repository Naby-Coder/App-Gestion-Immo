import { Agent } from '../types';

export const agents: Agent[] = [
  {
    id: '1',
    firstName: 'Sophie',
    lastName: 'Martin',
    email: 'sophie.martin@immoexpert.fr',
    phone: '06 12 34 56 78',
    bio: "Forte de 10 ans d'expérience dans l'immobilier de luxe, Sophie a développé une expertise particulière dans les biens d'exception. Attentive et professionnelle, elle saura vous accompagner dans votre projet immobilier avec passion et discrétion.",
    avatar: 'https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    position: 'Directrice des ventes'
  },
  {
    id: '2',
    firstName: 'Thomas',
    lastName: 'Dubois',
    email: 'thomas.dubois@immoexpert.fr',
    phone: '06 23 45 67 89',
    bio: "Spécialiste du marché immobilier lyonnais depuis 8 ans, Thomas connaît parfaitement chaque quartier et ses spécificités. Sa rigueur et son sens de la négociation sont des atouts majeurs pour concrétiser vos projets dans les meilleures conditions.",
    avatar: 'https://images.pexels.com/photos/5898586/pexels-photo-5898586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    position: 'Conseiller immobilier'
  },
  {
    id: '3',
    firstName: 'Émilie',
    lastName: 'Laurent',
    email: 'emilie.laurent@immoexpert.fr',
    phone: '06 34 56 78 90',
    bio: "Émilie a rejoint notre équipe il y a 5 ans après une formation en droit immobilier. Sa connaissance approfondie des aspects juridiques et sa capacité d'écoute lui permettent d'accompagner efficacement nos clients dans leurs démarches administratives.",
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    position: 'Conseillère juridique'
  }
];