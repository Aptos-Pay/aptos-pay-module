'use client'

import React, { useState } from 'react';

const Payment = () => {
    const [activeTab, setActiveTab] = useState('wallet');


  return (
    <div className="max-w-screen-sm flex flex-wrap items-center justify-between mx-auto p-4 mt-16">

        <div className='bg-white rounded-3xl w-full p-8'>

            <div className='flex mb-8 border rounded-lg bg-gray-300 overflow-hidden'>
                <button 
                    onClick={() => setActiveTab('wallet')}
                    className={`text-black text-sm w-1/2 border-gray-800 h-9 ${activeTab === 'wallet' ? 'bg-white' : ''}`}>
                    Pay With Wallet
                </button>
                <button 
                    onClick={() => setActiveTab('qr')}
                    className={`text-black text-sm w-1/2 h-9 ${activeTab === 'qr' ? 'bg-white' : ''}`}>
                    Pay With QR Code
                </button>
            </div>

            <div className='flex justify-between'>
                <div className='text-l sm:text-2xl'>
                    Pay the testshop 
                </div>
                <div>
                    Time remaining
                    <p className='text-red-600 '>09:59</p>
                </div>

            </div>

            <div className='text-xl sm:text-2xl'>
                $1,456.67
            </div>

            <div className='text-xl sm:text-2xl mt-10 flex justify-between'>
                <div>
                    264.29 APT
                </div>

                    {/*<div>
                    Pay with
                     dropdown for currency select 
                    </div>*/}
            </div>
            <hr className="h-px my-8 bg-gray-800 border-0 dark:bg-gray-700" />

            <div className='p-2'>
                <div className='flex justify-between'>
                    <p className='text-xl'> Cart </p>
                    <p className='text-xl'> $1,456.67 </p>
                </div>

                <div className='flex justify-between'>
                    <p className='text-xl'> Transaction Fee </p>
                    <p className='text-xl'> $0.025 </p>
                </div>
            </div>

            <div className='center flex w-full justify-center mt-24'>
                <button className='border text-black w-full border-gray-800	 rounded-xl h-12'> Connect Wallet </button>
            </div>
            <div className='center flex w-full justify-center mt-2'>
                <button className='text-white w-full bg-black rounded-xl h-12'> Pay now </button>
            </div>

            
        </div>

    </div>
  )
}

export default Payment