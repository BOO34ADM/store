export interface Product {
  id: string;
  name: string;
  category: 'tshirt' | 'hoodie';
  price: number;
  sizes: ('S' | 'M' | 'L')[];
  colors: ('Black' | 'White')[];
  frontImage: string;
  backImage: string;
  description: string;
}

export interface CartItem {
  productId: string;
  size: 'S' | 'M' | 'L';
  color: 'Black' | 'White';
  quantity: number;
  product: Product;
}

export interface Customer {
  id: string;
  email: string;
  phone: string;
  orders: Order[];
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  total: number;
  date: string;
  customerInfo: {
    email: string;
    phone: string;
  };
}