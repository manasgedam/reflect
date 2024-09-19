import Sidebar from './Sidebar';
import Header from './Header';
import React from 'react';

export default async function Dashboard() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          
        </main>
      </div>
    </div>
  );
};
