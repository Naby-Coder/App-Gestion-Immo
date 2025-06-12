import { useState } from 'react';
import { 
  Search, Filter, MessageSquare, Calendar, User, Check, 
  Clock, X, AlertCircle, ChevronLeft, ChevronRight, Eye, Reply
} from 'lucide-react';
import { contactRequests as initialRequests } from '../../data/requests';
import { properties } from '../../data/properties';
import { formatDate } from '../../utils/formatters';

const AdminRequests = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const itemsPerPage = 8;
  
  // Filtrer les demandes
  const filteredRequests = requests.filter(request => {
    const fullName = `${request.firstName} ${request.lastName}`.toLowerCase();
    const matchesSearch = (
      fullName.includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.propertyId && properties.find(p => p.id === request.propertyId)?.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const getPropertyTitle = (propertyId?: string) => {
    if (!propertyId) return "Demande générale";
    const property = properties.find(p => p.id === propertyId);
    return property ? property.title : "Bien non trouvé";
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Nouveau':
        return <AlertCircle size={16} className="text-warning-500" />;
      case 'En cours':
        return <Clock size={16} className="text-primary-500" />;
      case 'Traité':
        return <Check size={16} className="text-success-500" />;
      default:
        return null;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Nouveau':
        return 'bg-warning-100 text-warning-700';
      case 'En cours':
        return 'bg-primary-100 text-primary-700';
      case 'Traité':
        return 'bg-success-100 text-success-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
    setIsViewModalOpen(true);
  };

  const handleReplyRequest = (request: any) => {
    setSelectedRequest(request);
    setIsReplyModalOpen(true);
  };

  const handleMarkAsProcessed = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'Traité' as const } : req
    ));
    alert('Demande marquée comme traitée !');
  };

  const handleMarkAsInProgress = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'En cours' as const } : req
    ));
    alert('Demande marquée comme en cours !');
  };

  const handleIgnoreRequest = (requestId: string) => {
    if (confirm('Êtes-vous sûr de vouloir ignorer cette demande ?')) {
      setRequests(prev => prev.filter(req => req.id !== requestId));
      alert('Demande ignorée !');
    }
  };

  const sendReply = (message: string) => {
    console.log(`Réponse envoyée à ${selectedRequest.firstName} ${selectedRequest.lastName}: ${message}`);
    handleMarkAsInProgress(selectedRequest.id);
    setIsReplyModalOpen(false);
    alert('Réponse envoyée avec succès !');
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Gestion des demandes</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {requests.filter(r => r.status === 'Nouveau').length} nouvelles demandes
          </span>
        </div>
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
              placeholder="Rechercher une demande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input max-w-xs"
            >
              <option value="all">Tous les statuts</option>
              <option value="Nouveau">Nouveaux</option>
              <option value="En cours">En cours</option>
              <option value="Traité">Traités</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bien concerné
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
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
              {currentRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center">
                        <User size={18} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{request.firstName} {request.lastName}</div>
                        <div className="text-sm text-gray-500">{request.email}</div>
                        <div className="text-sm text-gray-500">{request.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-2">
                      {getPropertyTitle(request.propertyId)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 line-clamp-3">
                      {request.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-2" />
                      <span>{formatDate(request.createdAt)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1">{request.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center space-x-2">
                      <button 
                        onClick={() => handleViewRequest(request)}
                        className="p-1 text-blue-600 hover:text-blue-800" 
                        title="Voir les détails"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleReplyRequest(request)}
                        className="p-1 text-primary-600 hover:text-primary-800" 
                        title="Répondre"
                      >
                        <Reply size={18} />
                      </button>
                      <button 
                        onClick={() => handleMarkAsProcessed(request.id)}
                        className="p-1 text-success-600 hover:text-success-800" 
                        title="Marquer comme traité"
                      >
                        <Check size={18} />
                      </button>
                      <button 
                        onClick={() => handleIgnoreRequest(request.id)}
                        className="p-1 text-red-600 hover:text-red-800" 
                        title="Ignorer"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {currentRequests.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Aucune demande ne correspond à votre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredRequests.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Affichage de <span className="font-medium">{startIndex + 1}</span> à{' '}
              <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredRequests.length)}</span> sur{' '}
              <span className="font-medium">{filteredRequests.length}</span> demandes
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

      {/* View Request Modal */}
      {isViewModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Détails de la demande</h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Informations du contact</h3>
                  <p><strong>Nom:</strong> {selectedRequest.firstName} {selectedRequest.lastName}</p>
                  <p><strong>Email:</strong> {selectedRequest.email}</p>
                  <p><strong>Téléphone:</strong> {selectedRequest.phone}</p>
                  <p><strong>Date:</strong> {formatDate(selectedRequest.createdAt)}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Bien concerné</h3>
                  <p>{getPropertyTitle(selectedRequest.propertyId)}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Message</h3>
                  <p className="bg-gray-50 p-4 rounded-md">{selectedRequest.message}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Statut</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(selectedRequest.status)}`}>
                    {getStatusIcon(selectedRequest.status)}
                    <span className="ml-1">{selectedRequest.status}</span>
                  </span>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button 
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleReplyRequest(selectedRequest);
                  }}
                  className="btn-primary"
                >
                  Répondre
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {isReplyModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Répondre à la demande</h2>
              <button onClick={() => setIsReplyModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <p className="mb-4">À: {selectedRequest.firstName} {selectedRequest.lastName} ({selectedRequest.email})</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                sendReply(formData.get('message') as string);
              }}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Objet</label>
                  <input
                    type="text"
                    name="subject"
                    className="input"
                    defaultValue={`Re: ${getPropertyTitle(selectedRequest.propertyId)}`}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="input"
                    placeholder="Votre réponse..."
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button type="button" onClick={() => setIsReplyModalOpen(false)} className="btn-outline">
                    Annuler
                  </button>
                  <button type="submit" className="btn-primary">
                    Envoyer la réponse
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

export default AdminRequests;