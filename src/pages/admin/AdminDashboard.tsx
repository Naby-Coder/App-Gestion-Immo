import { 
  Building, Users, MessageSquare, CreditCard, TrendingUp, 
  Percent, Activity, Calendar 
} from 'lucide-react';
import { properties } from '../../data/properties';
import { clients } from '../../data/clients';
import { contactRequests } from '../../data/requests';
import { formatPrice } from '../../utils/formatters';

const AdminDashboard = () => {
  // Calculs des statistiques
  const totalProperties = properties.length;
  const propertiesForSale = properties.filter(p => p.status === 'Vente').length;
  const propertiesForRent = properties.filter(p => p.status === 'Location').length;
  const totalClients = clients.length;
  const newRequests = contactRequests.filter(r => r.status === 'Nouveau').length;
  
  // Données de graphique (simulées)
  const monthlyData = [150000, 320000, 210000, 450000, 280000, 390000];
  const maxValue = Math.max(...monthlyData);
  
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Tableau de bord</h1>
      
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
              <p className="text-sm font-medium text-gray-500">Clients</p>
              <p className="text-2xl font-bold">{totalClients}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-secondary-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xs font-medium text-success-500">+2 nouveaux ce mois</span>
            </div>
            <span className="text-xs font-medium text-gray-500">+12% vs mois dernier</span>
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
              <span className="text-xs font-medium text-warning-500">{newRequests} en attente</span>
            </div>
            <span className="text-xs font-medium text-gray-500">Temps moyen: 1j</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">CA Mensuel</p>
              <p className="text-2xl font-bold">{formatPrice(390000)}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-gray-600" />
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-success-500 mr-1" />
              <span className="text-xs font-medium text-success-500">+8.2%</span>
            </div>
            <span className="text-xs font-medium text-gray-500">vs mois dernier</span>
          </div>
        </div>
      </div>
      
      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Ventes Mensuelles</h2>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500">Cette année</span>
            </div>
          </div>
          
          <div className="h-64">
            <div className="flex h-full items-end space-x-6">
              {monthlyData.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-primary-100 rounded-t-sm" style={{ height: `${(value / maxValue) * 100}%` }}>
                    <div 
                      className="bg-primary-500 w-full h-full rounded-t-sm transition-all duration-500"
                      style={{ opacity: index === 5 ? 1 : 0.7 }}
                    ></div>
                  </div>
                  <div className="text-xs font-medium text-gray-500 mt-2">
                    {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'][index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Performance</h2>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500">Juin 2023</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Taux de conversion visites</span>
                <div className="flex items-center">
                  <Percent className="h-4 w-4 text-primary-500 mr-1" />
                  <span className="text-sm font-semibold text-primary-600">3.8%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Délai moyen de vente</span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-secondary-500 mr-1" />
                  <span className="text-sm font-semibold text-secondary-600">45 jours</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Satisfaction client</span>
                <div className="flex items-center">
                  <Activity className="h-4 w-4 text-success-500 mr-1" />
                  <span className="text-sm font-semibold text-success-600">4.7/5</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-success-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activities */}
      <div className="mt-8">
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
                    <span className="text-sm text-gray-600">Appartement T3 avec terrasse</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">Sophie Martin</span>
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
                    <span className="text-sm text-gray-600">Maison familiale avec jardin</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">Thomas Dubois</span>
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
                    <span className="text-sm font-medium text-gray-800">Offre acceptée</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">Studio moderne en centre-ville</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">Émilie Laurent</span>
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
                    <span className="text-sm text-gray-600">Local commercial en rez-de-chaussée</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">Thomas Dubois</span>
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
    </div>
  );
};

export default AdminDashboard;