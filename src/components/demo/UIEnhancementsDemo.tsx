import React, { useState } from 'react';
import { Moon, Sun, RefreshCw, Wifi, WifiOff, Info, Home, BookOpen, Camera, ShoppingCart, MoreHorizontal } from 'lucide-react';

const UIEnhancementsDemo: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [items, setItems] = useState<string[]>([]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Simulate loading data
  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setItems(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);
      setIsLoading(false);
      showToastNotification('Data loaded successfully!', 'success');
    }, 1500);
  };

  // Toggle online/offline status
  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    showToastNotification(
      !isOnline ? 'You are back online!' : 'You are now offline. Changes will be saved locally.',
      !isOnline ? 'success' : 'warning'
    );
  };

  // Show toast notification
  const showToastNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Clear items to show empty state
  const clearItems = () => {
    setItems([]);
    showToastNotification('All items cleared', 'info');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-4 pb-24">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">UI Enhancements Demo</h1>
          <div className="flex space-x-2">
            <button
              onClick={toggleDarkMode}
              className={`flex items-center px-3 py-2 rounded-md ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button
              onClick={toggleOnlineStatus}
              className={`flex items-center px-3 py-2 rounded-md ${
                isOnline ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}
            >
              {isOnline ? <Wifi className="w-4 h-4 mr-2" /> : <WifiOff className="w-4 h-4 mr-2" />}
              {isOnline ? 'Online' : 'Offline'}
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Loading States Card */}
          <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h2 className="text-xl font-semibold mb-2">Loading States</h2>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Demonstrates skeleton loaders and loading indicators.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={loadData}
                disabled={isLoading}
                className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load Data'
                )}
              </button>
              <button
                onClick={clearItems}
                disabled={items.length === 0}
                className={`px-3 py-2 rounded-md ${
                  isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                } disabled:opacity-50`}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Empty States Card */}
          <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h2 className="text-xl font-semibold mb-2">Empty States</h2>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Shows appropriate UI when there's no data to display.
            </p>
            <button
              onClick={() => showToastNotification('This is an info message', 'info')}
              className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md"
            >
              <Info className="w-4 h-4 mr-2" />
              Show Toast
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className={`p-6 rounded-lg shadow-md mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h2 className="text-xl font-semibold mb-4">Content Area</h2>
          
          {/* Loading State */}
          {isLoading && (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-6 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`}
                />
              ))}
            </div>
          )}

          {/* Data State */}
          {!isLoading && items.length > 0 && (
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index} className="py-2 border-b last:border-0 border-gray-200 dark:border-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          )}

          {/* Empty State */}
          {!isLoading && items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}
              >
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">No items found</h3>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Click the "Load Data" button to fetch items
              </p>
              <button
                onClick={loadData}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Load Data
              </button>
            </div>
          )}
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div
            className={`fixed bottom-4 right-4 px-4 py-3 rounded-md shadow-lg flex items-center space-x-2 text-white ${
              toastType === 'success'
                ? 'bg-green-500'
                : toastType === 'error'
                ? 'bg-red-500'
                : toastType === 'warning'
                ? 'bg-yellow-500'
                : 'bg-blue-500'
            }`}
          >
            {toastMessage}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 ${
        isDarkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-md'
      } flex justify-around py-2`}>
        <a href="#" className="flex flex-col items-center text-indigo-600">
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </a>
        <a href="#" className={`flex flex-col items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <BookOpen className="w-6 h-6" />
          <span className="text-xs mt-1">Recipes</span>
        </a>
        <a href="#" className={`flex flex-col items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <Camera className="w-6 h-6" />
          <span className="text-xs mt-1">Scan</span>
        </a>
        <a href="#" className={`flex flex-col items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs mt-1">Shopping</span>
        </a>
        <a href="#" className={`flex flex-col items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <MoreHorizontal className="w-6 h-6" />
          <span className="text-xs mt-1">More</span>
        </a>
      </div>
    </div>
  );
};

export default UIEnhancementsDemo;
