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

  const getOverlayClass = (level) => {
    switch (level) {
      case 'vip':
        return styles.overlayVip;
      case 'premium':
        return styles.overlayPremium;
      default:
        return styles.overlayRegular;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO');
  };

  return (
    <div className={styles.card} style={{ borderColor: getAccessLevelColor(accessLevel) }}>
      <div className={`${styles.overlay} ${getOverlayClass(accessLevel)}`} />
      <div className={styles.cardContent}>
        <div className={styles.cardInfo}>
          <div>
            <div className={styles.header}>
              <h2 className={styles.membershipType}>{membershipType}</h2>
              <span className={styles.accessLevel} style={{ backgroundColor: getAccessLevelColor(accessLevel) }}>
                {accessLevel.toUpperCase()}
              </span>
            </div>
            <div className={styles.memberDetails}>
              <p className={styles.memberName}>{memberName}</p>
              <p className={styles.expiryDate}>Exp. {expiryDate}</p>
            </div>
          </div>
          <div className={styles.stats}>
            <p>Vizite: {visits}</p>
            <p>Ultima vizită: {formatDate(lastVisit)}</p>
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