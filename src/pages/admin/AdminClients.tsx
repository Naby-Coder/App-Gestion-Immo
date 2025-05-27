import { useState } from 'react';
import { 
  Plus, Search, Eye, Edit, Trash2, ChevronLeft, ChevronRight, 
  Mail, Phone, Calendar
} from 'lucide-react';
import { clients } from '../../data/clients';
import { formatDate } from '../../utils/formatters';

const AdminClients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  // Filtrer les clients
  const filteredClients = clients.filter(client => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
    );
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Gestion des clients</h1>
        <button className="btn-primary flex items-center">
          <Plus size={16} className="mr-2" />
          Ajouter un client
        </button>
      </div>
      
      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>
      
      {/* Clients Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Préférences
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d'inscription
                </th>
                <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                        <span className="font-semibold">{client.firstName.charAt(0)}{client.lastName.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{client.firstName} {client.lastName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Mail size={16} className="mr-2" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone size={16} className="mr-2" />
                      <span>{client.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {client.preferences ? (
                      <div>
                        <div className="text-sm text-gray-900 mb-1">
                          {client.preferences.propertyTypes.join(', ')}
                        </div>
                        <div className="text-sm text-gray-500">
                          Budget: {client.preferences.budget.min.toLocaleString()} € - {client.preferences.budget.max.toLocaleString()} €
                        </div>
                        <div className="text-sm text-gray-500">
                          Zones: {client.preferences.locations.join(', ')}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Non renseignées</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-2" />
                      <span>{formatDate(client.createdAt)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800" title="Voir">
                        <Eye size={18} />
                      </button>
                      <button className="p-1 text-yellow-600 hover:text-yellow-800" title="Modifier">
                        <Edit size={18} />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800" title="Supprimer">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {currentClients.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Aucun client ne correspond à votre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredClients.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Affichage de <span className="font-medium">{startIndex + 1}</span> à{' '}
              <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredClients.length)}</span> sur{' '}
              <span className="font-medium">{filteredClients.length}</span> clients
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
              
              {totalPages > 5 && (
                <span className="flex items-center justify-center w-8 h-8 text-sm text-gray-500">...</span>
              )}
              
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

export default AdminClients;