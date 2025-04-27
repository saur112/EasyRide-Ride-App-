// components/Home/GoogleWrapper.js
'use client';
import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const GoogleWrapper = ({ children }) => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
      libraries={['places']}
    >
      {children}
    </LoadScript>
  );
};

export default GoogleWrapper;
