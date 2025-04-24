import React, { useState } from 'react';
import styles from './Packages.module.css';
import PackageCard from './PackageCard';

const packages = [
  { 
    id: 'pkg_gold_001', 
    name: 'Gold Membership', 
    price: 150, 
    entry_limit: null, 
    entry_type: 'unlimited', 
    is_single_use: false, 
    tier: 'gold',
    features: [
      'Acces nelimitat la toate facilitățile',
      'Acces la piscină',
      'Acces la saună',
      'Antrenor personal inclus',
      'Reduceri la suplimente'
    ]
  },
  { 
    id: 'pkg_silver_002', 
    name: 'Silver Access', 
    price: 100, 
    entry_limit: 12, 
    entry_type: 'monthly', 
    is_single_use: false, 
    tier: 'silver',
    features: [
      '12 intrări pe lună',
      'Acces la sala de fitness',
      'Acces la grupuri de fitness',
      'Consultanță nutrițională'
    ]
  },
  { 
    id: 'pkg_black_003', 
    name: 'Black VIP', 
    price: 250, 
    entry_limit: null, 
    entry_type: 'unlimited', 
    is_single_use: false, 
    tier: 'black',
    features: [
      'Acces nelimitat 24/7',
      'Acces VIP la toate facilitățile',
      'Antrenor personal dedicat',
      'Acces la spa și masaje',
      'Programări prioritare',
      'Reduceri exclusive'
    ]
  },
  { 
    id: 'pkg_daypass_004', 
    name: 'Day Pass', 
    price: 20, 
    entry_limit: 1, 
    entry_type: 'total', 
    is_single_use: true, 
    tier: 'none',
    features: [
      'Acces pentru o zi',
      'Acces la sala de fitness',
      'Acces la grupuri de fitness'
    ]
  },
  { 
    id: 'srv_pt_005', 
    name: 'Personal Training Session', 
    price: 80, 
    entry_limit: 1, 
    entry_type: 'total', 
    is_single_use: true, 
    tier: 'service',
    features: [
      'Sesiune de 60 minute',
      'Program personalizat',
      'Evaluare fitness',
      'Plan de nutriție'
    ]
  }
];

const Packages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visiblePackages = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 <= packages.length - visiblePackages ? prevIndex + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 >= 0 ? prevIndex - 1 : packages.length - visiblePackages
    );
  };

  return (
    <div className={styles.packagesContainer}>
      <h2 className={styles.title}>PACHETE</h2>
      <div className={styles.carouselContainer}>
        <button className={styles.arrowButton} onClick={prevSlide}>
          <span className={styles.arrow}>←</span>
        </button>
        <div className={styles.packagesWrapper}>
          {packages.slice(currentIndex, currentIndex + visiblePackages).map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>
        <button className={styles.arrowButton} onClick={nextSlide}>
          <span className={styles.arrow}>→</span>
        </button>
      </div>
    </div>
  );
};

export default Packages; 