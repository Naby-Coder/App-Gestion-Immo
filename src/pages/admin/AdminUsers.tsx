import { useState } from 'react';
import { 
  Plus, Search, Filter, Eye, Edit, Trash2, Shield, UserCheck, UserX,
  ChevronLeft, ChevronRight, User, Mail, Phone, Calendar, X
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import AddUserModal from '../../components/admin/AddUserModal';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'admin' | 'agent' | 'client';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin?: string;
}

const initialUsers: User[] = [
  {
    id: '1',
    firstName: 'Mouhamed',
    lastName: 'Ndione',
    email: 'mouhamed.ndione@immoexpert.sn',
    phone: '+221 77 123 45 67',
    role: 'admin',
    status: 'active',
    createdAt: '2023-01-15T10:30:00Z',
    lastLogin: '2025-01-20T14:30:00Z'
  },
  {
    id: '2',
    firstName: 'Fadel',
    lastName: 'Fall',
    email: 'fadel.fall@immoexpert.sn',
    phone: '+221 76 234 56 78',
    role: 'agent',
    status: 'active',
    createdAt: '2023-02-20T14:45:00Z',
    lastLogin: '2025-01-19T16:20:00Z'
  },
  {
    id: '3',
    firstName: 'Aïssatou',
    lastName: 'Sall',
    email: 'aissatou.sall@immoexpert.sn',
    phone: '+221 78 345 67 89',
    role: 'agent',
    status: 'active',
    createdAt: '2023-03-10T09:15:00Z',
    lastLogin: '2025-01-18T11:45:00Z'
  },
  {
    id: '4',
    firstName: 'Amadou',
    lastName: 'Diallo',
    email: 'amadou.diallo@email.com',
    phone: '+221 77 123 45 67',
    role: 'client',
    status: 'active',
    createdAt: '2023-04-05T16:20:00Z',
    lastLogin: '2025-01-17T09:30:00Z'
  },
  {
    id: '5',
    firstName: 'Fatou',
    lastName: 'Sall',
    email: 'fatou.sall@email.com',
    phone: '+221 76 234 56 78',
    role: 'client',
    status: 'active',
    createdAt: '2023-05-12T11:30:00Z',
    lastLogin: '2025-01-16T15:45:00Z'
  },
  {
    id: '6',
    firstName: 'Ousmane',
    lastName: 'Ba',
    email: 'ousmane.ba@email.com',
    phone: '+221 78 345 67 89',
    role: 'client',
    status: 'suspended',
    createdAt: '2023-06-18T13:45:00Z',
    lastLogin: '2025-01-10T12:20:00Z'
  }
];

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const itemsPerPage = 8;
  
  // Filtrer les utilisateurs
  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchesSearch = (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    );
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield size={16} className="text-red-500" />;
      case 'agent':
        return <UserCheck size={16} className="text-blue-500" />;
      case 'client':
        return <User size={16} className="text-green-500" />;
      default:
        return <User size={16} className="text-gray-500" />;
    }
  };
  
  const getRoleClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'agent':
        return 'bg-blue-100 text-blue-700';
      case 'client':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      case 'suspended':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddUser = (newUser: any) => {
    setUsers(prev => [newUser, ...prev]);
    alert('Utilisateur créé avec succès !');
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (updatedUser: any) => {
    setUsers(prev => prev.map(u => 
      u.id === updatedUser.id ? updatedUser : u
    ));
    setIsEditModalOpen(false);
    alert('Utilisateur modifié avec succès !');
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user?.role === 'admin') {
      alert('Impossible de supprimer un administrateur');
      return;
    }
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      alert('Utilisateur supprimé avec succès !');
    }
  };

  const handleSuspendUser = (userId: string) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' as const } : u
    ));
    const user = users.find(u => u.id === userId);
    alert(`Utilisateur ${user?.status === 'suspended' ? 'réactivé' : 'suspendu'} avec succès !`);
  };

  const handleChangeRole = (userId: string, newRole: 'admin' | 'agent' | 'client') => {
    if (confirm(`Êtes-vous sûr de vouloir changer le rôle de cet utilisateur en ${newRole} ?`)) {
      setUsers(prev => prev.map(u => 
        u.id === userId ? { ...u, role: newRole } : u
      ));
      alert('Rôle modifié avec succès !');
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Gestion des utilisateurs</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Créer un utilisateur
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total utilisateurs</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <User className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Administrateurs</p>
              <p className="text-2xl font-bold text-red-600">{users.filter(u => u.role === 'admin').length}</p>
            </div>
            <Shield className="h-8 w-8 text-red-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Agents</p>
              <p className="text-2xl font-bold text-blue-600">{users.filter(u => u.role === 'agent').length}</p>
            </div>
            <UserCheck className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Clients</p>
              <p className="text-2xl font-bold text-green-600">{users.filter(u => u.role === 'client').length}</p>
            </div>
            <User className="h-8 w-8 text-green-400" />
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
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="input max-w-xs"
            >
              <option value="all">Tous les rôles</option>
              <option value="admin">Administrateurs</option>
              <option value="agent">Agents</option>
              <option value="client">Clients</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input max-w-xs"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
              <option value="suspended">Suspendus</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière connexion
                </th>
                <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                        <span className="font-semibold">{user.firstName.charAt(0)}{user.lastName.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                        <div className="text-sm text-gray-500">Créé le {formatDate(user.createdAt)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Mail size={16} className="mr-2" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone size={16} className="mr-2" />
                      <span>{user.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleClass(user.role)}`}>
                      {getRoleIcon(user.role)}
                      <span className="ml-1 capitalize">{user.role}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(user.status)}`}>
                      <span className="capitalize">{user.status === 'active' ? 'Actif' : user.status === 'inactive' ? 'Inactif' : 'Suspendu'}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.lastLogin ? (
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={16} className="mr-2" />
                        <span>{formatDate(user.lastLogin)}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Jamais connecté</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center space-x-2">
                      <button 
                        onClick={() => handleViewUser(user)}
                        className="p-1 text-blue-600 hover:text-blue-800" 
                        title="Voir"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-1 text-yellow-600 hover:text-yellow-800" 
                        title="Modifier"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleSuspendUser(user.id)}
                        className={`p-1 ${user.status === 'suspended' ? 'text-green-600 hover:text-green-800' : 'text-orange-600 hover:text-orange-800'}`}
                        title={user.status === 'suspended' ? 'Réactiver' : 'Suspendre'}
                      >
                        {user.status === 'suspended' ? <UserCheck size={18} /> : <UserX size={18} />}
                      </button>
                      {user.role !== 'admin' && (
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1 text-red-600 hover:text-red-800" 
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              
              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Aucun utilisateur ne correspond à votre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Affichage de <span className="font-medium">{startIndex + 1}</span> à{' '}
              <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredUsers.length)}</span> sur{' '}
              <span className="font-medium">{filteredUsers.length}</span> utilisateurs
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

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddUser}
      />

      {/* View User Modal */}
      {isViewModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Détails de l'utilisateur</h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">{selectedUser.firstName.charAt(0)}{selectedUser.lastName.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedUser.firstName} {selectedUser.lastName}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleClass(selectedUser.role)}`}>
                      {getRoleIcon(selectedUser.role)}
                      <span className="ml-1 capitalize">{selectedUser.role}</span>
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-gray-600">{selectedUser.email}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Téléphone</h4>
                    <p className="text-gray-600">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Statut</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(selectedUser.status)}`}>
                      <span className="capitalize">{selectedUser.status === 'active' ? 'Actif' : selectedUser.status === 'inactive' ? 'Inactif' : 'Suspendu'}</span>
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Date de création</h4>
                    <p className="text-gray-600">{formatDate(selectedUser.createdAt)}</p>
                  </div>
                </div>
                
                {selectedUser.lastLogin && (
                  <div>
                    <h4 className="font-medium text-gray-900">Dernière connexion</h4>
                    <p className="text-gray-600">{formatDate(selectedUser.lastLogin)}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button 
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleEditUser(selectedUser);
                  }}
                  className="btn-primary"
                >
                  Modifier
                </button>
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

      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Modifier l'utilisateur</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdateUser(selectedUser);
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                    <input
                      type="text"
                      value={selectedUser.firstName}
                      onChange={(e) => setSelectedUser(prev => ({ ...prev, firstName: e.target.value }))}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      value={selectedUser.lastName}
                      onChange={(e) => setSelectedUser(prev => ({ ...prev, lastName: e.target.value }))}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={selectedUser.email}
                      onChange={(e) => setSelectedUser(prev => ({ ...prev, email: e.target.value }))}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      value={selectedUser.phone}
                      onChange={(e) => setSelectedUser(prev => ({ ...prev, phone: e.target.value }))}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                    <select
                      value={selectedUser.role}
                      onChange={(e) => setSelectedUser(prev => ({ ...prev, role: e.target.value }))}
                      className="input"
                    >
                      <option value="client">Client</option>
                      <option value="agent">Agent</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                    <select
                      value={selectedUser.status}
                      onChange={(e) => setSelectedUser(prev => ({ ...prev, status: e.target.value }))}
                      className="input"
                    >
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                      <option value="suspended">Suspendu</option>
                    </select>
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
    </div>
  );
};

export default AdminUsers;
