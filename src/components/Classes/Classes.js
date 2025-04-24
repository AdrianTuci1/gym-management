import React from 'react';
import styles from './Classes.module.css';

const Classes = () => {
  const classes = [
    {
      id: 1,
      title: 'Antrenament 1 la 1',
      description: 'Sesiuni personalizate de antrenament cu un antrenor dedicat, adaptate nevoilor tale specifice.',
      image: '/images/personal-training.jpg'
    },
    {
      id: 2,
      title: 'Clasa Zumba',
      description: 'Sesiuni energice de dans și fitness care combină mișcări latino cu exerciții cardio.',
      image: '/images/zumba.jpg'
    }
  ];

  return (
    <section className={styles.classesSection}>
      <h2 className={styles.sectionTitle}>Clase</h2>
      <div className={styles.classesGrid}>
        {classes.map((classItem) => (
          <div key={classItem.id} className={styles.classContainer}>
            <div className={styles.classCard}>
              <div className={styles.imageContainer}>
                <img src={classItem.image} alt={classItem.title} className={styles.classImage} />
              </div>
            </div>
            <div className={styles.textContainer}>
              <h3 className={styles.classTitle}>{classItem.title}</h3>
              <p className={styles.classDescription}>{classItem.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Classes; 