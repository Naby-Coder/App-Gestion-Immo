import { useState } from 'react';
import { 
  Plus, Search, Eye, Edit, Trash2, ChevronLeft, ChevronRight, 
  Mail, Phone, Calendar, MessageSquare, X
} from 'lucide-react';
import { clients as initialClients } from '../../data/clients';
import { formatDate } from '../../utils/formatters';
import AddClientModal from '../../components/admin/AddClientModal';

const AdminClients = () => {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
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

  const handleAddClient = (newClient: any) => {
    setClients(prev => [newClient, ...prev]);
    alert('Client ajouté avec succès !');
  };

  const handleViewClient = (client: any) => {
    setSelectedClient(client);
    setIsViewModalOpen(true);
  };

  const handleEditClient = (client: any) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleUpdateClient = (updatedClient: any) => {
    setClients(prev => prev.map(c => 
      c.id === updatedClient.id ? updatedClient : c
    ));
    setIsEditModalOpen(false);
    alert('Client modifié avec succès !');
  };

  const handleDeleteClient = (clientId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      setClients(prev => prev.filter(c => c.id !== clientId));
      alert('Client supprimé avec succès !');
    }
  };

  const handleSendMessage = (client: any) => {
    setSelectedClient(client);
    setIsMessageModalOpen(true);
  };

  const sendMessage = (message: string) => {
    console.log(`Message envoyé à ${selectedClient.firstName} ${selectedClient.lastName}: ${message}`);
    alert('Message envoyé avec succès !');
    setIsMessageModalOpen(false);
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Gestion des clients</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center"
        >
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
                      <button 
                        onClick={() => handleViewClient(client)}
                        className="p-1 text-blue-600 hover:text-blue-800" 
                        title="Voir"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleEditClient(client)}
                        className="p-1 text-yellow-600 hover:text-yellow-800" 
                        title="Modifier"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleSendMessage(client)}
                        className="p-1 text-green-600 hover:text-green-800" 
                        title="Envoyer un message"
                      >
                        <MessageSquare size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClient(client.id)}
                        className="p-1 text-red-600 hover:text-red-800" 
                        title="Supprimer"
                      >
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

      {/* Add Client Modal */}
      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddClient}
      />

      {/* View Client Modal */}
      {isViewModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Détails du client</h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Informations personnelles</h3>
                  <p><strong>Nom:</strong> {selectedClient.firstName} {selectedClient.lastName}</p>
                  <p><strong>Email:</strong> {selectedClient.email}</p>
                  <p><strong>Téléphone:</strong> {selectedClient.phone}</p>
                  <p><strong>Date d'inscription:</strong> {formatDate(selectedClient.createdAt)}</p>
                </div>
                {selectedClient.preferences && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Préférences</h3>
                    <p><strong>Types de biens:</strong> {selectedClient.preferences.propertyTypes.join(', ')}</p>
                    <p><strong>Budget:</strong> {selectedClient.preferences.budget.min.toLocaleString()} € - {selectedClient.preferences.budget.max.toLocaleString()} €</p>
                    <p><strong>Zones:</strong> {selectedClient.preferences.locations.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {isEditModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Modifier le client</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdateClient(selectedClient);
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                    <input
                      type="text"
                      value={selectedClient.firstName}
                      onChange={(e) => setSelectedClient(prev => ({ ...prev, firstName: e.target.value }))}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      value={selectedClient.lastName}
                      onChange={(e) => setSelectedClient(prev => ({ ...prev, lastName: e.target.value }))}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={selectedClient.email}
                      onChange={(e) => setSelectedClient(prev => ({ ...prev, email: e.target.value }))}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      value={selectedClient.phone}
                      onChange={(e) => setSelectedClient(prev => ({ ...prev, phone: e.target.value }))}
                      className="input"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn-outline">
                    Annuler
                  </button>
                  <button type="submit" className="btn-primary">
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Send Message Modal */}
      {isMessageModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Envoyer un message</h2>
              <button onClick={() => setIsMessageModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <p className="mb-4">À: {selectedClient.firstName} {selectedClient.lastName}</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                sendMessage(formData.get('message') as string);
              }}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Objet</label>
                  <input
                    type="text"
                    name="subject"
                    className="input"
                    placeholder="Objet du message"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="input"
                    placeholder="Votre message..."
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button type="button" onClick={() => setIsMessageModalOpen(false)} className="btn-outline">
                    Annuler
                  </button>
                  <button type="submit" className="btn-primary">
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClients;
