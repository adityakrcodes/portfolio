import Link from 'next/link';
import { logo } from '../styles/fonts';

const Navbar = () => {
    return (
        <nav className={`bg-gray-800 text-white flex justify-between items-center px-10 py-2 ${logo.className}`}>
            <div className="flex justify-between items-center">
            {/* logo */}
                <div className="p-3.5 bg-gray-900 rounded-lg flex items-center text-2xl border border-gray-700">
                    AKC
                </div>
            </div>
            <div className='flex items-center space-x-4 text-2xl'>
                {/* Links */}
                <Link href="/" className='p-2 underline underline-offset-3'>home</Link>
                <Link href="/about" className='p-2'>about</Link>
                <Link href="/services" className='p-2'>projects</Link>
                <Link href="/blog" className='p-2'>blog</Link>
                <Link href="/contact" className='p-2'>contact</Link>
            </div>
        </nav>
    );
}

export default Navbar;