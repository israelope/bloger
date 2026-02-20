import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    // Reduced padding on mobile (p-5) vs desktop (md:p-10)
    <main className='p-5 md:p-10'>
        {/* flex-col stacks items vertically; md:flex-row puts them side-by-side */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0'>
            
            {/* Logo Section */}
            <div className='flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left'>
                <Link to="/">
                  <h1 className='font-black text-2xl md:text-xl'>Amanda</h1>
                </Link>
                <p className='text-gray-500 text-sm md:text-base'>a freelance blog writer</p>
            </div>

            {/* Navigation Links */}
            {/* Changed <a> to <Link> to prevent page refreshes */}
            <div className='flex flex-wrap justify-center gap-6 md:gap-10 font-medium'>
                <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/" className="hover:text-blue-600 transition-colors">About</Link>
                <Link to="/" className="hover:text-blue-600 transition-colors">Blog</Link>
                <Link to="/" className="hover:text-blue-600 transition-colors">Contact</Link>
            </div>
            
        </div>
    </main>
  )
}

export default Navbar;