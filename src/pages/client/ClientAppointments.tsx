import { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, CheckCircle, XCircle } from 'lucide-react';
import { appointments } from '../../data/clientData';
import { properties } from '../../data/properties';
import { agents } from '../../data/agents';
import { formatDate } from '../../utils/formatters';

const ClientAppointments = () => {
  const [appointmentsList, setAppointmentsList] = useState(appointments);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Programmé':
        return <Clock size={16} className="text-blue-500" />;
      case 'Confirmé':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'Terminé':
        return <CheckCircle size={16} className="text-gray-500" />;
      case 'Annulé':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Programmé':
        return 'bg-blue-100 text-blue-700';
      case 'Confirmé':
        return 'bg-green-100 text-green-700';
      case 'Terminé':
        return 'bg-gray-100 text-gray-700';
      case 'Annulé':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPropertyInfo = (propertyId: string) => {
    return properties.find(p => p.id === propertyId);
  };

  const getAgentInfo = (agentId: string) => {
    return agents.find(a => a.id === agentId);
  };

  const cancelAppointment = (appointmentId: string) => {
    setAppointmentsList(prev =>
      prev.map(apt =>
        apt.id === appointmentId ? { ...apt, status: 'Annulé' as const } : apt
      )
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Mes rendez-vous</h1>
        <div className="flex items-center text-gray-600">
          <Calendar size={20} className="mr-2" />
          <span>{appointmentsList.length} rendez-vous</span>
        </div>
      </div>

      {appointmentsList.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun rendez-vous</h3>
          <p className="text-gray-600">
            Vous n'avez pas encore de rendez-vous programmé.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {appointmentsList.map((appointment) => {
            const property = getPropertyInfo(appointment.propertyId);
            const agent = getAgentInfo(appointment.agentId);
            
            return (
              <div key={appointment.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Visite de bien immobilier
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1">{appointment.status}</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Property Info */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Bien concerné</h4>
                          {property ? (
                            <div className="flex items-start space-x-3">
                              <img 
                                src={property.images[0]} 
                                alt={property.title}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                              <div>
                                <p className="text-sm font-medium text-gray-900 line-clamp-2">
                                  {property.title}
                                </p>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <MapPin size={14} className="mr-1" />
                                  <span>{property.address.city}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">Bien non trouvé</p>
                          )}
                        </div>

                        {/* Agent Info */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Agent</h4>
                          {agent ? (
                            <div className="flex items-center space-x-3">
                              <img 
                                src={agent.avatar} 
                                alt={`${agent.firstName} ${agent.lastName}`}
                                className="w-10 h-10 object-cover rounded-full"
                              />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {agent.firstName} {agent.lastName}
                                </p>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Phone size={14} className="mr-1" />
                                  <span>{agent.phone}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">Agent non trouvé</p>
                          )}
                        </div>
                      </div>

                      {/* Date and Time */}
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar size={16} className="mr-2" />
                          <span className="font-medium">{formatDate(appointment.date + 'T00:00:00Z')}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock size={16} className="mr-2" />
                          <span className="font-medium">{appointment.time}</span>
                        </div>
                      </div>

                      {/* Notes */}
                      {appointment.notes && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-1">Notes</h4>
                          <p className="text-sm text-gray-600">{appointment.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 lg:ml-6">
                      {appointment.status === 'Programmé' && (
                        <>
                          <button className="btn-primary text-sm">
                            Confirmer
                          </button>
                          <button 
                            onClick={() => cancelAppointment(appointment.id)}
                            className="btn-outline text-sm text-red-600 border-red-300 hover:bg-red-50"
                          >
                            Annuler
                          </button>
                        </>
                      )}
                      {appointment.status === 'Confirmé' && (
                        <button 
                          onClick={() => cancelAppointment(appointment.id)}
                          className="btn-outline text-sm text-red-600 border-red-300 hover:bg-red-50"
                        >
                          Annuler
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClientAppointments;