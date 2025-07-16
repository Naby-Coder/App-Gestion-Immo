import { useState } from 'react';
import { X } from 'lucide-react';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payment: any) => void;
}

const AddPaymentModal = ({ isOpen, onClose, onAdd }: AddPaymentModalProps) => {
  const [formData, setFormData] = useState({
    type: 'Commission',
    method: 'Virement',
    status: 'En attente',
    clientName: '',
    propertyTitle: '',
    amount: '',
    dueDate: '',
    reference: '',
    notes: ''
  });

  const clients = ['Amadou Diallo', 'Fatou Sall', 'Ousmane Ba', 'Aïssatou Ndiaye', 'Ibrahima Sarr', 'Mariama Cissé'];
  const properties = [
    'Villa moderne avec vue sur mer aux Almadies',
    'Appartement de standing à Plateau',
    'Local commercial à Ngor',
    'Villa de luxe à Saly',
    'Bureau moderne à Plateau',
    'Villa contemporaine à Fann'
  ];

  const generateReference = (type: string) => {
    const prefix = type === 'Commission' ? 'COM' : 
                   type === 'Loyer' ? 'LOY' : 
                   type === 'Caution' ? 'CAU' : 'FRA';
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${year}-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPayment = {
      id: Date.now().toString(),
      type: formData.type,
      method: formData.method,
      status: formData.status,
      clientName: formData.clientName,
      propertyTitle: formData.propertyTitle,
      amount: parseInt(formData.amount),
      dueDate: formData.dueDate + 'T00:00:00Z',
      reference: formData.reference || generateReference(formData.type),
      notes: formData.notes
    };

    onAdd(newPayment);
    onClose();
    
    // Reset form
    setFormData({
      type: 'Commission',
      method: 'Virement',
      status: 'En attente',
      clientName: '',
      propertyTitle: '',
      amount: '',
      dueDate: '',
      reference: '',
      notes: ''
    });
  };

  const handleTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      type,
      reference: generateReference(type)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Nouveau paiement</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de paiement *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="input"
              >
                <option value="Commission">Commission</option>
                <option value="Loyer">Loyer</option>
                <option value="Caution">Caution</option>
                <option value="Frais">Frais</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Méthode de paiement *
              </label>
              <select
                value={formData.method}
                onChange={(e) => setFormData(prev => ({ ...prev, method: e.target.value }))}
                className="input"
              >
                <option value="Virement">Virement</option>
                <option value="Chèque">Chèque</option>
                <option value="Espèces">Espèces</option>
                <option value="Carte">Carte</option>
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
                <option value="En attente">En attente</option>
                <option value="Payé">Payé</option>
                <option value="Retard">En retard</option>
                <option value="Annulé">Annulé</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Référence
              </label>
              <input
                type="text"
                value={formData.reference}
                onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                className="input"
                placeholder="Généré automatiquement"
              />
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Montant (XOF) *
              </label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="input"
                placeholder="Ex: 12500000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date d'échéance *
              </label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="input"
              />
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
                placeholder="Notes additionnelles sur le paiement..."
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
              Créer le paiement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentModal;
