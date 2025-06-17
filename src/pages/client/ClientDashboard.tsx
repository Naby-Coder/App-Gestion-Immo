import React from 'react';
import { Building2, FileText, MessageSquare, User, Calendar, Heart, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function ClientDashboard() {
  const recentActivities = [
    {
      id: 1,
      type: 'visit',
      title: 'Villa moderne avec vue sur mer aux Almadies',
      date: '2025-01-25',
      time: '14:00',
      status: 'À venir'
    },
    {
      id: 2,
      type: 'visit',
      title: 'Appartement de standing à Plateau',
      date: '2025-01-28',
      time: '10:30',
      status: 'Confirmé'
    },
    {
      id: 3,
      type: 'message',
      title: 'Réponse à votre demande d\'information',
      date: '2025-01-20',
      status: 'Non lu'
    }
  ];

  const recentMessages = [
    {
      id: 1,
      from: 'Mouhamed Ndione',
      subject: 'Confirmation de votre visite',
      preview: 'Bonjour Arame, je vous confirme notre rendez-vous pour la visite de la villa aux Almadies...',
      time: '2 heures',
      read: false
    },
    {
      id: 2,
      from: 'Fadel Fall',
      subject: 'Nouvelle proposition',
      preview: 'Suite à votre recherche, j\'ai trouvé un appartement qui pourrait vous intéresser...',
      time: '1 jour',
      read: true
    },
    {
      id: 3,
      from: 'Aïssatou Sall',
      subject: 'Documents pour le dossier',
      preview: 'Merci de me faire parvenir les documents demandés pour finaliser votre dossier...',
      time: '3 jours',
      read: false
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bonjour Arame !</h1>
        <p className="text-gray-600">Voici un aperçu de votre activité immobilière</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link to="/espace-client/favoris" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Mes biens favoris</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </Link>

        <Link to="/espace-client/demandes" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Mes demandes</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </Link>

        <Link to="/espace-client/messages" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Messages</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
              <span className="text-xs text-red-500">2 non lus</span>
            </div>
          </div>
        </Link>

        <Link to="/espace-client/rendez-vous" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Rendez-vous</p>
              <p className="text-2xl font-semibold text-gray-900">2</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Activité récente</h2>
            <Link to="/espace-client/rendez-vous" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Voir tout
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div className="flex items-start space-x-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    activity.type === 'visit' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {activity.type === 'visit' ? (
                      <Calendar size={16} className="text-blue-600" />
                    ) : (
                      <MessageSquare size={16} className="text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 line-clamp-1">{activity.title}</p>
                    <p className="text-sm text-gray-600">
                      {activity.type === 'visit' ? `${activity.date} à ${activity.time}` : activity.date}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  activity.status === 'À venir' ? 'bg-blue-100 text-blue-800' :
                  activity.status === 'Confirmé' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Messages récents</h2>
            <Link to="/espace-client/messages" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Voir tout
            </Link>
          </div>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div key={message.id} className="border-b pb-4 last:border-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className={`font-medium ${message.read ? 'text-gray-700' : 'text-gray-900'}`}>
                        {message.from}
                      </p>
                      {!message.read && (
                        <span className="h-2 w-2 bg-primary-600 rounded-full"></span>
                      )}
                    </div>
                    <p className={`text-sm mb-1 ${message.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {message.preview}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-gray-500">Il y a {message.time}</p>
                    <Link 
                      to="/espace-client/messages"
                      className="text-xs text-primary-600 hover:text-primary-700 mt-1 inline-block"
                    >
                      Répondre
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Besoin d'aide pour votre recherche ?</h3>
            <p className="text-primary-100">Nos experts sont là pour vous accompagner dans votre projet immobilier</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link to="/contact" className="bg-white text-primary-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
              Nous contacter
            </Link>
            <Link to="/biens" className="border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-primary-700 transition-colors">
              Voir les biens
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;