import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import StartAProjectButton from './StartAProjectButton'
import LogInButton from './LogInButton'

const GetStartedSection = () => {
    return (
        <section className="items-center">
            <div className="BackgroundGradient rounded-[50px]">
                <div className="flex flex-col items-center max-w-[700px] mx-auto pt-[50px] pb-[150px]">
                    <div className="flex justify-center items-center rounded-full bg-white shadow-sm shadow-neutral-900">
                        <div className="flex items-center justify-center mx-[16px] my-[8px]">
                            <div className="flex items-center my-[0px] mx-[2px]">
                                <div className="w-[14px] mr-3">
                                    <Image
                                        src="/Lucidify Umbrella and L (black gradient).png"
                                        alt="Lucidify Umbrella"
                                        layout="responsive"  // Adjusts height based on width while maintaining aspect ratio
                                        width={0}           // leave at 0 (wrap with a div and that will choose the width)
                                        height={0}          // leave at 0
                                    />
                                </div>
                                <h2 className="tracking-[4px] font-semibold text-[14px] text-black">GET STARTED TODAY</h2>
                            </div>
                        </div>

                    </div>

                    <h1 className="HeadingFont text-center my-[22px]">Lets build something <span className="TextGradient">amazing</span> together.</h1>
                    <h3 className="TextFont text-center mb-[50px]">
                        Take the first step toward a website that elevates your business.
                        Whether you need a complete overhaul or a brand-new site, Lucidify will bring your vision to life.
                    </h3>

                    <div className="flex justify-between">
                        <div className="mr-[32px]">
                            <StartAProjectButton />
                        </div>

                        <LogInButton />
                    </div>
                </div>
            </div>

        </section>
    )
}

export default GetStartedSection