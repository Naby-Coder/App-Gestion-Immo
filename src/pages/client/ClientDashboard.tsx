import React from 'react';
import { Building2, FileText, MessageSquare, User } from 'lucide-react';

function ClientDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Mes biens favoris</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Mes demandes</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Messages</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <User className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Rendez-vous</p>
              <p className="text-2xl font-semibold text-gray-900">2</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Dernières visites</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((visit) => (
              <div key={visit} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">Appartement Paris 15e</p>
                  <p className="text-sm text-gray-600">Programmée pour le 15 juin 2025</p>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">À venir</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Derniers messages</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((message) => (
              <div key={message} className="flex items-start border-b pb-4 last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Agent immobilier</p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    Bonjour, suite à votre demande de visite pour l'appartement...
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Il y a 2 heures</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;