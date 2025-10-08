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
            {/* Desktop Links */}
            <div className='items-center space-x-4 text-2xl hidden md:flex'>
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
            {/* Hamburger for mobile */}
            <div className="md:hidden flex items-center">
                <button
                    className="text-white focus:outline-none"
                    onClick={() => {
                        const menu = document.getElementById('mobile-menu');
                        if (menu) {
                            if (menu.classList.contains('hidden')) {
                                menu.classList.remove('hidden');
                                // Trigger reflow to enable transition
                                void menu.offsetWidth;
                                menu.classList.add('animate-fade-in');
                                menu.classList.remove('animate-fade-out');
                            } else {
                                menu.classList.remove('animate-fade-in');
                                menu.classList.add('animate-fade-out');
                                // Wait for animation to finish before hiding
                                setTimeout(() => {
                                    menu.classList.add('hidden');
                                }, 200); // match animation duration
                            }
                        }
                    }}
                    aria-label="Open menu"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            {/* Mobile Menu */}
            <style jsx global>{`
                @keyframes fadeInMenu {
                    from { opacity: 0; transform: translateY(-10px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                @keyframes fadeOutMenu {
                    from { opacity: 1; transform: translateY(0);}
                    to { opacity: 0; transform: translateY(-10px);}
                }
                .animate-fade-in {
                    animation: fadeInMenu 0.2s ease-out forwards;
                }
                .animate-fade-out {
                    animation: fadeOutMenu 0.2s ease-in forwards;
                }
            `}</style>
            <div
                id="mobile-menu"
                className="absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-2 text-xl py-4 z-50 hidden md:hidden"
            >
                <Link
                    href="/"
                    className={`p-2 w-full text-center ${pathname === "/" ? "underline underline-offset-3" : ""}`}
                    onClick={() => {
                        const menu = document.getElementById('mobile-menu');
                        if (menu) {
                            menu.classList.remove('animate-fade-in');
                            menu.classList.add('animate-fade-out');
                            setTimeout(() => {
                                menu.classList.add('hidden');
                            }, 200);
                        }
                    }}
                >
                    home
                </Link>
                <Link
                    href="/about"
                    className={`p-2 w-full text-center ${pathname === "/about" ? "underline underline-offset-3" : ""}`}
                    onClick={() => {
                        const menu = document.getElementById('mobile-menu');
                        if (menu) {
                            menu.classList.remove('animate-fade-in');
                            menu.classList.add('animate-fade-out');
                            setTimeout(() => {
                                menu.classList.add('hidden');
                            }, 200);
                        }
                    }}
                >
                    about
                </Link>
                <Link
                    href="/services"
                    className={`p-2 w-full text-center ${pathname === "/services" ? "underline underline-offset-3" : ""}`}
                    onClick={() => {
                        const menu = document.getElementById('mobile-menu');
                        if (menu) {
                            menu.classList.remove('animate-fade-in');
                            menu.classList.add('animate-fade-out');
                            setTimeout(() => {
                                menu.classList.add('hidden');
                            }, 200);
                        }
                    }}
                >
                    projects
                </Link>
                <Link
                    href="/blog"
                    className={`p-2 w-full text-center ${pathname === "/blog" ? "underline underline-offset-3" : ""}`}
                    onClick={() => {
                        const menu = document.getElementById('mobile-menu');
                        if (menu) {
                            menu.classList.remove('animate-fade-in');
                            menu.classList.add('animate-fade-out');
                            setTimeout(() => {
                                menu.classList.add('hidden');
                            }, 200);
                        }
                    }}
                >
                    blog
                </Link>
                <Link
                    href="/contact"
                    className={`p-2 w-full text-center ${pathname === "/contact" ? "underline underline-offset-3" : ""}`}
                    onClick={() => {
                        const menu = document.getElementById('mobile-menu');
                        if (menu) {
                            menu.classList.remove('animate-fade-in');
                            menu.classList.add('animate-fade-out');
                            setTimeout(() => {
                                menu.classList.add('hidden');
                            }, 200);
                        }
                    }}
                >
                    contact
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;