import React, { useState, useEffect } from 'react';
import './mainPage.css';

import Navbar from '../../Components/Navbar/navbar';
import MainHeadContainer from '../../Components/MainPageComponents/MainHeadContainer/mainHeadContainer';
import MainPageSecondComponent from '../../Components/MainPageComponents/MainPageSecondComponent/mainPageSecondComponent';
import MainAdventureComponent from '../../Components/MainPageComponents/MainAdventureComponent/mainAdventureComponent';
import MainPeaceComponent from '../../Components/MainPageComponents/MainPeaceComponent/mainPeaceComponent';
import MainAdventureSecondComponent from '../../Components/MainPageComponents/MainAdventureSecondComponent/mainAdventureSecondComponent';

import AboutSection from '../../Components/MainPageComponents/AboutSection/aboutSection';

import Footer from '../../Components/Footer/footer';



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

      <div className='mainPageContainer'>

        <MainHeadContainer />
        <MainPageSecondComponent />
        <MainAdventureComponent />
        <MainPeaceComponent />
        <MainAdventureSecondComponent />

        <AboutSection />

        <Footer />

      </div>
    </div>
  );
};

export default MainPage;
