'use client'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AOSWrapper = ({ children }) => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    });
  }, []);

  return <>{children}</>;
};

export default AOSWrapper;