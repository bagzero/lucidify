"use client"

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import NavStartAProjectButton from './NavStartAProjectButton';
import Popup from './Popup'; // Import the Popup component

const Navbar = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <header>
            {/* Pass isPopupOpen as isVisible to control the slide-in animation */}
            <Popup closePopup={togglePopup} isVisible={isPopupOpen} />

            {/* Desktop Navigation (hidden on screens smaller than 1000px) */}
            <nav className="hidden lg:flex justify-center h-[125px] items-center">
                <div className="xl:w-[80%] md:w-[85%] 2xl:w-[75%] flex justify-between items-center text-[14px]">
                    <Link href="/" className="relative w-[125px]">
                        <Image
                            src="/Lucidify white logo.png"
                            alt="Lucidify Logo"
                            layout="responsive"
                            width={0}
                            height={0}
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
                            href="/contact"
                            className="mx-6 font-medium flex flex-col items-center NavItemHover"
                        >
                            Let&apos;s Connect
                            <div className="h-[1px] w-[50%] bg-white rounded-full NavItemUnderline"></div>
                        </Link>
                    </div>
                    <NavStartAProjectButton onClick={togglePopup} /> {/* Trigger popup on button click */}
                </div>
            </nav>

            {/* Mobile Navigation (hidden on screens larger than 1000px) */}
            <nav className="lg:hidden flex justify-center items-center">
                <div className="xl:w-[80%] md:w-[85%] w-[90%] mt-[30px] 2xl:w-[75%] flex justify-between items-center text-[14px] border-solid border border-1 border-[#414141] rounded-full py-[8px] px-[16px]">
                    <Link href="/" className="relative sm:w-[125px] w-[110px]">
                        <Image
                            src="/Lucidify white logo.png"
                            alt="Lucidify Logo"
                            layout="responsive"
                            width={0}
                            height={0}
                        />
                    </Link>
                    <div className="flex items-center">
                        <NavStartAProjectButton onClick={togglePopup} />
                        <div className="w-[30px] h-[30px] rounded-full bg-white shadow cursor-pointer ml-[10px] flex flex-col justify-center items-center active:scale-[0.90] active:opacity-75 duration-100 ease-in-out">
                            <div className="w-[14px] h-[2px] bg-black rounded-full" />
                            <div className="w-[14px] h-[2px] bg-black rounded-full my-[2px]" />
                            <div className="w-[14px] h-[2px] bg-black rounded-full" />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
