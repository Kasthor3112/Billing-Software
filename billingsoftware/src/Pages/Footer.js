import React, { useState, useEffect, useCallback } from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-white text-center p-4 mt-8 rounded-t-lg shadow-inner">
    <div className="max-w-4xl mx-auto">
      <p>&copy; {new Date().getFullYear()} SKR Services. All rights reserved.</p>
      <p className="text-sm mt-1">Designed with ❤️ for SKR Businesses.</p>
    </div>
  </footer>
);

export default Footer;