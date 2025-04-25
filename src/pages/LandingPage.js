import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styles from './LandingPage.module.css';
import InvertedCard from '../components/Hero/InvertedCard';
import MembershipCard from '../components/MembershipCard';
import Facilities from '../components/Facilities/Facilities';
import Packages from '../components/Packages/landingpackages/Packages';
import Classes from '../components/Classes/Classes';
import PhotoGallery from '../components/PhotoGallery/PhotoGallery';
import Footer from '../components/Footer/Footer';
import gymDescription from '../content/gym-description.md';
import useAuthStore from '../store/authStore';

// Sample photos - replace with your actual photos
const galleryPhotos = [
  '/images/gym1.jpg',
  '/images/gym2.jpg',
  '/images/gym3.jpg',
  '/images/gym4.jpg',
  '/images/gym5.jpg',
  '/images/gym6.jpg',
];

const LandingPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  
  const title = "FitLife Center";
  const identifier = "Fitness & Wellness";
  
  return (
    <div className={styles.main}>
      <section className={styles.hero}>
        <InvertedCard />
      </section>
      
      <section className={styles.descriptionMap}>
        <div className={styles.description}>
          <div className={styles.hotelInfo}>
            <h1 className={styles.title}>{title}</h1>
            <h3 className={styles.identifier}>{identifier}</h3>
          </div>
          <div className={styles.servicesDescription}>
            {user ? (
              <div className={styles.membershipCardContainer}>
                <MembershipCard
                  membershipType={user.membershipType}
                  expiryDate={user.expiryDate}
                  memberName={user.name}
                  accessLevel={user.accessLevel}
                  visits={user.visits}
                  lastVisit={user.lastVisit}
                  personalTrainer={user.personalTrainer}
                />
              </div>
            ) : (
              <ReactMarkdown>{gymDescription}</ReactMarkdown>
            )}
          </div>
        </div>
        
        <div className={styles.map}>
          {/* <LocationMap position={position} /> */}
        </div>
      </section>

      <Facilities />

      <Packages />

      <Classes />

      <PhotoGallery photos={galleryPhotos} />

      <Footer />
    </div>
  );
};

export default LandingPage; 