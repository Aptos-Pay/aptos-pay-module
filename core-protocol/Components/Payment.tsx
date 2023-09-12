'use client'

import React, { useState } from 'react';
import { Types, AptosClient } from 'aptos';

// Create an AptosClient to interact with devnet.
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');




function WalletPayment() {
    const [address, setAddress] = React.useState<string | null>(null);

    const init = async() => {
        const { address, publicKey } = await window.aptos.connect();
        setAddress(address);
      }

      console.log(address)

    return (
        <div>
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
                $1,456.695
            </div>

            <div className='text-sm sm:text-l'>
            ~264.29 APT
            </div>

            <div className='text-xl sm:text-2xl mt-2 flex justify-between'>

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

            <div className='center flex w-full justify-center mt-28 flex-col'>
                {
                    !address && 
                    <>
                    <button onClick={init} className='border text-black w-full border-gray-800 rounded-xl h-12 mb-2'> Connect Wallet </button>
                    <button disabled className='text-white w-full bg-black rounded-xl h-12 cursor-not-allowed'> Pay now </button>
                    </>
                }
                {
                    address && 
                    <>
                        <button disabled className='border text-black w-full border-gray-800 rounded-xl h-12 mb-2'>{address.substring(0, 4) + '...' + address.substring(address.length - 4)}</button>
                        <button className='text-white w-full bg-black rounded-xl h-12'> Pay now </button>
                    </>
                }
            </div>



            
        </div>

    )
}

function QRPayment() {
    const [copySuccess, setCopySuccess] = useState('');

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopySuccess('Address copied!');
                setTimeout(() => setCopySuccess(''), 2000);
            })
            .catch(err => console.error('Failed to copy text: ', err));
    };

    return (
        <div>
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
                $1,456.695
            </div>

            <div className='text-sm sm:text-l'>
            ~264.29 APT
            </div>

            <div className='place-content-center flex mt-5'>
                <img src='https://via.placeholder.com/250' />
            </div>
            <div className='place-content-center flex flex-col items-center'>
                <p className="cursor-pointer" onClick={() => copyToClipboard('0x71ed1....1b24975')}>0x71ed1....1b24975</p>
                {copySuccess && <div className='text-sm text-green-500 mt-2'>{copySuccess}</div>}
            </div>



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
            
        </div>

    )
}

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
            {activeTab === 'qr' && <div><QRPayment /></div>}

        </div>
    </div>
  )
}

export default Payment