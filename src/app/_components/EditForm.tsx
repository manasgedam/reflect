import Sidebar from './Sidebar';
import Header from './Header';
import React from 'react';

export default async function Dashboard() {
  return (
    <div className="bg-background h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar active={0} />
        <main className="flex-1">

        </main>
      </div>
    </div>
  );
};
