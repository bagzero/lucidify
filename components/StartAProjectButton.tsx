import Link from 'next/link'
import React from 'react'

const StartAProjectButton = () => {
    return (
        <Link
            href="/"
            className="flex justify-center items-center rounded-[8px] bg-[#725CF7] BoxShadow hover:bg-[#5D3AEA] ">
            <h1 className="mx-[20px] my-[8px]">Start a Project</h1>
        </Link>
    )
}

export default StartAProjectButton