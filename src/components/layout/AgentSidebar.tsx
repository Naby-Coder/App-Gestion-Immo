import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Building, Users, MessageSquare, FileText, 
  CreditCard, User, LogOut, X
} from 'lucide-react';
import { useSupabaseAuth } from '../auth/SupabaseAuthProvider';

interface AgentSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const AgentSidebar = ({ isOpen, toggleSidebar }: AgentSidebarProps) => {
  const location = useLocation();
  const { signOut } = useSupabaseAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path 
      ? 'bg-primary-700 text-white' 
      : 'text-gray-300 hover:bg-primary-700 hover:text-white';
  };

  const agentLinks = [
    { path: '/agent', icon: <LayoutDashboard size={20} />, label: 'Tableau de bord' },
    { path: '/agent/biens', icon: <Building size={20} />, label: 'Mes biens' },
    { path: '/agent/clients', icon: <Users size={20} />, label: 'Mes clients' },
    { path: '/agent/demandes', icon: <MessageSquare size={20} />, label: 'Mes demandes' },
    { path: '/agent/contrats', icon: <FileText size={20} />, label: 'Mes contrats' },
    { path: '/agent/paiements', icon: <CreditCard size={20} />, label: 'Mes paiements' },
    { path: '/agent/profil', icon: <User size={20} />, label: 'Mon profil' },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary-800 transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } lg:static lg:translate-x-0`}>
        
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-primary-700">
          <Link to="/agent" className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">Espace Agent</span>
          </Link>
          <button 
            onClick={toggleSidebar}
            className="p-1 text-white rounded-md hover:bg-primary-700 lg:hidden"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* User Info */}
        <div className="px-4 py-4 border-b border-primary-700">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white font-medium">Fadel Fall</p>
              <p className="text-primary-200 text-sm">Agent Immobilier</p>
            </div>
          </div>
        </div>
        
        {/* Sidebar content */}
        <div className="py-4 flex flex-col h-[calc(100%-140px)] justify-between">
          {/* Navigation links */}
          <nav className="px-2 space-y-1">
            {agentLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${isActive(link.path)}`}
              >
                <span className="mr-3">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Logout button */}
          <div className="px-2 mt-auto">
            <button 
              onClick={handleLogout}
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 rounded-md hover:bg-red-700 hover:text-white transition-colors duration-200"
            >
              <LogOut size={20} className="mr-3" />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AgentSidebar;
