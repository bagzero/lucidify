import Link from 'next/link'
import React from 'react'

const NavStartAProjectButton = () => {
    return (
        <Link
            href="/"
            className="flex justify-center items-center rounded-[8px] bg-[#725CF7] BoxShadow hover:bg-[#5D3AEA] ">
            <h1 className="sm:mx-[20px] sm:my-[8px] mx-[14px] my-[6px] sm:text-[16px] text-[12px]">Start a Project</h1>
        </Link>
    )
}

export default NavStartAProjectButton