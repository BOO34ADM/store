import React from 'react';
import { User, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onProfileClick: () => void;
  onCartClick: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onProfileClick,
  onCartClick,
  onLogoClick
}) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={onLogoClick}
            className="text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
          >
            SA9R
          </button>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={onProfileClick}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>
            
            <button
              onClick={onCartClick}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};