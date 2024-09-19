"use client";
import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, CircleHelp, FileCog, FileSearch, Lightbulb, LogOut, MessageSquareQuote, Settings, UserPen } from 'lucide-react';

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label }) => (
    <Link
        href="#"
        className="flex items-center p-1 px-2 gap-2 text-gray-800 rounded-lg hover:bg-gray-200"
    >
        <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
        <span>{label}</span>
    </Link>
);

export default function Sidebar() {
    return (
        <aside className="w-65 h-full p-3 py-5 flex flex-col justify-between gap-3">
            <nav className="flex flex-col gap-2">
                <NavItem icon={<CircleHelp />} label="Questions" />
                <NavItem icon={<FileCog />} label="Form Settings" />
                <NavItem icon={<MessageSquareQuote />} label="Response Summary" />
                <NavItem icon={<UserPen />} label="Individual Responses" />
                <NavItem icon={<FileSearch />} label="Question-Based Reports" />
                <NavItem icon={<Lightbulb />} label="Actionable Insights" />
            </nav>
            <div className="mt-auto flex flex-col gap-2">
                <NavItem icon={<Settings />} label="Settings" />
                <NavItem icon={<Bell />} label="Notifications" />
                <NavItem icon={<LogOut />} label="Sign Out" />
            </div>
            <div className="flex items-center gap-2 border border-gray-400 p-2 bg-white rounded-md cursor-pointer">
                <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Manas Gedam</span>
            </div>
        </aside>
    );
};
