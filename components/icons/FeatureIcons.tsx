import React from 'react'

interface IconProps {
  className?: string
  width?: number
  height?: number
}

// AI Technology Icon
export const AITechnologyIcon: React.FC<IconProps> = ({ 
  className = '', 
  width = 32, 
  height = 32 
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Robot Head */}
    <rect
      x="14"
      y="10"
      width="20"
      height="18"
      rx="3"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Eyes */}
    <circle cx="19" cy="17" r="2.5" fill="currentColor" />
    <circle cx="29" cy="17" r="2.5" fill="currentColor" />
    {/* Antenna */}
    <circle cx="24" cy="10" r="2" fill="currentColor" />
    <line x1="24" y1="10" x2="24" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="6" r="1.5" fill="currentColor" />
    {/* Circuit Lines */}
    <path
      d="M18 23 L22 23 M26 23 L30 23"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Body */}
    <rect
      x="16"
      y="28"
      width="16"
      height="12"
      rx="2"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Circuit Pattern */}
    <circle cx="20" cy="32" r="1.5" fill="currentColor" />
    <circle cx="24" cy="36" r="1.5" fill="currentColor" />
    <circle cx="28" cy="32" r="1.5" fill="currentColor" />
    <path
      d="M20 32 L24 36 L28 32"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
)

// Digital Solutions Icon
export const DigitalSolutionsIcon: React.FC<IconProps> = ({ 
  className = '', 
  width = 32, 
  height = 32 
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Laptop Base */}
    <rect
      x="8"
      y="26"
      width="32"
      height="4"
      rx="2"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Laptop Screen */}
    <rect
      x="10"
      y="6"
      width="28"
      height="22"
      rx="2"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Screen Content */}
    <rect x="14" y="10" width="20" height="14" rx="1" fill="currentColor" fillOpacity="0.15" />
    {/* Code Lines */}
    <line x1="16" y1="13" x2="30" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="17" x2="26" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="21" x2="28" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Logo/Dot */}
    <circle cx="20" cy="13" r="1" fill="currentColor" />
    <circle cx="18" cy="17" r="1" fill="currentColor" />
    <circle cx="20" cy="21" r="1" fill="currentColor" />
  </svg>
)

// Enterprise Automation Icon
export const EnterpriseAutomationIcon: React.FC<IconProps> = ({ 
  className = '', 
  width = 32, 
  height = 32 
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer Gear */}
    <path
      d="M24 8 L26 14 L32 12 L30 18 L36 20 L30 22 L32 28 L26 26 L24 32 L22 26 L16 28 L18 22 L12 20 L18 18 L16 12 L22 14 Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Inner Gear */}
    <path
      d="M24 14 L25 17 L28 16 L27 19 L30 20 L27 21 L28 24 L25 23 L24 26 L23 23 L20 24 L21 21 L18 20 L21 19 L20 16 L23 17 Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    {/* Center Circle */}
    <circle cx="24" cy="20" r="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
    {/* Center Dot */}
    <circle cx="24" cy="20" r="1.5" fill="currentColor" />
    {/* Rotating Lines */}
    <line x1="24" y1="20" x2="24" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="24" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="24" y1="20" x2="28" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="24" y1="20" x2="16" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

// Cloud Mobile Icon
export const CloudMobileIcon: React.FC<IconProps> = ({ 
  className = '', 
  width = 32, 
  height = 32 
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Cloud */}
    <path
      d="M16 20 C12 20 8 24 8 28 C8 32 12 36 16 36 L34 36 C38 36 42 32 42 28 C42 24 38 20 34 20 C34 16 30 12 26 12 C22 12 18 16 18 20"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Cloud Detail */}
    <circle cx="20" cy="24" r="3" fill="currentColor" fillOpacity="0.2" />
    <circle cx="28" cy="24" r="3" fill="currentColor" fillOpacity="0.2" />
    <circle cx="24" cy="28" r="3" fill="currentColor" fillOpacity="0.2" />
    {/* Mobile Device */}
    <rect
      x="28"
      y="8"
      width="10"
      height="16"
      rx="2"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Screen */}
    <rect x="29.5" y="10" width="7" height="12" rx="1" fill="currentColor" fillOpacity="0.2" />
    {/* Home Button */}
    <circle cx="33" cy="24" r="1" fill="currentColor" />
    {/* Signal Lines */}
    <path
      d="M34 6 L34 4 M32 8 L32 6 M36 8 L36 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

