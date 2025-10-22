import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';

const ApiDataDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 9;

  // Fetch data from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Using DummyJSON for better, more realistic data
        const response = await fetch('https://dummyjson.com/posts?limit=100');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        setPosts(data.posts); // DummyJSON returns posts in a 'posts' array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Loading state with animated spinner
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 animate-fade-in">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          <div className="animate-ping absolute top-0 left-0 rounded-full h-16 w-16 border-4 border-blue-400 opacity-20"></div>
        </div>
        <p className="ml-4 mt-4 text-gray-600 dark:text-gray-400 font-medium animate-pulse">
          Loading amazing posts...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="animate-fade-in">
        <div className="text-center py-8">
          <p className="text-red-600 dark:text-red-400 text-xl mb-4 animate-pulse">⚠️ Error</p>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <Button 
            variant="primary" 
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Bar with animation */}
      <Card className="transform transition-all duration-300">
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Search posts by title, content, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 border-2 border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-200"
          />
          <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
        </p>
      </Card>

      {/* Posts Grid with staggered animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.length === 0 ? (
          <div className="col-span-full text-center py-12 animate-fade-in">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No posts found matching your search.</p>
          </div>
        ) : (
          currentPosts.map((post, index) => (
            <Card 
              key={post.id} 
              hover
              className="transform transition-all duration-300 hover:shadow-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white capitalize flex-1 pr-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                               text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0">
                  #{post.id}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {post.body}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                               text-xs px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    ❤️ {post.reactions?.likes || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    👁️ {post.views || 0}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  User {post.userId}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Pagination with animations */}
      {totalPages > 1 && (
        <Card className="animate-fade-in">
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <Button
              variant="secondary"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="transition-all duration-200"
            >
              ← Previous
            </Button>
            
            {[...Array(Math.min(totalPages, 5))].map((_, index) => {
              const pageNum = currentPage <= 3 
                ? index + 1 
                : currentPage >= totalPages - 2
                ? totalPages - 4 + index
                : currentPage - 2 + index;
              
              if (pageNum > totalPages || pageNum < 1) return null;
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? 'primary' : 'secondary'}
                  onClick={() => paginate(pageNum)}
                  className="min-w-[40px]"
                >
                  {pageNum}
                </Button>
              );
            })}
            
            <Button
              variant="secondary"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </Button>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 font-medium">
            Page {currentPage} of {totalPages}
          </p>
        </Card>
      )}
    </div>
  );
};

export default ApiDataDisplay;