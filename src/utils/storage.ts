import { Customer, Order, CartItem } from '../types';

const CUSTOMERS_KEY = 'sa9r_customers';
const ORDERS_KEY = 'sa9r_orders';
const CART_KEY = 'sa9r_cart';
const CURRENT_CUSTOMER_KEY = 'sa9r_current_customer';

export const storage = {
  // Customer management
  getCustomers(): Customer[] {
    const data = localStorage.getItem(CUSTOMERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveCustomer(customer: Customer): void {
    const customers = this.getCustomers();
    const existingIndex = customers.findIndex(c => c.id === customer.id);
    
    if (existingIndex >= 0) {
      customers[existingIndex] = customer;
    } else {
      customers.push(customer);
    }
    
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
  },

  getCurrentCustomer(): Customer | null {
    const id = localStorage.getItem(CURRENT_CUSTOMER_KEY);
    if (!id) return null;
    
    const customers = this.getCustomers();
    return customers.find(c => c.id === id) || null;
  },

  setCurrentCustomer(customerId: string): void {
    localStorage.setItem(CURRENT_CUSTOMER_KEY, customerId);
  },

  // Order management
  getOrders(): Order[] {
    const data = localStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveOrder(order: Order): void {
    const orders = this.getOrders();
    orders.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  },

  // Cart management
  getCart(): CartItem[] {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveCart(cart: CartItem[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  clearCart(): void {
    localStorage.removeItem(CART_KEY);
  },

  // Admin verification
  verifyAdminPassword(password: string): boolean {
    return password === 'sa9radmin2024';
  }
};