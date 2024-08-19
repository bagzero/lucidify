import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FeaturesSection = () => {
    return (
        <section className="items-center">
            <div className="my-[200px]">
                <div className="flex flex-col items-center">
                    <div className="UmbrellaBackgroundGradient min-w-[75%] rounded-t-[100%] h-[900px] absolute -z-10">
                    </div>
                    <div className="flex flex-col items-center mt-[200px]">
                        <h1 className="HeadingFont">Why businesses choose <span className="TextGradient">Lucidify</span>.</h1>
                        <h3 className="TextFont mt-[15px]">We don’t want just build websites., we build <span className="font-medium">relationships</span>.</h3>
                    </div>

                    <div className="flex justify-between mt-[100px]">
                        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#101010] rounded-[20px]">
                            <div className="flex flex-col max-w-[250px] mx-[45px] my-[55px]">
                                <div className="flex">
                                    <div className="bg-[#232426] rounded-[10px]">
                                        <div className="w-[50px] m-[4px]">
                                            <Image
                                                src="/Web Design Icon.png"
                                                alt="Lucidify Umbrella"
                                                layout="responsive"  // Adjusts height based on width while maintaining aspect ratio
                                                width={0}           // leave at 0 (wrap with a div and that will choose the width)
                                                height={0}          // leave at 0
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="font-medium mt-[30px] mb-[10px]">Free premium web designs.</h3>
                                <h3 className="text-[14px] opacity-60 mb-[30px] font-light">
                                    We offer free web designs until your satisfied.
                                    Only then do we move onto the next step.
                                </h3>
                                <div className="flex">
                                    <Link className="TextGradient flex items-center"
                                        href="/">
                                        Learn More
                                        <div className="w-[13px] -rotate-45 ml-[5px]">
                                            <Image
                                                src="/Purple Top Right Arrow.png"
                                                alt="Top Right Arrow"
                                                layout="responsive"  // Adjusts height based on width while maintaining aspect ratio
                                                width={0}           // leave at 0 (wrap with a div and that will choose the width)
                                                height={0}          // leave at 0
                                            />
                                        </div>

                                    </Link>
                                </div>

                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#101010] rounded-[20px] mx-[100px]">
                            <div className="flex flex-col max-w-[250px] mx-[45px] my-[55px]">
                                <div className="flex">
                                    <div className="bg-[#232426] rounded-[10px]">
                                        <div className="w-[50px] m-[4px]">
                                            <Image
                                                src="/Web Hosting Icon.png"
                                                alt="Lucidify Umbrella"
                                                layout="responsive"  // Adjusts height based on width while maintaining aspect ratio
                                                width={0}           // leave at 0 (wrap with a div and that will choose the width)
                                                height={0}          // leave at 0
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="font-medium mt-[30px] mb-[10px]">Free website hosting.</h3>
                                <h3 className="text-[14px] opacity-60 mb-[30px] font-light">
                                    Reliable, secure, and fast hosting at no cost.
                                    We take care of everything so you can focus on your business.
                                </h3>
                                <div className="flex">
                                    <Link className="TextGradient flex items-center"
                                        href="/">
                                        Learn More
                                        <div className="w-[13px] -rotate-45 ml-[5px]">
                                            <Image
                                                src="/Purple Top Right Arrow.png"
                                                alt="Top Right Arrow"
                                                layout="responsive"  // Adjusts height based on width while maintaining aspect ratio
                                                width={0}           // leave at 0 (wrap with a div and that will choose the width)
                                                height={0}          // leave at 0
                                            />
                                        </div>

                                    </Link>
                                </div>

                            </div>
                        </div>


                        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#101010] rounded-[20px]">
                            <div className="flex flex-col max-w-[250px] mx-[45px] my-[55px]">
                                <div className="flex">
                                    <div className="bg-[#232426] rounded-[10px]">
                                        <div className="w-[50px] m-[4px]">
                                            <Image
                                                src="/Dollar Icon.png"
                                                alt="Lucidify Umbrella"
                                                layout="responsive"  // Adjusts height based on width while maintaining aspect ratio
                                                width={0}           // leave at 0 (wrap with a div and that will choose the width)
                                                height={0}          // leave at 0
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="font-medium mt-[30px] mb-[10px]">High quality, affordable prices.</h3>
                                <h3 className="text-[14px] opacity-60 mb-[30px] font-light">
                                    Other web dev companies cost a lot.
                                    We deliver high-quality solutions that fit your budget.
                                </h3>
                                <div className="flex">
                                    <Link className="TextGradient flex items-center"
                                        href="/">
                                        Learn More
                                        <div className="w-[13px] -rotate-45 ml-[5px]">
                                            <Image
                                                src="/Purple Top Right Arrow.png"
                                                alt="Top Right Arrow"
                                                layout="responsive"  // Adjusts height based on width while maintaining aspect ratio
                                                width={0}           // leave at 0 (wrap with a div and that will choose the width)
                                                height={0}          // leave at 0
                                            />
                                        </div>

                                    </Link>
                                </div>

                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturesSection