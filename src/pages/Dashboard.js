import React, { useState, useCallback, useEffect } from 'react';
import { Box, styled } from '@mui/material';
import Split from 'react-split';
import Timeline from '../components/timeline/Timeline';
import CourseList from '../components/courses/CourseList';
import OccupancyIndicator from '../components/courses/OccupancyIndicator';
import NavigationMenuComponent from '../components/navigation/NavigationMenu';
import Sales from '../components/sales/Sales';
import SalesCart from '../components/sales/SalesCart';

const DashboardContainer = styled(Box)({
  width: '100%',
  height: 'calc(100vh - 128px)',
  display: 'flex',
  flexDirection: 'column',
});

const ContentSection = styled(Box)({
  flex: 1,
  position: 'relative',
  height: '100%',
});

const PaneContainer = styled(Box)({
  height: '100%',
  overflow: 'auto',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

const RightPaneContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  gap: '16px',
});

const OccupancySection = styled(Box)({
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

const ContentContainer = styled(Box)({
  flex: 1,
  overflow: 'auto',
  height: '100%',
});

// Content Components
const DashboardContent = ({ content, rightContent }) => {
  const [size, setSize] = useState('75%');
  
  const handleDragEnd = useCallback((sizes) => {
    setSize(`${sizes[0]}%`);
  }, []);

  useEffect(() => {
    const handleTouchStart = (e) => {
      e.preventDefault();
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
    };

    const splitElement = document.querySelector('.split');
    if (splitElement) {
      splitElement.addEventListener('touchstart', handleTouchStart, { passive: false });
      splitElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (splitElement) {
        splitElement.removeEventListener('touchstart', handleTouchStart);
        splitElement.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  return (
    <DashboardContainer>
    <Split
      className="split"
      direction="horizontal"
      sizes={[75, 25]}
      minSize={200}
      onDragEnd={handleDragEnd}
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
      gutterSize={8}
      gutterStyle={() => ({
        backgroundColor: '#e0e0e0',
        width: '8px',
        margin: '0 4px',
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: '#bdbdbd',
        }
      })}
      dragInterval={1}
      snapOffset={0}
      cursor="col-resize"
    >
      <PaneContainer>
        <ContentContainer>
          {content}
        </ContentContainer>
      </PaneContainer>
      <RightPaneContainer>
        {rightContent}
      </RightPaneContainer>
    </Split>
    </DashboardContainer>
  );
};

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('timeline');
  const [cart, setCart] = useState([]);

  const mockOccupancy = {
    gym: {
      current: 15,
      total: 30,
    },
    pool: {
      current: 8,
      total: 20,
    },
    aerobic: {
      current: 12,
      total: 15,
    },
  };

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleConfirmSale = () => {
    // TODO: Implement sale confirmation logic
    console.log('Sale confirmed:', cart);
    setCart([]);
  };

  const handleCancelSale = () => {
    setCart([]);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'timeline':
        return <Timeline />;
      case 'sales':
        return <Sales onAddToCart={handleAddToCart} />;
      case 'add':
        return <Box>Add Member Content</Box>;
      default:
        return <Timeline />;
    }
  };

  const renderRightContent = () => {
    switch (activeMenu) {
      case 'timeline':
        return (
          <>
            <RightPaneContainer sx={{ flex: 1 }}>
              <CourseList />
            <OccupancySection>
              <OccupancyIndicator occupancy={mockOccupancy} />
            </OccupancySection>
            </RightPaneContainer>
          </>
        );
      case 'sales':
        return (
          <RightPaneContainer sx={{ flex: 1 }}>
            <SalesCart
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onConfirmSale={handleConfirmSale}
              onCancelSale={handleCancelSale}
            />
          </RightPaneContainer>
        );
      default:
        return (
          <>
            <PaneContainer sx={{ flex: 1 }}>
              <CourseList />
            </PaneContainer>
            <OccupancySection>
              <OccupancyIndicator occupancy={mockOccupancy} />
            </OccupancySection>
          </>
        );
    }
  };

  return (
    <DashboardContainer>
      <NavigationMenuComponent activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <ContentSection>
        <DashboardContent content={renderContent()} rightContent={renderRightContent()} />
      </ContentSection>
    </DashboardContainer>
  );
};

export default Dashboard; 