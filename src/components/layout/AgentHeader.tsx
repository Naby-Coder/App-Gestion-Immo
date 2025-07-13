import { Menu, Bell, User, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

interface AgentHeaderProps {
  toggleSidebar: () => void;
}

const AgentHeader = ({ toggleSidebar }: AgentHeaderProps) => {
  const { profile } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'Nouvelle demande de visite',
      message: 'Mamadou Gueye souhaite visiter l\'appartement de standing à Plateau demain à 15h. Il recherche un 3 pièces pour sa famille.',
      time: '5 min',
      read: false,
      details: {
        client: 'Mamadou Gueye',
        property: 'Appartement de standing à Plateau',
        requestedDate: 'Demain 15h00',
        budget: '80 000 000 XOF',
        contact: '+221 77 456 78 90'
      }
    },
    {
      id: 2,
      type: 'success',
      title: 'Contrat signé',
      message: 'Le contrat de vente pour la villa de luxe à Saly a été signé par Aïssatou Ndiaye. Commission: 10 500 000 XOF.',
      time: '1h',
      read: false,
      details: {
        client: 'Aïssatou Ndiaye',
        property: 'Villa de luxe à Saly',
        amount: '350 000 000 XOF',
        commission: '10 500 000 XOF',
        signedDate: 'Aujourd\'hui 14h30'
      }
    },
    {
      id: 3,
      type: 'warning',
      title: 'Rendez-vous à confirmer',
      message: 'Le rendez-vous avec Ibrahima Sarr pour la visite du local commercial à Ngor est en attente de confirmation.',
      time: '2h',
      read: true,
      details: {
        client: 'Ibrahima Sarr',
        property: 'Local commercial à Ngor',
        scheduledDate: 'Vendredi 10h00',
        status: 'En attente de confirmation',
        contact: '+221 76 234 56 78'
      }
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification: any) => {
    setSelectedNotification(notification);
    setIsNotificationModalOpen(true);
    setShowNotifications(false);
  };

  const markAllAsRead = () => {
    // Ici on marquerait toutes les notifications comme lues
    setShowNotifications(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <h1 className="ml-2 text-lg font-semibold text-gray-800 lg:ml-0">
              Espace Agent
            </h1>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    <span className="text-sm text-gray-500">{unreadCount} non lues</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                notification.type === 'success' ? 'bg-green-500' :
                                notification.type === 'warning' ? 'bg-yellow-500' :
                                'bg-blue-500'
                              }`}></div>
                              <h4 className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </h4>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {notification.message}
                            </p>
                            <span className="text-xs text-gray-500 mt-2 block">
                              Il y a {notification.time}
                            </span>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <button 
                      onClick={markAllAsRead}
                      className="text-sm text-primary-600 hover:text-primary-800 font-medium"
                    >
                      Marquer tout comme lu
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User size={16} className="text-primary-600" />
                </div>
                <span className="hidden md:block text-sm font-medium">
                  Fadel Fall
                </span>
                <ChevronDown size={16} />
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-2">
                    <Link
                      to="/agent/profil"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Mon profil
                    </Link>
                    <Link
                      to="/agent/biens"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Mes biens
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Close dropdowns when clicking outside */}
        {(showNotifications || showProfile) && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setShowNotifications(false);
              setShowProfile(false);
            }}
          ></div>
        )}
      </header>

      {/* Notification Detail Modal */}
      {isNotificationModalOpen && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">{selectedNotification.title}</h2>
              <button 
                onClick={() => setIsNotificationModalOpen(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  selectedNotification.type === 'success' ? 'bg-green-100 text-green-800' :
                  selectedNotification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    selectedNotification.type === 'success' ? 'bg-green-500' :
                    selectedNotification.type === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></div>
                  {selectedNotification.type === 'success' ? 'Succès' :
                   selectedNotification.type === 'warning' ? 'Attention' : 'Information'}
                </div>
                <p className="text-sm text-gray-500 mt-2">Il y a {selectedNotification.time}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Message</h3>
                <p className="text-gray-700">{selectedNotification.message}</p>
              </div>

              {selectedNotification.details && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Détails</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(selectedNotification.details).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-sm font-medium text-gray-500 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                        </span>
                        <p className="text-sm text-gray-900">{value as string}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setIsNotificationModalOpen(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Fermer
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                  Traiter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgentHeader;