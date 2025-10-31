// src/components/CookieConsentBanner.jsx
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button'; // Assumes you have a Button component from Shadcn UI or similar
import { X } from 'lucide-react'; // Assumes you have lucide-react installed

const COOKIE_NAME = 'cookie-consent';

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already given consent
    const consent = Cookies.get(COOKIE_NAME);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Set a cookie to remember the user's consent for a year
    Cookies.set(COOKIE_NAME, 'accepted', { expires: 365 });
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Set a cookie for decline to avoid showing the banner on every visit
    Cookies.set(COOKIE_NAME, 'declined', { expires: 365 });
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-green-900 text-white p-4 shadow-lg z-[1000] transition-transform duration-300 transform translate-y-0">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex-1 text-center md:text-left">
          <p className="font-semibold text-lg">Your Privacy Matters to Us</p>
          <p className="text-sm mt-1">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All," you consent to our use of cookies.
          </p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="ghost" onClick={handleDecline} className="border border-white text-white hover:bg-white hover:text-black">
            Decline
          </Button>
          <Button onClick={handleAccept} className="bg-white text-black hover:bg-gray-200">
            Accept All
          </Button>
          {/* <Button variant="ghost" className="text-white hover:bg-gray-700">
             <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Learn More</a>
          </Button> */}
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;

