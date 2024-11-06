"use client";
import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, CircleHelp, FileCog, FileSearch, Lightbulb, LogOut, MessageSquareQuote, Settings, UserPen } from 'lucide-react';

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
    isCollapsed: boolean;
    index: number;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, isCollapsed, index }) => (
    <Link
        href={`/edit-form/${index}`}
        className={`flex items-center py-[7px] px-2 gap-2 h-[38px] text-gray-800 rounded-lg transition-all duration-300 ease-in-out
            ${isActive ? 'bg-gray-300 text-gray-900 font-bold' : 'text-gray-800 font-medium hover:bg-gray-200'}
            ${isCollapsed ? 'justify-center' : ''}`}
    >
        <span className="w-[20px] h-[20px] flex items-center justify-center">{icon}</span>
        {!isCollapsed && <span className='text-md'>{label}</span>}
    </Link>
);

interface SidebarProps {
    active?: number;
    isCollapsed: boolean;
}

export default function Sidebar({ active, isCollapsed }: SidebarProps) {
    const navItems = [
        { icon: <CircleHelp />, label: "Questions" },
        { icon: <MessageSquareQuote />, label: "Response Summary" },
        { icon: <UserPen />, label: "Individual Responses" },
        { icon: <FileSearch />, label: "Question-Based Reports" },
        { icon: <Lightbulb />, label: "Actionable Insights" },
        { icon: <FileCog />, label: "Form Settings" },
    ];

    return (
        <aside className={` min-h-screen px-3 pt-3 flex flex-col justify-between gap-3`}>
            <nav className="flex flex-col gap-1 flex-grow">
                {navItems.map((item, index) => (
                    <NavItem
                        key={index}
                        icon={item.icon}
                        label={item.label}
                        isActive={index === active}
                        isCollapsed={isCollapsed}
                        index={index} />
                ))}
            </nav>
            <div className='flex flex-col gap-3 mt-auto sticky bottom-0 pb-3'>
                <div className="flex flex-col gap-1">
                    <NavItem
                        icon={<Settings />}
                        label="Settings"
                        isCollapsed={isCollapsed}
                        isActive={6 === active}
                        index={6} />
                    <NavItem
                        icon={<Bell />}
                        label="Notifications"
                        isCollapsed={isCollapsed}
                        isActive={7 === active}
                        index={7} />
                    <NavItem
                        icon={<LogOut />}
                        label="Sign Out"
                        isCollapsed={isCollapsed}
                        isActive={8 === active}
                        index={8} />
                </div>
                <div className={`flex items-center gap-2 border border-gray-300 p-2 h-[42px] bg-white rounded-md cursor-pointer z-10 ${isCollapsed ? 'justify-center' : ''}`}>
                    <Avatar className="w-[20px] h-[20px]">
                        <AvatarImage src="https://avatars.githubusercontent.com/u/63896859?v=4" />
                        <AvatarFallback>SP</AvatarFallback>
                    </Avatar>
                    {!isCollapsed && <span>Sharaneshwar Punjal</span>}
                </div>
            </div>
        </aside>
    );
};
