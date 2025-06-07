import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Tag } from 'lucide-react';
import { articles } from '../../data/articles';
import { formatDate } from '../../utils/formatters';

const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
        <p className="text-gray-600 mb-8">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link to="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-800">
          <ArrowLeft size={18} className="mr-2" />
          Retour au blog
        </Link>
      </div>
    );
  }

  const relatedArticles = articles.filter(a => 
    a.id !== article.id && 
    (a.category === article.category || a.tags.some(tag => article.tags.includes(tag)))
  ).slice(0, 3);

  return (
    <div className="bg-gray-50 py-8">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-primary-600">Accueil</Link>
            </li>
            <li className="mx-2">/</li>
            <li>
              <Link to="/blog" className="hover:text-primary-600">Blog</Link>
            </li>
            <li className="mx-2">/</li>
            <li className="text-gray-700 font-medium truncate">{article.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Hero Image */}
              <div className="relative h-64 md:h-80">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-md">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
                  <div className="flex items-center mr-6 mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center mr-6 mb-2">
                    <User size={16} className="mr-2" />
                    <span>{article.author}</span>
                  </div>
                  <button className="flex items-center text-primary-600 hover:text-primary-800 mb-2">
                    <Share2 size={16} className="mr-2" />
                    <span>Partager</span>
                  </button>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {article.title}
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-md"
                    >
                      <Tag size={14} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: article.content.replace(/\n/g, '<br>').replace(/#{1,6}\s/g, match => {
                        const level = match.trim().length;
                        return `<h${level} class="text-${4-level}xl font-bold text-gray-900 mt-8 mb-4">`;
                      }).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }}
                  />
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Articles similaires</h3>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <Link 
                      key={relatedArticle.id}
                      to={`/blog/${relatedArticle.slug}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        <img 
                          src={relatedArticle.image} 
                          alt={relatedArticle.title}
                          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 line-clamp-2">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(relatedArticle.publishedAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Catégories</h3>
              <div className="space-y-2">
                {['Investissement', 'Rénovation', 'Marché', 'Conseils', 'Actualités'].map((category) => (
                  <Link 
                    key={category}
                    to={`/blog?category=${category}`}
                    className="block text-gray-600 hover:text-primary-600 py-1"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
          >
            <ArrowLeft size={18} className="mr-2" />
            Retour au blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogArticlePage;