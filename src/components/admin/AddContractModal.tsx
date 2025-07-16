import { useState } from 'react';
import { X } from 'lucide-react';

interface AddContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (contract: any) => void;
}

const AddContractModal = ({ isOpen, onClose, onAdd }: AddContractModalProps) => {
  const [formData, setFormData] = useState({
    type: 'Vente',
    status: 'Brouillon',
    clientName: '',
    agentName: 'Mouhamed Ndione',
    propertyTitle: '',
    amount: '',
    notes: ''
  });

  const agents = ['Mouhamed Ndione', 'Fadel Fall', 'Aïssatou Sall'];
  const clients = ['Amadou Diallo', 'Fatou Sall', 'Ousmane Ba', 'Aïssatou Ndiaye', 'Ibrahima Sarr', 'Mariama Cissé'];
  const properties = [
    'Villa moderne avec vue sur mer aux Almadies',
    'Appartement de standing à Plateau',
    'Local commercial à Ngor',
    'Villa de luxe à Saly',
    'Bureau moderne à Plateau',
    'Villa contemporaine à Fann'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newContract = {
      id: Date.now().toString(),
      type: formData.type,
      status: formData.status,
      clientName: formData.clientName,
      agentName: formData.agentName,
      propertyTitle: formData.propertyTitle,
      amount: parseInt(formData.amount),
      createdAt: new Date().toISOString(),
      notes: formData.notes
    };

    onAdd(newContract);
    onClose();
    
    // Reset form
    setFormData({
      type: 'Vente',
      status: 'Brouillon',
      clientName: '',
      agentName: 'Mouhamed Ndione',
      propertyTitle: '',
      amount: '',
      notes: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Nouveau contrat</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de contrat *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="input"
              >
                <option value="Vente">Vente</option>
                <option value="Location">Location</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="input"
              >
                <option value="Brouillon">Brouillon</option>
                <option value="En attente">En attente</option>
                <option value="Signé">Signé</option>
                <option value="Annulé">Annulé</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client *
              </label>
              <select
                value={formData.clientName}
                onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                className="input"
                required
              >
                <option value="">Sélectionner un client</option>
                {clients.map(client => (
                  <option key={client} value={client}>{client}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agent responsable *
              </label>
              <select
                value={formData.agentName}
                onChange={(e) => setFormData(prev => ({ ...prev, agentName: e.target.value }))}
                className="input"
              >
                {agents.map(agent => (
                  <option key={agent} value={agent}>{agent}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bien concerné *
              </label>
              <select
                value={formData.propertyTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, propertyTitle: e.target.value }))}
                className="input"
                required
              >
                <option value="">Sélectionner un bien</option>
                {properties.map(property => (
                  <option key={property} value={property}>{property}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Montant (XOF) *
              </label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="input"
                placeholder="Ex: 250000000"
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.type === 'Location' ? 'Montant mensuel du loyer' : 'Prix de vente total'}
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (optionnel)
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="input"
                placeholder="Notes additionnelles sur le contrat..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Créer le contrat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContractModal;
