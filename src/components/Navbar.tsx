'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-semibold text-gray-900">
            ProductStore
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Productos
            </Link>
            {isAuthenticated && user?.role === 'ADMIN' && (
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
                Admin
              </Link>
            )}
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {user?.email} ({user?.role})
                </span>
                <button
                  onClick={logout}
                  className="text-red-600 hover:text-red-800 transition-colors text-sm"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
