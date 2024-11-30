import React from "react";

export const TabsList = ({ children, className }) => (
  <div className={`flex border-b border-gray-700 ${className}`}>{children}</div>
);

export const TabsTrigger = ({ children, value, className, onClick }) => (
  <button
    className={`px-4 py-2 focus:outline-none ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export const TabsContent = ({ children, value }) => <div>{children}</div>;

export const Tabs = ({ children, defaultValue, className }) => (
  <div className={className}>{children}</div>
);
