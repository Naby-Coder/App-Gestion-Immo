import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PropertyListPage from './pages/PropertyListPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ClientDashboard from './pages/client/ClientDashboard';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProperties from './pages/admin/AdminProperties';
import AdminClients from './pages/admin/AdminClients';
import AdminRequests from './pages/admin/AdminRequests';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="biens" element={<PropertyListPage />} />
        <Route path="biens/:id" element={<PropertyDetailPage />} />
        <Route path="a-propos" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="inscription" element={<RegisterPage />} />
      </Route>

      {/* Routes client */}
      <Route path="espace-client" element={<Layout />}>
        <Route index element={<ClientDashboard />} />
      </Route>

      {/* Routes admin */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="biens" element={<AdminProperties />} />
        <Route path="clients" element={<AdminClients />} />
        <Route path="demandes" element={<AdminRequests />} />
      </Route>

      {/* Route 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;