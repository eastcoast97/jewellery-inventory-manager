/**
 * UI Component
 * React frontend for the application
 */

import React from 'react';

interface UIProps {
  children?: React.ReactNode;
}

export function UI({ children }: UIProps) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">UI</h2>
      {children}
    </div>
  );
}
