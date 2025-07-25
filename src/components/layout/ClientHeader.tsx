import { Menu, Bell, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useSupabaseAuth } from '../auth/SupabaseAuthProvider';

interface ClientHeaderProps {
  toggleSidebar: () => void;
}

const ClientHeader = ({ toggleSidebar }: ClientHeaderProps) => {
  const { profile } = useSupabaseAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'Confirmation de visite',
      message: 'Votre visite de la villa aux Almadies est confirmée pour demain à 14h',
      time: '30 min',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Nouveau bien correspondant',
      message: 'Un nouvel appartement correspondant à vos critères est disponible',
      time: '2h',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Message de votre agent',
      message: 'Votre agent vous a envoyé un message concernant votre recherche',
      time: '1 jour',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
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
            Espace Client
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
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
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
                  <button className="text-sm text-primary-600 hover:text-primary-800">
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
                Arame Diop
              </span>
              <ChevronDown size={16} />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-2">
                  <a
                    href="/espace-client/profil"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Mon profil
                  </a>
                  <a
                    href="/espace-client/favoris"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Mes favoris
                  </a>
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
  );
};

export default ClientHeader;