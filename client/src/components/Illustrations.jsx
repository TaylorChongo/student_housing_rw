import React from 'react';

export const SearchIllustration = () => (
  <svg viewBox="0 0 500 500" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="250" cy="250" r="150" fill="#ecfdf5" />
    <path d="M250 150C194.772 150 150 194.772 150 250C150 305.228 194.772 350 250 350C305.228 350 350 305.228 350 250" stroke="#10b981" strokeWidth="20" strokeLinecap="round" />
    <path d="M320 320L400 400" stroke="#10b981" strokeWidth="20" strokeLinecap="round" />
    <rect x="220" y="220" width="60" height="60" rx="10" fill="#10b981" opacity="0.2" />
  </svg>
);

export const ChatIllustration = () => (
  <svg viewBox="0 0 500 500" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="100" y="100" width="300" height="220" rx="40" fill="#ecfdf5" />
    <path d="M150 210H350M150 260H280" stroke="#10b981" strokeWidth="20" strokeLinecap="round" />
    <circle cx="400" cy="350" r="60" fill="#10b981" />
    <path d="M380 350H420M400 330V370" stroke="white" strokeWidth="10" strokeLinecap="round" />
  </svg>
);

export const SecureIllustration = () => (
  <svg viewBox="0 0 500 500" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M250 50L100 120V250C100 350 250 450 250 450C250 450 400 350 400 250V120L250 50Z" fill="#ecfdf5" stroke="#10b981" strokeWidth="20" />
    <path d="M180 250L230 300L320 190" stroke="#10b981" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CommunityIllustration = () => (
  <svg viewBox="0 0 800 400" className="w-full h-full opacity-20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="200" r="80" fill="currentColor" />
    <circle cx="300" cy="200" r="100" fill="currentColor" />
    <circle cx="500" cy="200" r="120" fill="currentColor" />
    <circle cx="700" cy="200" r="80" fill="currentColor" />
    <rect x="0" y="300" width="800" height="100" fill="currentColor" />
  </svg>
);

export const HeroDecoration = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full opacity-30 animate-pulse" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="200" cy="200" r="150" stroke="#10b981" strokeWidth="1" strokeDasharray="10 10" />
    <circle cx="200" cy="200" r="100" stroke="#10b981" strokeWidth="2" strokeDasharray="5 5" />
    <circle cx="200" cy="200" r="50" fill="#10b981" opacity="0.1" />
  </svg>
);
