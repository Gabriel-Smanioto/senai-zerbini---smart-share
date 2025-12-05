import React from 'react';
import { Icons } from './ui/Icon';

const Header: React.FC = () => {
  return (
    <header className="w-full flex flex-col md:flex-row justify-between items-start md:items-center py-4 px-4 md:px-8 border-b border-border bg-opacity-50 backdrop-blur-md sticky top-0 z-10 bg-background/80">
      <div className="flex items-center gap-3 mb-4 md:mb-0">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#34d399]"></div>
        <span className="text-xs md:text-sm font-mono text-accent tracking-wider">REDE: ONLINE (1GBPS)</span>
      </div>

      <div className="flex gap-6 text-gray-400 text-xs md:text-sm font-mono">
        <div className="flex items-center gap-2">
          <Icons.Thermometer size={16} className="text-pink-500" />
          <span>24°C</span>
        </div>
        <div className="flex items-center gap-2">
          <Icons.Wind size={16} className="text-blue-400" />
          <span>CO₂: 420ppm (Bom)</span>
        </div>
      </div>
      
      <div className="hidden md:block">
        <button className="px-4 py-1.5 rounded-full border border-border text-xs bg-card hover:bg-cardHover transition-colors text-gray-300">
          • ACESSO ADMIN
        </button>
      </div>
    </header>
  );
};

export default Header;