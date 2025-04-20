import React, { useState } from 'react';
import './Sales.css';

// Mock products data - in a real app this would come from an API
const mockProducts = [
  { id: 1, name: 'Apa Plata', price: 5, stock: 100, category: 'bauturi' },
  { id: 2, name: 'Apa Minerala', price: 6, stock: 100, category: 'bauturi' },
  { id: 3, name: 'Proteine', price: 120, stock: 50, category: 'suplimente' },
  { id: 4, name: 'Creatina', price: 80, stock: 30, category: 'suplimente' },
  { id: 5, name: 'BCAA', price: 90, stock: 40, category: 'suplimente' },
  { id: 6, name: 'Prosoape', price: 15, stock: 200, category: 'accesorii' },
];

const singleEntry = {
  id: 7,
  name: 'Intrare Single',
  price: 30,
  stock: 999,
  category: 'intrari'
};

const categories = [
  { id: 'all', name: 'Toate' },
  { id: 'intrari', name: 'Intrări' },
  { id: 'bauturi', name: 'Băuturi' },
  { id: 'suplimente', name: 'Suplimente' },
  { id: 'accesorii', name: 'Accesorii' }
];

const Sales = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? [...mockProducts, singleEntry]
    : [...mockProducts, singleEntry].filter(product => product.category === selectedCategory);

  return (
    <div className="sales-container">
      <div className="categories-sticky">
        <div className="categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            className="product-card"
            onClick={() => onAddToCart(product)}
          >
            <div className="product-content">
              <h3 className="product-name">{product.name}</h3>
              <div className="price-container">
                <span className="product-price">{product.price}</span>
                <span className="currency">RON</span>
              </div>
              {product.category !== 'intrari' && (
                <p className="product-stock">Stoc disponibil: {product.stock}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sales; 