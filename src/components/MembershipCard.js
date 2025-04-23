import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './MembershipCard.module.css';

const MembershipCard = ({ membershipType, expiryDate, memberName, accessLevel, visits, lastVisit }) => {
  const getAccessLevelColor = (level) => {
    switch (level) {
      case 'vip':
        return '#FFD700'; // Gold
      case 'premium':
        return '#C0C0C0'; // Silver
      default:
        return '#CD7F32'; // Bronze
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO');
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardInfo}>
          <div className={styles.memberDetails}>
            <h2 className={styles.accessLevel} style={{ backgroundColor: getAccessLevelColor(accessLevel) }}>
              {accessLevel.toUpperCase()}
            </h2>
            <p className={styles.memberName}>{memberName}</p>
            <p className={styles.expiryDate}>Exp. {expiryDate}</p>
          </div>
        </div>
        <div className={styles.qrCode}>
          <QRCodeSVG 
            value={`${memberName}-${membershipType}-${expiryDate}`}
            size={200}
            level="H"
          />
        </div>
      </div>
    </div>
  );
};

export default MembershipCard; 