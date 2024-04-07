import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'flowbite-react'
import hero1 from '../../assets/img/hero-1.svg'
import hero2 from '../../assets/img/hero-2.svg'
import hero3 from '../../assets/img/hero-3.svg'
import hero4 from '../../assets/img/hero-4.svg'
import { ReactTyped } from 'react-typed'
function Hero() {
    return (
        <>
            <div className='flex flex-col poppins lg:flex-row items-center py-20 px-12 h-96 justify-between my-20'>
                <div className='w-full'>
                    <h6 className='text-themeColor-300 text-2xl font-semibold mooli'>100% Customer Benefits </h6>
                    <h1 className='text-7xl font-bold leading-tight'><ReactTyped cursorChar='' typeSpeed={60} strings={['Empowering Your Buying and Selling Experiences.']}>
                    </ReactTyped>
                    </h1>
                </div>
                <div className='w-full'>
                    <div className='h-96 bg-gray-50 rounded-2xl'>
                        <Carousel slideInterval={1200}>
                            <img src={hero1} className='object-fill h-full' alt="" />
                            <img src={hero2} className='object-fill h-full' alt="" />
                            <img src={hero3} className='object-fill h-full' alt="" />
                            <img src={hero4} className='object-fill h-full' alt="" />
                        </Carousel>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Hero
