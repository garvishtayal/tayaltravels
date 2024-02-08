// utils/withAuth.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        // Token not present, redirect to login
        router.replace('/owner');
        return;
      }

      // Check with the backend for token verification
      fetch('http://localhost:3001/api/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Invalid token');
          }
          return response.json(); // Parse the JSON from the response
        })
        .then((data) => {
          console.log(data.message); // Log the message from the server
        })
        .catch((error) => {
          console.error(error.message); // Log any errors
          router.replace('/owner');
        });
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
