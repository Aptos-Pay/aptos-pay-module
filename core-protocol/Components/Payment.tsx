'use client'

import { useState } from 'react';

import WalletPayment from './WalletPayment';
import QrPayment from './QrPayment';


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
                        Pay With QR
                    </button>
                </div>


                {activeTab === 'wallet' && <WalletPayment />}
                {activeTab === 'qr' && <div><QrPayment /></div>}

            </div>
        </div>
    )
}

export default Payment