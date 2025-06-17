import { useState } from 'react';
import { MessageSquare, Mail, MailOpen, Reply, Trash2, Send, X } from 'lucide-react';
import { messages } from '../../data/clientData';
import { formatDate } from '../../utils/formatters';

const ClientMessages = () => {
  const [messagesList, setMessagesList] = useState(messages);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replySubject, setReplySubject] = useState('');

  const markAsRead = (messageId: string) => {
    setMessagesList(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  const deleteMessage = (messageId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      setMessagesList(prev => prev.filter(msg => msg.id !== messageId));
      if (selectedMessage === messageId) {
        setSelectedMessage(null);
      }
    }
  };

  const handleReply = (message: any) => {
    setReplySubject(`Re: ${message.subject}`);
    setReplyContent('');
    setIsReplyModalOpen(true);
  };

  const sendReply = () => {
    if (!replyContent.trim()) {
      alert('Veuillez saisir un message');
      return;
    }

    // Simuler l'envoi du message
    const newMessage = {
      id: Date.now().toString(),
      senderId: 'client-1',
      receiverId: 'agent-1',
      subject: replySubject,
      content: replyContent,
      read: true,
      createdAt: new Date().toISOString()
    };

    setMessagesList(prev => [newMessage, ...prev]);
    setIsReplyModalOpen(false);
    setReplyContent('');
    setReplySubject('');
    alert('Message envoyé avec succès !');
  };

  const unreadCount = messagesList.filter(msg => !msg.read).length;
  const selectedMsg = messagesList.find(msg => msg.id === selectedMessage);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Messages</h1>
        <div className="flex items-center text-gray-600">
          <MessageSquare size={20} className="mr-2" />
          <span>{messagesList.length} message{messagesList.length > 1 ? 's' : ''}</span>
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
              {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Boîte de réception</h3>
            </div>
            
            {messagesList.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600">Aucun message</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {messagesList.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => {
                      setSelectedMessage(message.id);
                      if (!message.read) markAsRead(message.id);
                    }}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedMessage === message.id ? 'bg-primary-50 border-r-2 border-primary-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2 mb-1">
                        {message.read ? (
                          <MailOpen size={16} className="text-gray-400" />
                        ) : (
                          <Mail size={16} className="text-primary-600" />
                        )}
                        <span className={`text-sm ${message.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                          Agent ImmoExpert
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <h4 className={`text-sm mb-1 line-clamp-1 ${message.read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                      {message.subject}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {message.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className="lg:col-span-2">
          {selectedMsg ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {selectedMsg.subject}
                    </h2>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-4">De: Agent ImmoExpert</span>
                      <span>{formatDate(selectedMsg.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleReply(selectedMsg)}
                      className="p-2 text-gray-400 hover:text-primary-600 rounded-md hover:bg-gray-100"
                      title="Répondre"
                    >
                      <Reply size={18} />
                    </button>
                    <button 
                      onClick={() => deleteMessage(selectedMsg.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-gray-100"
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedMsg.content}
                  </p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => handleReply(selectedMsg)}
                    className="btn-primary"
                  >
                    <Reply size={16} className="mr-2" />
                    Répondre
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Sélectionnez un message
              </h3>
              <p className="text-gray-600">
                Choisissez un message dans la liste pour le lire.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {isReplyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Répondre au message</h2>
              <button 
                onClick={() => setIsReplyModalOpen(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Objet
                </label>
                <input
                  type="text"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="input"
                  placeholder="Objet du message"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={6}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="input"
                  placeholder="Tapez votre réponse ici..."
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={() => setIsReplyModalOpen(false)}
                  className="btn-outline"
                >
                  Annuler
                </button>
                <button 
                  onClick={sendReply}
                  className="btn-primary flex items-center"
                >
                  <Send size={16} className="mr-2" />
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientMessages;