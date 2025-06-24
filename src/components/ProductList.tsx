import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Product } from '../types';

interface ProductListProps {
  category: 'tshirt' | 'hoodie';
  products: Product[];
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  category,
  products,
  onBack,
  onProductClick
}) => {
  const categoryTitle = category === 'tshirt' ? 'T-Shirts' : 'Hoodies';
  const filteredProducts = products.filter(p => p.category === category);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{categoryTitle}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onProductClick(product)}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-square relative overflow-hidden group">
                <img
                  src={product.frontImage}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300"
                />
                <img
                  src={product.backImage}
                  alt={`${product.name} back`}
                  className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className={`w-4 h-4 rounded-full border-2 ${
                          color === 'Black' ? 'bg-black border-gray-300' : 'bg-white border-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};