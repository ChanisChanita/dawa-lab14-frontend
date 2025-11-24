'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { setToken, setUser } from '@/lib/auth';
import { ApiResponse, AuthResponse } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data: ApiResponse<AuthResponse> = await res.json();

      if (!data.success) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setToken(data.data.token);
      setUser(data.data.user);
      login(data.data.user, data.data.token);
      
      if (data.data.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al iniciar sesión');
      setLoading(false);
    }
  };

  const fillCredentials = (email: string, password: string) => {
    setFormData({ email, password });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Iniciar Sesión
          </h2>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 font-semibold">
              🔑 Credenciales de prueba:
            </p>
            
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <p className="text-xs font-semibold text-blue-900 mb-1">ADMIN</p>
                <p className="text-xs text-blue-800">Email: admin@marketplace.com</p>
                <p className="text-xs text-blue-800 mb-2">Password: admin123</p>
                <button
                  type="button"
                  onClick={() => fillCredentials('admin@marketplace.com', 'admin123')}
                  className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Usar estas credenciales
                </button>
              </div>

              <div className="bg-green-50 p-3 rounded border border-green-200">
                <p className="text-xs font-semibold text-green-900 mb-1">CLIENTE</p>
                <p className="text-xs text-green-800">Email: cliente@marketplace.com</p>
                <p className="text-xs text-green-800 mb-2">Password: cliente123</p>
                <button
                  type="button"
                  onClick={() => fillCredentials('cliente@marketplace.com', 'cliente123')}
                  className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Usar estas credenciales
                </button>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="text-gray-900 hover:underline">
              Registrarse
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
