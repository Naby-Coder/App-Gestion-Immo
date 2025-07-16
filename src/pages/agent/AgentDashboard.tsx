import { 
  Building, Users, MessageSquare, CreditCard, TrendingUp, 
  Calendar, Activity, Target, Award, Clock
} from 'lucide-react';
import { useSupabaseAuth } from '../../components/auth/SupabaseAuthProvider';
import { formatPrice } from '../../utils/formatters';
import { contactRequests } from '../../data/requests';

const AgentDashboard = () => {
  const { user, profile } = useSupabaseAuth();
  
  // Statistiques spécifiques à l'agent
  const agentStats = {
    myProperties: 12,
    myClients: 28,
    myDeals: 6,
    newRequests: 4,
    monthlyCommission: 8500000,
    conversionRate: 18.5,
    averageDealTime: 32,
    clientSatisfaction: 4.7
  };
  
  // Données des ventes mensuelles pour l'agent
  const monthlyData = [
    { month: 'Jan', sales: 15000000, transactions: 3 },
    { month: 'Fév', sales: 22000000, transactions: 4 },
    { month: 'Mar', sales: 18000000, transactions: 2 },
    { month: 'Avr', sales: 28000000, transactions: 5 },
    { month: 'Mai', sales: 25000000, transactions: 4 },
    { month: 'Juin', sales: 35000000, transactions: 6 }
  ];
  
  const maxValue = Math.max(...monthlyData.map(d => d.sales));
  
  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bonjour {profile?.firstName || user?.firstName || 'Fadel'} !
        </h1>
        <p className="text-gray-600">Voici un aperçu de votre activité immobilière</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Mes Biens</p>
              <p className="text-2xl font-bold text-gray-900">{agentStats.myProperties}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
              <Building className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xs font-medium text-gray-500">Actifs: 8</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-xs font-medium text-gray-500">Vendus: 4</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Mes Clients</p>
              <p className="text-2xl font-bold text-gray-900">{agentStats.myClients}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-secondary-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xs font-medium text-gray-500">Actifs: 22</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-xs font-medium text-gray-500">Prospects: 6</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Mes Demandes</p>
              <p className="text-2xl font-bold text-gray-900">{Math.floor(contactRequests.length / 3)}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-accent-100 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-accent-600" />
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xs font-medium text-warning-500">
                {agentStats.newRequests} nouvelles
              </span>
            </div>
            <span className="text-xs font-medium text-gray-500">Temps moyen: 1j</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Ma Commission</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(agentStats.monthlyCommission)}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-gray-600" />
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-success-500 mr-1" />
              <span className="text-xs font-medium text-success-500">+18.2%</span>
            </div>
            <span className="text-xs font-medium text-gray-500">vs mois dernier</span>
          </div>
        </div>
      </div>
      
      {/* Charts and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Mes Ventes Mensuelles</h2>
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
              Mon total: <span className="font-semibold">
                {formatPrice(monthlyData.reduce((sum, d) => sum + d.sales, 0))}
              </span>
            </p>
          </div>
        </div>
        
        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Ma Performance</h2>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500">Juin 2025</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Taux de conversion</span>
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-primary-500 mr-1" />
                  <span className="text-sm font-semibold text-primary-600">{agentStats.conversionRate}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${agentStats.conversionRate}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Délai moyen de vente</span>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-secondary-500 mr-1" />
                  <span className="text-sm font-semibold text-secondary-600">{agentStats.averageDealTime} jours</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Satisfaction client</span>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-success-500 mr-1" />
                  <span className="text-sm font-semibold text-success-600">{agentStats.clientSatisfaction}/5</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-success-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ajouter un bien</h3>
              <p className="text-primary-100 text-sm">Publier un nouveau bien immobilier</p>
            </div>
            <Building className="h-8 w-8 text-primary-200" />
          </div>
          <button className="mt-4 bg-white text-primary-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium">
            Nouveau bien
          </button>
        </div>

        <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Mes rendez-vous</h3>
              <p className="text-secondary-100 text-sm">3 visites programmées aujourd'hui</p>
            </div>
            <Calendar className="h-8 w-8 text-secondary-200" />
          </div>
          <button className="mt-4 bg-white text-secondary-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium">
            Voir planning
          </button>
        </div>

        <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Mes clients</h3>
              <p className="text-accent-100 text-sm">2 nouveaux prospects cette semaine</p>
            </div>
            <Users className="h-8 w-8 text-accent-200" />
          </div>
          <button className="mt-4 bg-white text-accent-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium">
            Gérer clients
          </button>
        </div>
      </div>
      
      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Mes activités récentes</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3 border-b border-gray-200">Activité</th>
                <th className="px-6 py-3 border-b border-gray-200">Bien/Client</th>
                <th className="px-6 py-3 border-b border-gray-200">Date</th>
                <th className="px-6 py-3 border-b border-gray-200">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-800">Visite planifiée</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">Appartement de standing à Plateau</span>
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
                  <span className="text-sm font-medium text-gray-800">Nouveau client</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">Mamadou Gueye</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">Aujourd'hui, 10:30</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success-700">
                    Nouveau
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-800">Bien ajouté</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">Local commercial à Ngor</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">Hier, 11:15</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                    Publié
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-800">Demande reçue</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">Villa moderne aux Almadies</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">20 juin, 16:45</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-warning-100 text-warning-700">
                    En attente
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

export default AgentDashboard;
