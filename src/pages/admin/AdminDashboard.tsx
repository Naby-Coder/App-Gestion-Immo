import { 
  Building, Users, MessageSquare, CreditCard, TrendingUp, 
  Percent, Activity, Calendar, Shield, UserCheck
} from 'lucide-react';
import { useAuth } from '../../components/auth/AuthProvider';
import { properties } from '../../data/properties';
import { contactRequests } from '../../data/requests';
import { formatPrice } from '../../utils/formatters';

const AdminDashboard = () => {
  const { user, profile } = useAuth();
  
  // Calculs des statistiques
  const totalProperties = properties.length;
  const propertiesForSale = properties.filter(p => p.status === 'Vente').length;
  const propertiesForRent = properties.filter(p => p.status === 'Location').length;
  const totalUsers = 156; // Simulation du nombre total d'utilisateurs
  const totalAdmins = 2;
  const totalAgents = 8;
  const totalClients = 146;
  const newRequests = contactRequests.filter(r => r.status === 'Nouveau').length;
  
  // Données adaptées selon le rôle
  const monthlyData = [
    { month: 'Jan', sales: 45000000, transactions: 8 },
    { month: 'Fév', sales: 62000000, transactions: 12 },
    { month: 'Mar', sales: 38000000, transactions: 6 },
    { month: 'Avr', sales: 78000000, transactions: 15 },
    { month: 'Mai', sales: 55000000, transactions: 10 },
    { month: 'Juin', sales: 89000000, transactions: 18 }
  ];
  
  const maxValue = Math.max(...monthlyData.map(d => d.sales));
  const currentMonthSales = monthlyData[monthlyData.length - 1].sales;
  
  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Bonjour {profile?.firstName || 'Administrateur'} !
      </h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Biens Total</p>
              <p className="text-2xl font-bold">{totalProperties}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
              <Building className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xs font-medium text-gray-500">Vente: {propertiesForSale}</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-xs font-medium text-gray-500">Location: {propertiesForRent}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Utilisateurs</p>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-secondary-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex space-x-4 text-xs">
                <span className="flex items-center">
                  <Shield size={12} className="mr-1 text-red-500" />
                  {totalAdmins} admins
                </span>
                <span className="flex items-center">
                  <UserCheck size={12} className="mr-1 text-blue-500" />
                  {totalAgents} agents
                </span>
                <span className="flex items-center">
                  <Users size={12} className="mr-1 text-green-500" />
                  {totalClients} clients
                </span>
              </div>
            </div>
            <span className="text-xs font-medium text-gray-500">+12 ce mois</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Demandes</p>
              <p className="text-2xl font-bold">{contactRequests.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-accent-100 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-accent-600" />
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xs font-medium text-warning-500">
                {newRequests} en attente
              </span>
            </div>
            <span className="text-xs font-medium text-gray-500">Temps moyen: 2j</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">CA Mensuel</p>
              <p className="text-2xl font-bold">
                {formatPrice(currentMonthSales)}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-gray-600" />
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-success-500 mr-1" />
              <span className="text-xs font-medium text-success-500">+12.5%</span>
            </div>
            <span className="text-xs font-medium text-gray-500">vs mois dernier</span>
          </div>
        </div>
      </div>
      
      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Ventes Mensuelles</h2>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500">2025</span>
            </div>
          </div>
          
          <div className="h-64">
            <div className="flex h-full items-end space-x-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-primary-100 rounded-t-sm relative group" style={{ height: `${(data.sales / maxValue) * 100}%` }}>
                    <div 
                      className="bg-primary-500 w-full h-full rounded-t-sm transition-all duration-300 hover:bg-primary-600"
                      style={{ opacity: index === monthlyData.length - 1 ? 1 : 0.8 }}
                    ></div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      <div>{formatPrice(data.sales)}</div>
                      <div>{data.transactions} transactions</div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-gray-500 mt-2">
                    {data.month}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Total: <span className="font-semibold">
                {formatPrice(monthlyData.reduce((sum, d) => sum + d.sales, 0))}
              </span>
            </p>
          </div>
        </div>
        
        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Performance Globale</h2>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500">Juin 2025</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Taux de conversion visites</span>
                <div className="flex items-center">
                  <Percent className="h-4 w-4 text-primary-500 mr-1" />
                  <span className="text-sm font-semibold text-primary-600">4.2%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Délai moyen de vente</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-secondary-500 mr-1" />
                  <span className="text-sm font-semibold text-secondary-600">38 jours</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Satisfaction client</span>
                <div className="flex items-center">
                  <Activity className="h-4 w-4 text-success-500 mr-1" />
                  <span className="text-sm font-semibold text-success-600">4.8/5</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-success-500 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Activités récentes</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3 border-b border-gray-200">Activité</th>
                <th className="px-6 py-3 border-b border-gray-200">Bien/Client</th>
                <th className="px-6 py-3 border-b border-gray-200">Agent</th>
                <th className="px-6 py-3 border-b border-gray-200">Date</th>
                <th className="px-6 py-3 border-b border-gray-200">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-800">Nouvelle demande</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">Villa moderne aux Almadies</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">Mouhamed Ndione</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">Aujourd'hui, 10:30</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-warning-100 text-warning-700">
                    En attente
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-800">Visite planifiée</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">Appartement de standing à Plateau</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">Fadel Fall</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">Aujourd'hui, 14:00</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700">
                    Confirmé
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-800">Vente finalisée</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">Villa de luxe à Saly</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">Aïssatou Sall</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">Hier, 16:45</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success-700">
                    Finalisé
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-800">Nouveau bien ajouté</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">Local commercial à Ngor</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">Fadel Fall</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">20 juin, 11:15</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                    Publié
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;