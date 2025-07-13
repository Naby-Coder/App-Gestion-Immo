import { useState } from 'react';
import { Bell, Menu, Search, User } from 'lucide-react';

interface ClientHeaderProps {
  toggleSidebar: () => void;
}

const ClientHeader = ({ toggleSidebar }: ClientHeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const notifications = [
    { id: 1, message: 'Nouvelle réponse à votre demande', time: '10 min', unread: true },
    { id: 2, message: 'Rendez-vous confirmé pour demain', time: '1h', unread: true },
    { id: 3, message: 'Nouveau bien correspondant à vos critères', time: '2h', unread: false },
  ];
  
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-1 mr-3 text-gray-500 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">Mon espace</h1>
          </div>

          {/* Search */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1 text-gray-500 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}>
                        <div className="flex justify-between items-start">
                          <p className={`text-sm ${notification.unread ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                            {notification.message}
                          </p>
                          <span className="text-xs text-gray-500 ml-2">{notification.time}</span>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <button className="text-sm text-primary-600 hover:text-primary-800">
                      Voir toutes les notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile dropdown */}
            <div className="relative">
              <button className="flex items-center text-sm font-medium text-gray-700 rounded-full hover:text-gray-900 focus:outline-none">
                <span className="hidden md:block mr-2">Arame Diop</span>
                <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  <User size={16} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;