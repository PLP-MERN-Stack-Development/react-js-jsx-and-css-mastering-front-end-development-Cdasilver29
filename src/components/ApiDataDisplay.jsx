import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './Button';

const ApiDataDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 10;

  // Fetch data from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array = run once on mount

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600 dark:text-gray-400">Loading posts...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-red-600 dark:text-red-400 text-xl mb-4">⚠️ Error</p>
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
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
        </p>
      </Card>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentPosts.length === 0 ? (
          <div className="col-span-2 text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No posts found matching your search.</p>
          </div>
        ) : (
          currentPosts.map(post => (
            <Card 
              key={post.id} 
              hover
              className="transform transition-transform duration-200 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
                  {post.title}
                </h3>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                               text-xs font-medium px-2.5 py-0.5 rounded">
                  #{post.id}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                {post.body}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  User ID: {post.userId}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <Button
              variant="secondary"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index + 1}
                variant={currentPage === index + 1 ? 'primary' : 'secondary'}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
            
            <Button
              variant="secondary"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Page {currentPage} of {totalPages}
          </p>
        </Card>
      )}
    </div>
  );
};

export default ApiDataDisplay;