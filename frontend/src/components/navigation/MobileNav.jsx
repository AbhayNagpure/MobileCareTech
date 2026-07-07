import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNav = ({ navLinks }) => {
  const location = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border/40 z-50 pb-safe">
      <div className="flex items-center h-16 px-2">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`
                relative flex-1 flex flex-col items-center justify-center h-full gap-1 transition-colors
                ${isActive ? 'text-primary' : 'text-muted-foreground'}
              `}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-b-md bg-primary" />
              )}
              {link.icon}
              <span className="text-xs font-medium">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
