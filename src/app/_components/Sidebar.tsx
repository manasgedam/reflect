"use client";
import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, CircleHelp, FileCog, FileSearch, Lightbulb, LogOut, MessageSquareQuote, Settings, UserPen } from 'lucide-react';

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive }) => (
    <Link
        href="#"
        className={`flex items-center p-1 px-2 gap-2 text-gray-800 rounded-lg ${isActive ? 'bg-gray-300 text-gray-900' : 'text-gray-800 hover:bg-gray-200'}`}
    >
        <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
        <span>{label}</span>
    </Link>
);

interface SidebarProps {
    active?: number;
}

export default function Sidebar({ active }: SidebarProps) {
    const navItems = [
        { icon: <CircleHelp />, label: "Questions" },
        { icon: <FileCog />, label: "Form Settings" },
        { icon: <MessageSquareQuote />, label: "Response Summary" },
        { icon: <UserPen />, label: "Individual Responses" },
        { icon: <FileSearch />, label: "Question-Based Reports" },
        { icon: <Lightbulb />, label: "Actionable Insights" },
    ];

    return (
        <aside className="w-65 h-full p-3 py-5 flex flex-col justify-between gap-3">
            <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                    <NavItem key={index} icon={item.icon} label={item.label} isActive={index === active} />
                ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2">
                <NavItem icon={<Settings />} label="Settings" />
                <NavItem icon={<Bell />} label="Notifications" />
                <NavItem icon={<LogOut />} label="Sign Out" />
            </div>
            <div className="flex items-center gap-2 border border-gray-400 p-2 bg-zinc-100 rounded-md cursor-pointer z-10">
                <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>Manas Gedam</span>
            </div>
        </aside>
    );
};
