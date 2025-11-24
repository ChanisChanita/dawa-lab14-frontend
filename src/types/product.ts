export interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  imageUrl?: string;
  categoryId?: number;
  category?: {
    id: number;
    nombre: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: number;
  nombre: string;
  descripcion?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: number;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
