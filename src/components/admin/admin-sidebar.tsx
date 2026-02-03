"use client";

import { Package, Image, Layers, Mail, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { name: 'Products', href: '/admin', icon: Package },
    { name: 'Gallery', href: '/admin/gallery', icon: Image },
    { name: 'Inventory', href: '/admin/inventory', icon: Layers },
    { name: 'Enquiries', href: '/admin/enquiries', icon: Mail },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r border-black/5 min-h-screen p-6 flex flex-col">
            <div className="mb-8">
                <Link href="/admin" className="text-xl font-bold uppercase tracking-widest text-black">
                    MIRAI
                </Link>
                <p className="text-xs text-black/40 mt-1">Admin Panel</p>
            </div>

            <nav className="space-y-2 flex-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== '/admin' && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-black text-white shadow-md'
                                : 'text-black/60 hover:bg-neutral-100'
                                }`}
                        >
                            <Icon size={18} />
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-8 border-t border-black/5 mt-8 space-y-4">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Logout</span>
                </Link>

                <p className="text-[10px] text-center text-black/20">
                    Mirai Admin v2.0
                </p>
            </div>
        </aside>
    );
}
