import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className="max-w-[97%] mx-auto flex flex-col items-center justify-between">
                <div className="flex justify-between min-w-[1000px] mt-[100px]">
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
                    <div className="flex flex-col space-y-[15px]">
                        <h2 className="">Company</h2>
                        <Link
                            className="opacity-40 hover:opacity-65"
                            href="/">
                            Services
                        </Link>
                        <Link
                            className="opacity-40 hover:opacity-65"
                            href="/">
                            Past Work
                        </Link>
                        <Link
                            className="opacity-40 hover:opacity-65"
                            href="/">
                            Contact
                        </Link>
                        <Link
                            className="opacity-40 hover:opacity-65"
                            href="/">
                            Start a Project
                        </Link>


                    </div>
                </div>

                <div className="w-full border-t-solid border-t-[1px] border-t-[#FFFFFF4D] pt-[5px] mt-[75px] mb-[5px]">
                    <div className="flex justify-center">
                        <h3 className="opacity-70 text-[#F6F5FF] text-[12px]">© 2024 Lucidify, All rights reserved.</h3>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer