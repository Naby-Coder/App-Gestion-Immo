import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Phone, CheckCircle, XCircle, Edit, X } from 'lucide-react';
import { mockStorage } from '../../lib/mockData';
import { useAuth } from '../../components/auth/AuthProvider';
import { properties } from '../../data/properties';
import { agents } from '../../data/agents';
import { formatDate } from '../../utils/formatters';

const ClientAppointments = () => {
  const { user } = useAuth();
  const [appointmentsList, setAppointmentsList] = useState<any[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAppointments();
    }
  }, [user]);

  const loadAppointments = async () => {
    try {
      // Simuler un délai de réseau
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const allAppointments = mockStorage.get('appointments') || [];
      const userAppointments = allAppointments.filter((apt: any) => apt.userId === user?.id);
      setAppointmentsList(userAppointments);
    } catch (error) {
      console.error('Erreur lors du chargement des rendez-vous:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleViewAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsViewModalOpen(true);
  };

  const confirmAppointment = (appointmentId: string) => {
    const allAppointments = mockStorage.get('appointments') || [];
    const updatedAppointments = allAppointments.map((apt: any) =>
      apt.id === appointmentId ? { ...apt, status: 'Confirmé' } : apt
    );
    mockStorage.set('appointments', updatedAppointments);
    
    setAppointmentsList(prev =>
      prev.map(apt =>
        apt.id === appointmentId ? { ...apt, status: 'Confirmé' } : apt
      )
    );
    alert('Rendez-vous confirmé avec succès !');
  };

  const cancelAppointment = (appointmentId: string) => {
    if (confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
      const allAppointments = mockStorage.get('appointments') || [];
      const updatedAppointments = allAppointments.map((apt: any) =>
        apt.id === appointmentId ? { ...apt, status: 'Annulé' } : apt
      );
      mockStorage.set('appointments', updatedAppointments);
      
      setAppointmentsList(prev =>
        prev.map(apt =>
          apt.id === appointmentId ? { ...apt, status: 'Annulé' } : apt
        )
      );
      alert('Rendez-vous annulé');
    }
  };

  const rescheduleAppointment = (appointment: any) => {
    alert(`Demande de report envoyée pour le rendez-vous du ${formatDate(appointment.date + 'T00:00:00Z')}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

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
                      <button 
                        onClick={() => handleViewAppointment(appointment)}
                        className="btn-outline text-sm flex items-center justify-center"
                      >
                        <User size={14} className="mr-1" />
                        Voir détails
                      </button>
                      
                      {appointment.status === 'Programmé' && (
                        <>
                          <button 
                            onClick={() => confirmAppointment(appointment.id)}
                            className="btn-primary text-sm"
                          >
                            Confirmer
                          </button>
                          <button 
                            onClick={() => rescheduleAppointment(appointment)}
                            className="btn-outline text-sm flex items-center justify-center"
                          >
                            <Edit size={14} className="mr-1" />
                            Reporter
                          </button>
                        </>
                      )}
                      
                      {(appointment.status === 'Programmé' || appointment.status === 'Confirmé') && (
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

      {/* View Appointment Modal */}
      {isViewModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Détails du rendez-vous</h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Informations générales</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{formatDate(selectedAppointment.date + 'T00:00:00Z')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Heure</p>
                      <p className="font-medium">{selectedAppointment.time}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Bien concerné</h3>
                  <p className="text-gray-700">{getPropertyInfo(selectedAppointment.propertyId)?.title}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Agent responsable</h3>
                  <p className="text-gray-700">
                    {getAgentInfo(selectedAppointment.agentId)?.firstName} {getAgentInfo(selectedAppointment.agentId)?.lastName}
                  </p>
                </div>
                
                {selectedAppointment.notes && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Notes</h3>
                    <p className="bg-gray-50 p-4 rounded-md text-gray-700">{selectedAppointment.notes}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Statut</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(selectedAppointment.status)}`}>
                    {getStatusIcon(selectedAppointment.status)}
                    <span className="ml-1">{selectedAppointment.status}</span>
                  </span>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                {selectedAppointment.status === 'Programmé' && (
                  <button 
                    onClick={() => {
                      confirmAppointment(selectedAppointment.id);
                      setIsViewModalOpen(false);
                    }}
                    className="btn-primary"
                  >
                    Confirmer le rendez-vous
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

export default ClientAppointments;