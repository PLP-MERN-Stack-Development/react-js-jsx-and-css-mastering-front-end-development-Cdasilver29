import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section - with animations */}
<div className="text-center py-12 animate-fade-in">
  <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 transform transition-all duration-500 hover:scale-105">
    Welcome to TaskApp
  </h1>
  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 animate-slide-down">
    Manage your tasks efficiently with our modern task management system
  </p>
  <div className="flex gap-4 justify-center flex-wrap">
    <Link to="/tasks">
      <Button variant="primary" className="text-lg px-8 py-3">
        Get Started
      </Button>
    </Link>
    <Link to="/api-data">
      <Button variant="secondary" className="text-lg px-8 py-3">
        View API Data
      </Button>
    </Link>
  </div>
</div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hover className="text-center">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Task Management
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Create, edit, and organize your tasks with ease. Mark them as complete when done.
          </p>
        </Card>

        <Card hover className="text-center">
          <div className="text-4xl mb-4">🌓</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Dark Mode
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Switch between light and dark themes for comfortable viewing any time of day.
          </p>
        </Card>

        <Card hover className="text-center">
          <div className="text-4xl mb-4">🔌</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            API Integration
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Fetch and display data from external APIs with pagination and search.
          </p>
        </Card>
      </div>

      {/* Technology Stack */}
      <Card title="Built With Modern Technologies">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl mb-2">⚛️</div>
            <p className="font-semibold text-gray-800 dark:text-white">React 18</p>
          </div>
          <div>
            <div className="text-3xl mb-2">⚡</div>
            <p className="font-semibold text-gray-800 dark:text-white">Vite</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🎨</div>
            <p className="font-semibold text-gray-800 dark:text-white">Tailwind CSS</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🔀</div>
            <p className="font-semibold text-gray-800 dark:text-white">React Router</p>
          </div>
        </div>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Organized?</h2>
          <p className="text-lg mb-6 text-blue-100">
            Start managing your tasks today and boost your productivity!
          </p>
          <Link to="/tasks">
            <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Using TaskApp
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;