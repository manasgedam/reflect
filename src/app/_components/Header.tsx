"use client";
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import React, { useState } from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;  // Accept a function to toggle sidebar
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const [title, setTitle] = useState('TY CSE Course Feedback Form');

  const handleTitleChange = (e: React.FormEvent<HTMLSpanElement>) => {
    setTitle(e.currentTarget.textContent || '');
  };

  return (
    <header className="w-full p-3 flex justify-between items-center">
      <div className="flex items-center justify-center gap-3 text-lg font-semibold">
        <button onClick={onToggleSidebar} className="p-[7px]">
          <Menu size={24} />
        </button>
        <Link href="/">
          <Image
            src="/images/logo.png"
            width={40}
            height={40}
            alt="logo"
            draggable={false}
          />
        </Link>
        <span
          id='formTitle'
          className="underline font-bold focus:outline-none"
          contentEditable
          suppressContentEditableWarning={true}
          onInput={handleTitleChange}>
          TY CSE Course Feedback Form
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Button>Publish</Button>
        <Button>Share</Button>
      </div>
    </header>
  );
};
