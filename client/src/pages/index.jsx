import React, { useState, useEffect } from 'react';
import styles from '../styles/mainPage.module.css';

import Navbar from '../components/Navbar/navbar';
import MainHeadContainer from '../components/MainPageComponents/MainHeadContainer/mainHeadContainer';
import MainPageSecondComponent from '../components/MainPageComponents/MainPageSecondComponent/mainPageSecondComponent';
import MainAdventureComponent from '../components/MainPageComponents/MainAdventureComponent/mainAdventureComponent';
import MainPeaceComponent from '../components/MainPageComponents/MainPeaceComponent/mainPeaceComponent';
import MainWildlifeComponent from '../components/MainPageComponents/MainWildlifeComponent/mainWildlifeComponent';

import AboutSection from '../components/MainPageComponents/AboutSection/aboutSection';

import Footer from '../components/Footer/footer';



const MainPage = () => {
  
  const [scrolling, setScrolling] = useState(false);


  useEffect(() => {
    const handleScroll = () => {

      const isScrolling = window.scrollY > 0;
      setScrolling(isScrolling);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 


  return (
    <div>
      <Navbar isScrolled={scrolling} />

      <div className={styles.mainPageContainer}>

        <MainHeadContainer />
        <MainPageSecondComponent />
        <MainAdventureComponent />
        <MainPeaceComponent />
        <MainWildlifeComponent />

        <AboutSection />

        <Footer />

      </div>
    </div>
  );
};

export default MainPage;
