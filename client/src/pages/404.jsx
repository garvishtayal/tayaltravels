// NotFoundPage.jsx

import React from 'react';
import styles from '../styles/notFound.module.css';

const NotFoundPage = () => {
  return (
    <section className={styles.page404}>
      <div>
        <div>
          <div className={styles.col}>
            <div className={`${styles.col} ${styles.textCenter}`}>
              <div className={styles.fourZeroFourBg}>
                <h1 className={styles.textCenter}>404</h1>
              </div>
              <div className={styles.contantBox404}>
                <h3>
                  Look like you're lost
                </h3>
                <p>the page you are looking for not available!</p>
                <a href="/" className={styles.link404}>Go to Home</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.logo}>
        <img src='/logoImage.svg'></img>
        <h4>TAYAL TRAVELS</h4>
      </div>
    </section>
  );
};

export default NotFoundPage;
