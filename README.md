# ImmoExpert - Application de Gestion Immobilière

Une application moderne de gestion immobilière développée avec React, TypeScript, Tailwind CSS et Supabase.

## 🏗️ Architecture

### Frontend
- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations
- **React Router** pour la navigation
- **Lucide React** pour les icônes

### Backend
- **Supabase** (PostgreSQL + Auth + API temps réel)
- **Row Level Security (RLS)** pour la sécurité
- **Authentification intégrée** avec gestion des rôles
- **Base de données PostgreSQL** hébergée

## 🚀 Fonctionnalités

### Authentification & Autorisation
- ✅ Inscription/Connexion sécurisée
- ✅ Gestion des rôles (Admin, Agent, Client)
- ✅ Profils utilisateurs personnalisés
- ✅ Protection des routes par rôle

### Gestion des Biens
- ✅ CRUD complet des propriétés
- ✅ Upload et gestion d'images
- ✅ Recherche et filtrage avancés
- ✅ Géolocalisation et cartes

### Espace Client
- ✅ Dashboard personnalisé
- ✅ Biens favoris
- ✅ Demandes et messages
- ✅ Rendez-vous avec agents
- ✅ Historique des interactions

### Espace Admin/Agent
- ✅ Tableau de bord analytique
- ✅ Gestion des biens immobiliers
- ✅ Gestion des clients
- ✅ Suivi des demandes
- ✅ Gestion des contrats et paiements

### Fonctionnalités Avancées
- ✅ Système de messagerie interne
- ✅ Notifications temps réel
- ✅ Génération de rapports
- ✅ Interface responsive
- ✅ Mode sombre/clair

## 🛠️ Installation et Configuration

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte Supabase

### 1. Cloner le projet
```bash
git clone <repository-url>
cd immo-expert
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration Supabase

#### A. Créer un projet Supabase
1. Aller sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Attendre que la base de données soit prête

#### B. Configurer les variables d'environnement
Créer un fichier `.env` à la racine :

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

#### C. Exécuter les migrations
Les migrations se trouvent dans `supabase/migrations/` et créent :
- Tables utilisateurs et profils
- Tables des biens immobiliers
- Tables des demandes et messages
- Tables des contrats et paiements
- Politiques RLS pour la sécurité

### 4. Lancer l'application
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## 📊 Structure de la Base de Données

### Tables Principales
- `profiles` - Profils utilisateurs étendus
- `agents` - Informations spécifiques aux agents
- `clients` - Informations spécifiques aux clients
- `properties` - Biens immobiliers
- `contact_requests` - Demandes de contact
- `favorites` - Biens favoris
- `appointments` - Rendez-vous
- `messages` - Système de messagerie
- `contracts` - Contrats
- `payments` - Paiements

### Sécurité
- **Row Level Security (RLS)** activé sur toutes les tables
- **Politiques d'accès** basées sur les rôles utilisateur
- **Authentification JWT** via Supabase Auth
- **Validation des données** côté serveur et client

## 🎨 Design System

### Couleurs
- **Primary**: Bleu (#2563EB)
- **Secondary**: Ambre (#F59E0B) 
- **Accent**: Vert (#10B981)
- **Success**: Vert (#22C55E)
- **Warning**: Orange (#F59E0B)
- **Error**: Rouge (#EF4444)

### Typographie
- **Titres**: Montserrat
- **Corps**: Open Sans
- **Interface**: Inter

### Composants
- Design system cohérent avec Tailwind CSS
- Composants réutilisables
- Animations fluides avec Framer Motion
- Interface responsive mobile-first

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Linting
npm run lint
```

## 📱 Responsive Design

L'application est entièrement responsive avec des breakpoints optimisés :
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🌍 Déploiement

### Netlify (Recommandé)
1. Connecter le repository GitHub à Netlify
2. Configurer les variables d'environnement
3. Build automatique à chaque push

### Vercel
1. Importer le projet sur Vercel
2. Configurer les variables d'environnement
3. Déploiement automatique

### Variables d'environnement de production
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🧪 Tests

```bash
# Tests unitaires (à implémenter)
npm run test

# Tests E2E (à implémenter)  
npm run test:e2e
```

## 📈 Performance

- **Lazy loading** des composants
- **Optimisation des images** avec Pexels
- **Code splitting** automatique
- **Mise en cache** des requêtes Supabase
- **Bundle size** optimisé

## 🔒 Sécurité

- **HTTPS** obligatoire en production
- **CSP Headers** configurés
- **XSS Protection** intégrée
- **SQL Injection** impossible (Supabase)
- **Authentification** sécurisée avec JWT

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changes (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation Supabase
- Vérifier les logs de la console

## 🚀 Roadmap

### Version 2.0
- [ ] Application mobile React Native
- [ ] Notifications push
- [ ] Intégration cartes avancées
- [ ] IA pour estimation automatique
- [ ] API publique
- [ ] Multi-langues
- [ ] Mode hors-ligne

### Version 1.1
- [ ] Tests automatisés
- [ ] Monitoring et analytics
- [ ] Optimisations performance
- [ ] Documentation API
- [ ] Thèmes personnalisables