import { useState } from 'react';
import { FileText, Eye, MessageSquare, Calendar, CheckCircle } from 'lucide-react';
import { clientRequests } from '../../data/clientData';
import { properties } from '../../data/properties';
import { formatDate } from '../../utils/formatters';

const ClientRequests = () => {
  const [requests] = useState(clientRequests);

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
                      <button className="text-primary-600 hover:text-primary-800" title="Voir les détails">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientRequests;