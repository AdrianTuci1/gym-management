import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import useCategoryStore from '../../store/categoryStore';

const Container = styled(Box)({
  padding: '24px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const ProductsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '24px',
  padding: '16px',
  overflow: 'auto',
});

const ProductCard = styled(Box)(({ theme }) => ({
  padding: '24px',
  borderRadius: '16px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0,0,0,0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  },
}));

const ProductContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const PriceTag = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  padding: '8px 16px',
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '1.1rem',
  alignSelf: 'flex-start',
}));

const Sales = ({ onAddToCart }) => {
  const { selectedCategory } = useCategoryStore();

  // Mock products data - this should come from your backend
  const products = [
    { id: 'm1', name: 'Abonament Gold', price: 150, category: 'memberships', description: 'Acces nelimitat la toate facilitățile' },
    { id: 'm2', name: 'Abonament Silver', price: 100, category: 'memberships', description: 'Acces limitat la facilități' },
    { id: 's1', name: 'Sesiune PT', price: 80, category: 'services', description: 'Sesiune personalizată cu antrenor' },
    { id: 's2', name: 'Masaj', price: 120, category: 'services', description: 'Masaj relaxant de 60 minute' },
    { id: 'sp1', name: 'Proteine', price: 120, category: 'supplements', description: 'Proteine whey isolate' },
    { id: 'sp2', name: 'Creatină', price: 80, category: 'supplements', description: 'Creatină monohidrat' },
    { id: 'a1', name: 'Shaker', price: 30, category: 'accessories', description: 'Shaker 700ml' },
    { id: 'a2', name: 'Prosoape', price: 15, category: 'accessories', description: 'Set de 2 prosoape' },
    { id: 'd1', name: 'Apa Plata', price: 5, category: 'drinks', description: 'Sticlă 500ml' },
    { id: 'd2', name: 'Băutură Proteică', price: 12, category: 'drinks', description: 'Băutură proteică 500ml' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const getCategoryName = (category) => {
    const categoryMap = {
      all: 'Toate Produsele',
      memberships: 'Abonamente',
      services: 'Servicii',
      supplements: 'Suplimente',
      accessories: 'Accesorii',
      drinks: 'Băuturi',
    };
    return categoryMap[category] || category;
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {getCategoryName(selectedCategory)}
      </Typography>
      
      <ProductsGrid>
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id}
            onClick={() => onAddToCart(product)}
          >
            <ProductContent>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </ProductContent>
            <PriceTag>
              {product.price} RON
            </PriceTag>
          </ProductCard>
        ))}
      </ProductsGrid>
    </Container>
  );
};

export default Sales; 