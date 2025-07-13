import { useState } from 'react';
import { Save, Building, Globe, Bell, Shield, Database, Palette, Download, Trash2 } from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [settings, setSettings] = useState({
    company: {
      name: 'ImmoExpert',
      address: '123 Avenue Cheikh Anta Diop',
      city: 'Dakar',
      zipCode: '12000',
      country: 'Sénégal',
      phone: '+221 33 123 45 67',
      email: 'contact@immoexpert.sn',
      website: 'www.immoexpert.sn',
      timezone: 'Africa/Dakar'
    },
    business: {
      currency: 'XOF',
      commissionRate: 5,
      vatRate: 18,
      language: 'fr',
      dateFormat: 'DD/MM/YYYY'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      newPropertyAlert: true,
      clientMessages: true,
      paymentReminders: true,
      systemUpdates: false
    },
    system: {
      autoBackup: true,
      backupFrequency: 'daily',
      maintenanceMode: false,
      debugMode: false,
      apiAccess: true
    }
  });

  const handleSave = (section: string) => {
    // Ici on sauvegarderait les paramètres
    console.log(`Saving ${section} settings:`, settings[section as keyof typeof settings]);
    alert(`Paramètres ${section} sauvegardés avec succès !`);
  };

  const tabs = [
    { id: 'company', label: 'Entreprise', icon: <Building size={18} /> },
    { id: 'business', label: 'Commercial', icon: <Globe size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'system', label: 'Système', icon: <Shield size={18} /> }
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Paramètres</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Company Settings */}
            {activeTab === 'company' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Informations de l'entreprise</h2>
                  <button 
                    onClick={() => handleSave('company')}
                    className="btn-primary flex items-center"
                  >
                    <Save size={16} className="mr-2" />
                    Sauvegarder
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l'entreprise
                    </label>
                    <input
                      type="text"
                      value={settings.company.name}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        company: { ...prev.company, name: e.target.value }
                      }))}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={settings.company.phone}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        company: { ...prev.company, phone: e.target.value }
                      }))}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={settings.company.email}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        company: { ...prev.company, email: e.target.value }
                      }))}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site web
                    </label>
                    <input
                      type="url"
                      value={settings.company.website}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        company: { ...prev.company, website: e.target.value }
                      }))}
                      className="input"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      value={settings.company.address}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        company: { ...prev.company, address: e.target.value }
                      }))}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ville
                    </label>
                    <input
                      type="text"
                      value={settings.company.city}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        company: { ...prev.company, city: e.target.value }
                      }))}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Code postal
                    </label>
                    <input
                      type="text"
                      value={settings.company.zipCode}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        company: { ...prev.company, zipCode: e.target.value }
                      }))}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pays
                    </label>
                    <select
                      value={settings.company.country}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        company: { ...prev.company, country: e.target.value }
                      }))}
                      className="input"
                    >
                      <option value="Sénégal">Sénégal</option>
                      <option value="Mali">Mali</option>
                      <option value="Burkina Faso">Burkina Faso</option>
                      <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuseau horaire
                    </label>
                    <select
                      value={settings.company.timezone}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        company: { ...prev.company, timezone: e.target.value }
                      }))}
                      className="input"
                    >
                      <option value="Africa/Dakar">Africa/Dakar (GMT+0)</option>
                      <option value="Africa/Abidjan">Africa/Abidjan (GMT+0)</option>
                      <option value="Africa/Bamako">Africa/Bamako (GMT+0)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Business Settings */}
            {activeTab === 'business' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Paramètres commerciaux</h2>
                  <button 
                    onClick={() => handleSave('business')}
                    className="btn-primary flex items-center"
                  >
                    <Save size={16} className="mr-2" />
                    Sauvegarder
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Devise
                    </label>
                    <select
                      value={settings.business.currency}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        business: { ...prev.business, currency: e.target.value }
                      }))}
                      className="input"
                    >
                      <option value="XOF">Franc CFA (XOF)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="USD">Dollar US (USD)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taux de commission (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={settings.business.commissionRate}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        business: { ...prev.business, commissionRate: parseFloat(e.target.value) }
                      }))}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taux de TVA (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={settings.business.vatRate}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        business: { ...prev.business, vatRate: parseFloat(e.target.value) }
                      }))}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Langue
                    </label>
                    <select
                      value={settings.business.language}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        business: { ...prev.business, language: e.target.value }
                      }))}
                      className="input"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="wo">Wolof</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Format de date
                    </label>
                    <select
                      value={settings.business.dateFormat}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        business: { ...prev.business, dateFormat: e.target.value }
                      }))}
                      className="input"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Paramètres de notifications</h2>
                  <button 
                    onClick={() => handleSave('notifications')}
                    className="btn-primary flex items-center"
                  >
                    <Save size={16} className="mr-2" />
                    Sauvegarder
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Notifications par email</h3>
                      <p className="text-sm text-gray-500">Recevoir les notifications par email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailNotifications}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, emailNotifications: e.target.checked }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Notifications SMS</h3>
                      <p className="text-sm text-gray-500">Recevoir les notifications par SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.smsNotifications}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, smsNotifications: e.target.checked }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Nouveaux biens</h3>
                      <p className="text-sm text-gray-500">Alertes pour les nouveaux biens ajoutés</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.newPropertyAlert}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, newPropertyAlert: e.target.checked }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Messages clients</h3>
                      <p className="text-sm text-gray-500">Notifications pour les nouveaux messages</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.clientMessages}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, clientMessages: e.target.checked }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Rappels de paiement</h3>
                      <p className="text-sm text-gray-500">Rappels pour les paiements en retard</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.paymentReminders}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, paymentReminders: e.target.checked }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Mises à jour système</h3>
                      <p className="text-sm text-gray-500">Notifications pour les mises à jour</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.systemUpdates}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, systemUpdates: e.target.checked }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Paramètres système</h2>
                  <button 
                    onClick={() => handleSave('system')}
                    className="btn-primary flex items-center"
                  >
                    <Save size={16} className="mr-2" />
                    Sauvegarder
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Sauvegarde automatique</h3>
                      <p className="text-sm text-gray-500">Sauvegarder automatiquement les données</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.system.autoBackup}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          system: { ...prev.system, autoBackup: e.target.checked }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fréquence de sauvegarde
                    </label>
                    <select
                      value={settings.system.backupFrequency}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        system: { ...prev.system, backupFrequency: e.target.value }
                      }))}
                      className="input max-w-xs"
                      disabled={!settings.system.autoBackup}
                    >
                      <option value="hourly">Toutes les heures</option>
                      <option value="daily">Quotidienne</option>
                      <option value="weekly">Hebdomadaire</option>
                      <option value="monthly">Mensuelle</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Mode maintenance</h3>
                      <p className="text-sm text-gray-500">Activer le mode maintenance</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.system.maintenanceMode}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          system: { ...prev.system, maintenanceMode: e.target.checked }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Mode debug</h3>
                      <p className="text-sm text-gray-500">Activer les logs de débogage</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.system.debugMode}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          system: { ...prev.system, debugMode: e.target.checked }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Accès API</h3>
                      <p className="text-sm text-gray-500">Autoriser l'accès à l'API</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.system.apiAccess}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          system: { ...prev.system, apiAccess: e.target.checked }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Actions système</h3>
                    <div className="flex flex-wrap gap-3">
                      <button className="btn-outline flex items-center">
                        <Database size={16} className="mr-2" />
                        Sauvegarder maintenant
                      </button>
                      <button className="btn-outline flex items-center">
                        <Download size={16} className="mr-2" />
                        Exporter les données
                      </button>
                      <button className="btn-outline flex items-center text-red-600 border-red-300 hover:bg-red-50">
                        <Trash2 size={16} className="mr-2" />
                        Vider le cache
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;