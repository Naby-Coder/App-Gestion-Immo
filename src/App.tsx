import { Routes, Route } from 'react-router-dom';
import { SupabaseAuthProvider } from './components/auth/SupabaseAuthProvider';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PropertyListPage from './pages/PropertyListPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogArticlePage from './pages/blog/BlogArticlePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ClientLayout from './components/layout/ClientLayout';
import ClientDashboard from './pages/client/ClientDashboard';
import ClientFavorites from './pages/client/ClientFavorites';
import ClientRequests from './pages/client/ClientRequests';
import ClientMessages from './pages/client/ClientMessages';
import ClientAppointments from './pages/client/ClientAppointments';
import ClientProfile from './pages/client/ClientProfile';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminClients from './pages/admin/AdminClients';
import AdminProperties from './pages/admin/AdminProperties';
import AdminRequests from './pages/admin/AdminRequests';
import AdminContracts from './pages/admin/AdminContracts';
import AdminPayments from './pages/admin/AdminPayments';
import AdminSettings from './pages/admin/AdminSettings';
import AdminProfile from './pages/admin/AdminProfile';
import AgentLayout from './components/layout/AgentLayout';
import AgentDashboard from './pages/agent/AgentDashboard';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <SupabaseAuthProvider>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="biens" element={<PropertyListPage />} />
          <Route path="biens/:id" element={<PropertyDetailPage />} />
          <Route path="a-propos" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogArticlePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="inscription" element={<RegisterPage />} />
        </Route>

        {/* Routes client protégées */}
        <Route path="espace-client" element={
          <ProtectedRoute requiredRole="client">
            <ClientLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ClientDashboard />} />
          <Route path="favoris" element={<ClientFavorites />} />
          <Route path="demandes" element={<ClientRequests />} />
          <Route path="messages" element={<ClientMessages />} />
          <Route path="rendez-vous" element={<ClientAppointments />} />
          <Route path="profil" element={<ClientProfile />} />
        </Route>

        {/* Routes admin/agent protégées */}
        <Route path="admin" element={
          <ProtectedRoute requiredRole="admin" redirectTo="/agent">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="utilisateurs" element={<AdminUsers />} />
          <Route path="biens" element={<AdminProperties />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="demandes" element={<AdminRequests />} />
          <Route path="contrats" element={<AdminContracts />} />
          <Route path="paiements" element={<AdminPayments />} />
          <Route path="parametres" element={<AdminSettings />} />
          <Route path="profil" element={<AdminProfile />} />
        </Route>
        
        {/* Routes agent protégées */}
        <Route path="agent" element={
          <ProtectedRoute requiredRole="agent" redirectTo="/admin">
            <AgentLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AgentDashboard />} />
          <Route path="biens" element={<AdminProperties />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="demandes" element={<AdminRequests />} />
          <Route path="contrats" element={<AdminContracts />} />
          <Route path="paiements" element={<AdminPayments />} />
          <Route path="profil" element={<AdminProfile />} />
        </Route>

        {/* Route 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SupabaseAuthProvider>
  );
}

export default App;
//ss