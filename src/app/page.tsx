'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, Category, ApiResponse } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      const data: ApiResponse<Category[]> = await res.json();
      if (data.success) setCategories(data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = selectedCategory 
        ? `${API_URL}/products?categoryId=${selectedCategory}`
        : `${API_URL}/products`;
      
      const res = await fetch(url);
      const data: ApiResponse<Product[]> = await res.json();
      if (data.success) setProducts(data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Productos</h1>
        
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedCategory === ''
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id.toString())}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedCategory === category.id.toString()
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category.nombre}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">Cargando productos...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No hay productos disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {product.imageUrl && (
                <div className="relative h-48 w-full bg-gray-100">
                  <Image
                    src={product.imageUrl}
                    alt={product.nombre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6">
                {product.category && (
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded mb-2">
                    {product.category.nombre}
                  </span>
                )}
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.nombre}
                </h2>
                <p className="text-2xl font-bold text-gray-900 mb-3">
                  ${product.precio}
                </p>
                {product.descripcion && (
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.descripcion}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
