import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import StartAProjectButton from './StartAProjectButton';

const Navbar = () => {
    return (
        <header>
            <nav className="flex justify-center h-[125px] items-center">
                <div className="w-[75%] flex justify-between items-center text-[14px]">
                    <Link
                        href="/"
                        className="relative w-[125px]"> {/* Set fixed width */}
                        <Image
                            src="/Lucidify white logo.png"
                            alt="Lucidify Logo"
                            layout="responsive"  // Adjusts height based on width while maintaining aspect ratio
                            width={0}           //leave at 0 (wrap with a div and that will choose the width)
                            height={0}          // leave at 0
                        />
                    </Link>
                    <div className="flex">
                        <Link
                            href="/"
                            className="mx-6 font-medium flex flex-col items-center NavItemHover"
                        >
                            Home
                            <div className="h-[1px] w-[50%] bg-white rounded-full NavItemUnderline"></div>
                        </Link>
                        <Link
                            href="/"
                            className="mx-6 font-medium flex flex-col items-center NavItemHover"
                        >
                            Services
                            <div className="h-[1px] w-[50%] bg-white rounded-full NavItemUnderline"></div>
                        </Link>
                        <Link
                            href="/"
                            className="mx-6 font-medium flex flex-col items-center NavItemHover"
                        >
                            Our Creations
                            <div className="h-[1px] w-[50%] bg-white rounded-full NavItemUnderline"></div>
                        </Link>
                        <Link
                            href="/"
                            className="mx-6 font-medium flex flex-col items-center NavItemHover"
                        >
                            Let&apos;s Connect
                            <div className="h-[1px] w-[50%] bg-white rounded-full NavItemUnderline"></div>
                        </Link>
                    </div>
                    <StartAProjectButton />
                </div>
            </nav>
        </header >
    );
};

export default Navbar;
