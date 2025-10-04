"use client"

import Link from 'next/link';
import { logo } from '../styles/fonts';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    
    return (
        <nav className={`bg-gray-800 text-white flex justify-between items-center px-10 py-2 ${logo.className}`}>
            <div className="flex justify-between items-center">
            {/* logo */}
                <div className="p-3.5 bg-gray-900 rounded-lg flex items-center text-2xl border border-gray-700">
                    AKC
                </div>
                <span className='text-white px-3 text-2xl'>
                    {pathname}
                </span>
            </div>
            <div className='items-center space-x-4 text-2xl hidden md:flex'>
                {/* Links */}
                <Link
                    href="/"
                    className={`p-2 ${pathname === "/" ? "underline underline-offset-3" : ""}`}
                >
                    home
                </Link>
                <Link
                    href="/about"
                    className={`p-2 ${pathname === "/about" ? "underline underline-offset-3" : ""}`}
                >
                    about
                </Link>
                <Link
                    href="/services"
                    className={`p-2 ${pathname === "/services" ? "underline underline-offset-3" : ""}`}
                >
                    projects
                </Link>
                <Link
                    href="/blog"
                    className={`p-2 ${pathname === "/blog" ? "underline underline-offset-3" : ""}`}
                >
                    blog
                </Link>
                <Link
                    href="/contact"
                    className={`p-2 ${pathname === "/contact" ? "underline underline-offset-3" : ""}`}
                >
                    contact
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;