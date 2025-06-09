import { useState } from 'react';
import { 
  Plus, Search, Filter, Eye, Edit, Trash2, Download,
  ChevronLeft, ChevronRight, Calendar, User, Building
} from 'lucide-react';
import { formatPrice, formatDate } from '../../utils/formatters';

interface Contract {
  id: string;
  type: 'Vente' | 'Location';
  status: 'Brouillon' | 'En attente' | 'Signé' | 'Annulé';
  clientName: string;
  agentName: string;
  propertyTitle: string;
  amount: number;
  createdAt: string;
  signedAt?: string;
}

const contracts: Contract[] = [
  {
    id: '1',
    type: 'Vente',
    status: 'Signé',
    clientName: 'Amadou Diallo',
    agentName: 'Mouhamed Ndione',
    propertyTitle: 'Villa moderne avec vue sur mer aux Almadies',
    amount: 250000000,
    createdAt: '2025-01-15T10:30:00Z',
    signedAt: '2025-01-20T14:00:00Z'
  },
  {
    id: '2',
    type: 'Location',
    status: 'En attente',
    clientName: 'Fatou Sall',
    agentName: 'Fadel Fall',
    propertyTitle: 'Appartement de standing à Plateau',
    amount: 1500000,
    createdAt: '2025-01-18T09:15:00Z'
  },
  {
    id: '3',
    type: 'Vente',
    status: 'Brouillon',
    clientName: 'Ousmane Ba',
    agentName: 'Aïssatou Sall',
    propertyTitle: 'Villa de luxe à Saly',
    amount: 350000000,
    createdAt: '2025-01-20T16:45:00Z'
  },
  {
    id: '4',
    type: 'Location',
    status: 'Signé',
    clientName: 'Aïssatou Ndiaye',
    agentName: 'Fadel Fall',
    propertyTitle: 'Bureau moderne à Plateau',
    amount: 2500000,
    createdAt: '2025-01-12T11:20:00Z',
    signedAt: '2025-01-16T10:30:00Z'
  },
  {
    id: '5',
    type: 'Vente',
    status: 'Annulé',
    clientName: 'Ibrahima Sarr',
    agentName: 'Mouhamed Ndione',
    propertyTitle: 'Villa contemporaine à Fann',
    amount: 280000000,
    createdAt: '2025-01-10T14:30:00Z'
  }
];

const AdminContracts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  // Filtrer les contrats
  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = (
      contract.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.agentName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesStatus = filterStatus === 'all' || contract.status === filterStatus;
    const matchesType = filterType === 'all' || contract.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentContracts = filteredContracts.slice(startIndex, startIndex + itemsPerPage);
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Brouillon':
        return 'bg-gray-100 text-gray-700';
      case 'En attente':
        return 'bg-warning-100 text-warning-700';
      case 'Signé':
        return 'bg-success-100 text-success-700';
      case 'Annulé':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Gestion des contrats</h1>
        <button className="btn-primary flex items-center">
          <Plus size={16} className="mr-2" />
          Nouveau contrat
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un contrat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input max-w-xs"
            >
              <option value="all">Tous les types</option>
              <option value="Vente">Vente</option>
              <option value="Location">Location</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input max-w-xs"
            >
              <option value="all">Tous les statuts</option>
              <option value="Brouillon">Brouillon</option>
              <option value="En attente">En attente</option>
              <option value="Signé">Signé</option>
              <option value="Annulé">Annulé</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Contracts Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contrat
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentContracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">
                        {contract.propertyTitle}
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          contract.type === 'Vente' ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-700'
                        }`}>
                          {contract.type}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <User size={16} className="text-gray-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {contract.clientName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contract.agentName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice(contract.amount)}
                      {contract.type === 'Location' && <span className="text-xs text-gray-500 ml-1">/mois</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1 text-gray-400" />
                        {formatDate(contract.createdAt)}
                      </div>
                      {contract.signedAt && (
                        <div className="text-xs text-gray-500 mt-1">
                          Signé le {formatDate(contract.signedAt)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(contract.status)}`}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800" title="Voir">
                        <Eye size={18} />
                      </button>
                      <button className="p-1 text-yellow-600 hover:text-yellow-800" title="Modifier">
                        <Edit size={18} />
                      </button>
                      <button className="p-1 text-green-600 hover:text-green-800" title="Télécharger">
                        <Download size={18} />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800" title="Supprimer">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {currentContracts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Aucun contrat ne correspond à votre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredContracts.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Affichage de <span className="font-medium">{startIndex + 1}</span> à{' '}
              <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredContracts.length)}</span> sur{' '}
              <span className="font-medium">{filteredContracts.length}</span> contrats
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 border rounded-md ${
                  currentPage === 1
                    ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                    : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`w-8 h-8 text-sm border rounded-md ${
                      currentPage === pageNumber
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 border rounded-md ${
                  currentPage === totalPages
                    ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                    : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContracts;