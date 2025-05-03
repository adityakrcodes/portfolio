import Link from 'next/link';
import { logo } from '../styles/fonts';

const Navbar = () => {
    return (
        <nav className={`bg-gray-800 text-white flex justify-between items-center px-10 py-2 ${logo.className}`}>
            <div className="flex justify-between items-center">
            {/* logo */}
                <div className="p-2 bg-gray-900 rounded-lg flex items-center">
                    AKC
                </div>
            </div>
            <div className='flex items-center space-x-4'>
                {/* Links */}
                <Link href="/" className='p-2 underline underline-offset-3'>Home</Link>
                <Link href="/about" className='p-2'>About</Link>
                <Link href="/services" className='p-2'>Projects</Link>
                <Link href="/blog" className='p-2'>Blog</Link>
                <Link href="/contact" className='p-2'>Contact</Link>
            </div>
        </nav>
    );
}

export default Navbar;