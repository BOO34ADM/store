import React from 'react';

interface HomePageProps {
  onCategoryClick: (category: 'tshirt' | 'hoodie') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onCategoryClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to SA9R</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of streetwear. Quality, style, and comfort in every piece.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div
            onClick={() => onCategoryClick('tshirt')}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="T-Shirts"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
              </div>
              <div className="p-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">T-Shirts</h2>
                <p className="text-gray-600 mb-4">Premium cotton tees with signature designs</p>
                <div className="flex justify-center space-x-4 mb-4">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">S • M • L</span>
                  <span className="px-3 py-1 bg-gray-900 text-white rounded-full text-sm">Black</span>
                  <span className="px-3 py-1 bg-gray-100 border rounded-full text-sm">White</span>
                </div>
                <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  Shop T-Shirts
                </button>
              </div>
            </div>
          </div>
          
          <div
            onClick={() => onCategoryClick('hoodie')}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Hoodies"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
              </div>
              <div className="p-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Hoodies</h2>
                <p className="text-gray-600 mb-4">Cozy fleece hoodies for ultimate comfort</p>
                <div className="flex justify-center space-x-4 mb-4">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">S • M • L</span>
                  <span className="px-3 py-1 bg-gray-900 text-white rounded-full text-sm">Black</span>
                  <span className="px-3 py-1 bg-gray-100 border rounded-full text-sm">White</span>
                </div>
                <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  Shop Hoodies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};