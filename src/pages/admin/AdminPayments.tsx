import { useState } from 'react';
import { 
  Plus, Search, Filter, Eye, Edit, Trash2, Download,
  ChevronLeft, ChevronRight, Calendar, CreditCard, AlertCircle
} from 'lucide-react';
import { formatPrice, formatDate } from '../../utils/formatters';
import AddPaymentModal from '../../components/admin/AddPaymentModal';

interface Payment {
  id: string;
  type: 'Commission' | 'Loyer' | 'Caution' | 'Frais';
  method: 'Virement' | 'Chèque' | 'Espèces' | 'Carte';
  status: 'En attente' | 'Payé' | 'Retard' | 'Annulé';
  clientName: string;
  propertyTitle: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  reference: string;
}

const initialPayments: Payment[] = [
  {
    id: '1',
    type: 'Commission',
    method: 'Virement',
    status: 'Payé',
    clientName: 'Amadou Diallo',
    propertyTitle: 'Villa moderne avec vue sur mer aux Almadies',
    amount: 12500000,
    dueDate: '2025-01-20T00:00:00Z',
    paidDate: '2025-01-18T14:30:00Z',
    reference: 'COM-2025-001'
  },
  {
    id: '2',
    type: 'Loyer',
    method: 'Virement',
    status: 'En attente',
    clientName: 'Fatou Sall',
    propertyTitle: 'Appartement de standing à Plateau',
    amount: 1500000,
    dueDate: '2025-02-01T00:00:00Z',
    reference: 'LOY-2025-002'
  },
  {
    id: '3',
    type: 'Caution',
    method: 'Chèque',
    status: 'Payé',
    clientName: 'Ousmane Ba',
    propertyTitle: 'Bureau moderne à Plateau',
    amount: 5000000,
    dueDate: '2025-01-15T00:00:00Z',
    paidDate: '2025-01-14T10:00:00Z',
    reference: 'CAU-2025-003'
  },
  {
    id: '4',
    type: 'Frais',
    method: 'Espèces',
    status: 'Retard',
    clientName: 'Aïssatou Ndiaye',
    propertyTitle: 'Local commercial à Ngor',
    amount: 400000,
    dueDate: '2025-01-10T00:00:00Z',
    reference: 'FRA-2025-004'
  },
  {
    id: '5',
    type: 'Commission',
    method: 'Carte',
    status: 'Payé',
    clientName: 'Ibrahima Sarr',
    propertyTitle: 'Villa de luxe à Saly',
    amount: 17500000,
    dueDate: '2025-01-25T00:00:00Z',
    paidDate: '2025-01-23T16:45:00Z',
    reference: 'COM-2025-005'
  }
];

const AdminPayments = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const itemsPerPage = 8;
  
  // Filtrer les paiements
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = (
      payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesType = filterType === 'all' || payment.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'En attente':
        return 'bg-warning-100 text-warning-700';
      case 'Payé':
        return 'bg-success-100 text-success-700';
      case 'Retard':
        return 'bg-red-100 text-red-700';
      case 'Annulé':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Retard':
        return <AlertCircle size={14} className="mr-1" />;
      default:
        return null;
    }
  };

  const handleAddPayment = (newPayment: any) => {
    setPayments(prev => [newPayment, ...prev]);
    alert('Paiement créé avec succès !');
  };

  const handleDeletePayment = (paymentId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?')) {
      setPayments(prev => prev.filter(p => p.id !== paymentId));
      alert('Paiement supprimé avec succès !');
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Gestion des paiements</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Nouveau paiement
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total à recevoir</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatPrice(payments.filter(p => p.status === 'En attente').reduce((sum, p) => sum + p.amount, 0))}
              </p>
            </div>
            <div className="h-8 w-8 bg-warning-100 rounded-full flex items-center justify-center">
              <Calendar size={16} className="text-warning-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Payé ce mois</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatPrice(payments.filter(p => p.status === 'Payé').reduce((sum, p) => sum + p.amount, 0))}
              </p>
            </div>
            <div className="h-8 w-8 bg-success-100 rounded-full flex items-center justify-center">
              <CreditCard size={16} className="text-success-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">En retard</p>
              <p className="text-lg font-semibold text-red-600">
                {payments.filter(p => p.status === 'Retard').length}
              </p>
            </div>
            <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle size={16} className="text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Commissions</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatPrice(payments.filter(p => p.type === 'Commission').reduce((sum, p) => sum + p.amount, 0))}
              </p>
            </div>
            <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
              <CreditCard size={16} className="text-primary-600" />
            </div>
          </div>
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
              placeholder="Rechercher un paiement..."
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
              <option value="Commission">Commission</option>
              <option value="Loyer">Loyer</option>
              <option value="Caution">Caution</option>
              <option value="Frais">Frais</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input max-w-xs"
            >
              <option value="all">Tous les statuts</option>
              <option value="En attente">En attente</option>
              <option value="Payé">Payé</option>
              <option value="Retard">En retard</option>
              <option value="Annulé">Annulé</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Référence
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Échéance
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
              {currentPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payment.reference}</div>
                      <div className="text-sm text-gray-500">{payment.method}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payment.clientName}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{payment.propertyTitle}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      payment.type === 'Commission' ? 'bg-primary-100 text-primary-700' :
                      payment.type === 'Loyer' ? 'bg-secondary-100 text-secondary-700' :
                      payment.type === 'Caution' ? 'bg-accent-100 text-accent-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {payment.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice(payment.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1 text-gray-400" />
                        {formatDate(payment.dueDate)}
                      </div>
                      {payment.paidDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          Payé le {formatDate(payment.paidDate)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusClass(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      {payment.status}
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
                      <button 
                        onClick={() => handleDeletePayment(payment.id)}
                        className="p-1 text-red-600 hover:text-red-800" 
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {currentPayments.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Aucun paiement ne correspond à votre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredPayments.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Affichage de <span className="font-medium">{startIndex + 1}</span> à{' '}
              <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredPayments.length)}</span> sur{' '}
              <span className="font-medium">{filteredPayments.length}</span> paiements
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

      {/* Add Payment Modal */}
      <AddPaymentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPayment}
      />
    </div>
  );
};

export default AdminPayments;