import styles from './footer.module.css';
import React, {useState} from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Footer = () => {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [showJoinMessage, setShowJoinMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');

    try {
      const response = await fetch('http://localhost:3001/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      console.log('Subscribed successfully');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleJoin = async (email) => {

    setShowJoinMessage(true);
    setEmail('');
    setTimeout(() => {
      setShowJoinMessage(false);
    }, 3000);
    try {
      const response = await fetch('http://localhost:3001/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error joining:', error); // Log the error 
    }
  };


  return (
    <footer className={styles.footer} id='business-enquiry'>
      <div className={styles.footerHead}>
        <img src='/logoImage.svg' alt="Logo" />
        <h1>TAYAL TRAVELS</h1>
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.logoContainer}>
          <img src="/logoImage.svg" alt="Logo" />
        </div>
        <div className={styles.textContainer}>
          <p>
            Embark on a journey with us and discover the wonders of the world.
            From hidden gems to popular destinations, our travel blog brings you
            stories, tips, and inspiration for your next adventure.
          </p>

          <nav className={styles.footerNav}>
            <ul>
              <li><a onClick={() => router.push('/')}>Home</a></li>
              <li><a onClick={() => router.push('/#adventure')}>Destinations</a></li>
              <li><a onClick={() => router.push('/#wildlife')}>Blog</a></li>
              <li><a onClick={() => router.push('/#about')}>About Us</a></li>
              <li><a onClick={() => router.push('/#contact')}>Contact</a></li>
            </ul>
          </nav>
          <div>
            <p>
              <FaEnvelope /> admin@tayaltravels.com
            </p>
            <p>
              <FaEnvelope /> help@tayaltravels.com
            </p>
          </div>

        </div>
        <div className={styles.joinUsContainer} id='join'>
          <h3>Join Us</h3>
          <p>Subscribe to our newsletter for the latest updates.</p>

          <form onSubmit={(e) => {
            e.preventDefault();
            handleJoin(email); 
          }}
            className={styles.subscribeForm}>
            <input 
            type="email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>

          {showJoinMessage &&
            <div className={styles.joinMessage}>Thanks for Joining!</div>
          }

        </div>
      </div>
      <p className={styles.footerRightReserved}>&copy; 2024 Tayal Travels. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
