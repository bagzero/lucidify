import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogInButton from './LogInButton'

const HeroSection = () => {
  return (
    <section className="items-center">
      <div
        className="flex justify-center rounded-[50px] mx-auto BackgroundGradient"
      >
        <div className="flex items-center w-full flex-col mt-[125px] mb-[150px] max-w-[650px]">
          <div className="flex justify-center items-center border-solid border border-1 border-[#2F2F2F] rounded-full">
            <div className="flex">
              <div className="flex items-center my-1.5 mx-5">
                <div className="w-[16px] mr-3">
                  <Image
                    src="/Lucidify Umbrella and L (black gradient).png"
                    alt="Lucidify Umbrella"
                    layout="responsive"  // Adjusts height based on width while maintaining aspect ratio
                    width={0}           // leave at 0 (wrap with a div and that will choose the width)
                    height={0}          // leave at 0
                  />
                </div>
                <h2 className="tracking-[4px] font-medium text-[12px]">WEB DEVELOPMENT AGENCY</h2>
              </div>
            </div>
          </div>
          <h1 className="TitleFont my-[22px] text-center leading-[75px]">Take your <span className="TextGradient">business</span> to the next level.</h1>
          <div className="max-w-[80%] mb-[45px]">
            <h3 className="TextFont text-center">Lucidify will build your dream website hassle-free, delivering a seamless process that saves you time and effort.</h3>
          </div>
          <div className="flex justify-center">
            <Link
              href="/"
              className="flex justify-center items-center rounded-full bg-white mr-[32px] shadow-sm shadow-neutral-900 hover:shadow-lg
              hover:shadow-gray-600 hover:-translate-y-[4px]">
              <div className="flex items-center justify-center mx-[16px] my-[8px]">
                <h1 className="text-black font-medium mr-1">Get a Demo</h1>
                <div className="w-[11px]">
                  <Image
                    src="/Black Right Arrow.png"
                    alt="Lucidify Umbrella"
                    layout="responsive"  // Adjusts height based on width while maintaining aspect ratio
                    width={0}           // leave at 0 (wrap with a div and that will choose the width)
                    height={0}          // leave at 0
                  />
                </div>
              </div>

            </Link>
            <LogInButton />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection