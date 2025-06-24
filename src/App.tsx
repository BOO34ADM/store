import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Profile } from './components/Profile';
import { Checkout } from './components/Checkout';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';
import { products } from './data/products';
import { storage } from './utils/storage';
import { Product, CartItem, Customer, Order } from './types';

type View = 'home' | 'products' | 'product-detail' | 'cart' | 'profile' | 'checkout' | 'admin-login' | 'admin-panel';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCategory, setSelectedCategory] = useState<'tshirt' | 'hoodie'>('tshirt');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load cart from storage
    const savedCart = storage.getCart();
    setCart(savedCart);

    // Load current customer
    const customer = storage.getCurrentCustomer();
    setCurrentCustomer(customer);

    // Load orders for admin
    const savedOrders = storage.getOrders();
    setOrders(savedOrders);
  }, []);

  const handleCategoryClick = (category: 'tshirt' | 'hoodie') => {
    setSelectedCategory(category);
    setCurrentView('products');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.productId === newItem.productId && 
                 item.size === newItem.size && 
                 item.color === newItem.color
      );

      let updatedCart;
      if (existingItemIndex >= 0) {
        updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
      } else {
        updatedCart = [...prevCart, newItem];
      }

      storage.saveCart(updatedCart);
      return updatedCart;
    });
    
    alert('Added to cart!');
  };

  const handleUpdateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.productId === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      );
      storage.saveCart(updatedCart);
      return updatedCart;
    });
  };

  const handleRemoveItem = (productId: string, size: string, color: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(
        item => !(item.productId === productId && item.size === size && item.color === color)
      );
      storage.saveCart(updatedCart);
      return updatedCart;
    });
  };

  const handlePlaceOrder = (email: string, phone: string) => {
    const customerId = `customer-${Date.now()}`;
    const orderId = `order-${Date.now()}`;
    
    const order: Order = {
      id: orderId,
      customerId,
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
      date: new Date().toISOString(),
      customerInfo: { email, phone }
    };

    // Save order
    storage.saveOrder(order);
    setOrders(prevOrders => [...prevOrders, order]);

    // Create or update customer
    let customer = storage.getCurrentCustomer();
    if (!customer || customer.email !== email) {
      customer = {
        id: customerId,
        email,
        phone,
        orders: [order]
      };
    } else {
      customer.orders.push(order);
    }
    
    storage.saveCustomer(customer);
    storage.setCurrentCustomer(customer.id);
    setCurrentCustomer(customer);

    // Clear cart
    setCart([]);
    storage.clearCart();

    alert('Order placed successfully!');
    setCurrentView('home');
  };

  const handleAdminLogin = (password: string) => {
    if (storage.verifyAdminPassword(password)) {
      setIsAdminAuthenticated(true);
      setCurrentView('admin-panel');
    } else {
      alert('Invalid password');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentView('home');
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onCategoryClick={handleCategoryClick} />;
      case 'products':
        return (
          <ProductList
            category={selectedCategory}
            products={products}
            onBack={() => setCurrentView('home')}
            onProductClick={handleProductClick}
          />
        );
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setCurrentView('products')}
            onAddToCart={handleAddToCart}
          />
        ) : null;
      case 'cart':
        return (
          <Cart
            cart={cart}
            onBack={() => setCurrentView('home')}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={() => setCurrentView('checkout')}
          />
        );
      case 'profile':
        return (
          <Profile
            customer={currentCustomer}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'checkout':
        return (
          <Checkout
            cart={cart}
            onBack={() => setCurrentView('cart')}
            onPlaceOrder={handlePlaceOrder}
          />
        );
      case 'admin-login':
        return (
          <AdminLogin
            onBack={() => setCurrentView('home')}
            onLogin={handleAdminLogin}
          />
        );
      case 'admin-panel':
        return (
          <AdminPanel
            orders={orders}
            onBack={() => setCurrentView('home')}
            onLogout={handleAdminLogout}
          />
        );
      default:
        return <HomePage onCategoryClick={handleCategoryClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItemCount}
        onProfileClick={() => setCurrentView('profile')}
        onCartClick={() => setCurrentView('cart')}
        onLogoClick={() => setCurrentView('home')}
      />
      
      {renderCurrentView()}
      
      {currentView === 'home' && (
        <footer className="text-center py-8">
          <button
            onClick={() => setCurrentView('admin-login')}
            className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
          >
            admin
          </button>
        </footer>
      )}
    </div>
  );
}

export default App;