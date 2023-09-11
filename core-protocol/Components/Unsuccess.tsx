'use client';

import React, { useState } from 'react';
import unsucessImage from "../Images/unsuccess.png"
import Image from 'next/image'
import Link from 'next/link'

const Unsuccess = () => {
    return(
        <div className="max-w-screen-sm flex flex-wrap items-center justify-between mx-auto p-4 mt-4 md:mt-16">
            <div className='bg-white rounded-3xl w-full p-4 md:p-8'>
                <div className='text-center text-2xl'>
                    Transaction failed
                </div>
                <div className='place-content-center flex mt-5'>
                    <Image src={unsucessImage} alt="Unsuccess Image" width={150} height={150} />
                </div>
                <div className='text-center text-sm mt-5'>
                    Your transaction has failed. Please try again.
                </div>
                <div className='center flex w-full justify-center mt-16'>
                    <Link href="/" className='flex items-center justify-center border text-black w-full border-gray-800 rounded-xl h-12 transition-all duration-800 ease-in-out hover:text-white hover:bg-black hover:rounded-xl'>
                        Go Back
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Unsuccess