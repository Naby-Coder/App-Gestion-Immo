import { useState } from 'react';
import { FileText, Eye, MessageSquare, Calendar, CheckCircle, X, Edit } from 'lucide-react';
import { clientRequests } from '../../data/clientData';
import { properties } from '../../data/properties';
import { formatDate } from '../../utils/formatters';

const ClientRequests = () => {
  const [requests, setRequests] = useState(clientRequests);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Nouveau':
        return <FileText size={16} className="text-blue-500" />;
      case 'En cours':
        return <MessageSquare size={16} className="text-yellow-500" />;
      case 'Traité':
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Nouveau':
        return 'bg-blue-100 text-blue-700';
      case 'En cours':
        return 'bg-yellow-100 text-yellow-700';
      case 'Traité':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPropertyTitle = (propertyId?: string) => {
    if (!propertyId) return "Demande générale";
    const property = properties.find(p => p.id === propertyId);
    return property ? property.title : "Bien non trouvé";
  };

  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
    setIsViewModalOpen(true);
  };

  const cancelRequest = (requestId: string) => {
    if (confirm('Êtes-vous sûr de vouloir annuler cette demande ?')) {
      setRequests(prev => prev.filter(req => req.id !== requestId));
      alert('Demande annulée avec succès');
    }
  };

  const followUpRequest = (request: any) => {
    alert(`Relance envoyée pour la demande concernant: ${getPropertyTitle(request.propertyId)}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Mes demandes</h1>
        <div className="flex items-center text-gray-600">
          <FileText size={20} className="mr-2" />
          <span>{requests.length} demande{requests.length > 1 ? 's' : ''}</span>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune demande</h3>
          <p className="text-gray-600">
            Vous n'avez pas encore fait de demande d'information.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bien concerné
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">
                        {getPropertyTitle(request.propertyId)}
                      </div>
                      {request.propertyId && (
                        <div className="text-sm text-gray-500">
                          ID: {request.propertyId}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 line-clamp-3">
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
                        {request.status !== 'Traité' && (
                          <>
                            <button 
                              onClick={() => followUpRequest(request)}
                              className="p-1 text-yellow-600 hover:text-yellow-800" 
                              title="Relancer"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => cancelRequest(request.id)}
                              className="p-1 text-red-600 hover:text-red-800" 
                              title="Annuler"
                            >
                              <X size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
                  <h3 className="text-lg font-medium mb-2">Bien concerné</h3>
                  <p className="text-gray-700">{getPropertyTitle(selectedRequest.propertyId)}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Message envoyé</h3>
                  <p className="bg-gray-50 p-4 rounded-md text-gray-700">{selectedRequest.message}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Date d'envoi</h3>
                    <p className="text-gray-900">{formatDate(selectedRequest.createdAt)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Statut</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(selectedRequest.status)}`}>
                      {getStatusIcon(selectedRequest.status)}
                      <span className="ml-1">{selectedRequest.status}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                {selectedRequest.status !== 'Traité' && (
                  <button 
                    onClick={() => {
                      followUpRequest(selectedRequest);
                      setIsViewModalOpen(false);
                    }}
                    className="btn-primary"
                  >
                    Relancer la demande
                  </button>
                )}
                <button 
                  onClick={() => setIsViewModalOpen(false)}
                  className="btn-outline"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientRequests;