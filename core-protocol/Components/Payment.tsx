'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Types, AptosClient } from 'aptos';

// Create an AptosClient to interact with devnet.
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');





function WalletPayment() {
    const { push } = useRouter();
    const [address, setAddress] = React.useState<string | null>(null);
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const [amount, setAmount] = useState<number | null>(null);
    const [paymentAddress, setPaymentAddress] = useState<string | null>(null);

    const init = async() => {
        const { address, publicKey } = await window.aptos.connect();
        setAddress(address);

        let amountJson = {
            "amount": 100000000,
        }

        const response = await fetch('api/createOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify(amountJson), // change this amount
          });
        
          const data = await response.json();

        const paymentAddress = await fetch('api/getPaymentAddressByUid?orderId=' + data.orderId);
        const paymentAddressData = await paymentAddress.json();
        setPaymentAddress(paymentAddressData.paymentAddress);

      }

      const payNow = async() => {
        const transaction = {
            arguments: [paymentAddress, '100000000'],
            function: '0x1::coin::transfer',
            type: 'entry_function_payload',
            type_arguments: ['0x1::aptos_coin::AptosCoin'],
          };

          try {
            const pendingTransaction = await(
              window as any
              ).aptos.signAndSubmitTransaction(transaction);
           
            // In most cases a dApp will want to wait for the transaction, in these cases you can use the typescript sdk
            const client = new AptosClient('https://devnet.aptoslabs.com');
            const txn = await client.waitForTransactionWithResult(
              pendingTransaction.hash,
            );
          } catch (error) {
            // see "Errors"
          }
      }
      


      useEffect(() => {
          const duration = 10 * 60 * 1000; //10 minutes
  
          const startTime = localStorage.getItem('startTime');
  
          if (!startTime) {
              const now = new Date().getTime();
              localStorage.setItem('startTime', now.toString());
              setTimeRemaining(duration);
          } else {
              const elapsed = new Date().getTime() - parseInt(startTime);
              const remaining = duration - elapsed;
              setTimeRemaining(remaining);
          }
      }, []);
  
      useEffect(() => {
          if (timeRemaining !== null && timeRemaining > 0) {
              const timer = setTimeout(() => {
                  setTimeRemaining(timeRemaining - 1000);
              }, 1000);
  
              return () => clearTimeout(timer);
          } else if (timeRemaining !== null && timeRemaining <= 0) {
                localStorage.removeItem('startTime');
                push('/unsuccess');
        }
      }, [timeRemaining]);

    return (
        <div>
 <div className='flex justify-between'>
                <div className='text-l sm:text-2xl'>
                    Pay the testshop    
                </div>
                <div>
            Time remaining
            <p className='text-red-600 '>
                {Math.floor(timeRemaining! / 60000).toString().padStart(2, '0')}:
                {Math.floor((timeRemaining! % 60000) / 1000).toString().padStart(2, '0')}
            </p>
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
                        <button onClick={payNow} className='text-white w-full bg-black rounded-xl h-12'> Pay now </button>
                    </>
                }
            </div>



            
        </div>

    )
}

function QRPayment() {
    const [copySuccess, setCopySuccess] = useState('');
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const { push } = useRouter();

    useEffect(() => {
        const duration = 10 * 60 * 1000; //10 minutes

        const startTime = localStorage.getItem('startTime');

        if (!startTime) {
            const now = new Date().getTime();
            localStorage.setItem('startTime', now.toString());
            setTimeRemaining(duration);
        } else {
            const elapsed = new Date().getTime() - parseInt(startTime);
            const remaining = duration - elapsed;
            setTimeRemaining(remaining);
        }
    }, []);

    useEffect(() => {
        if (timeRemaining !== null && timeRemaining > 0) {
            const timer = setTimeout(() => {
                setTimeRemaining(timeRemaining - 1000);
            }, 1000);

            return () => clearTimeout(timer);
        } else if (timeRemaining !== null && timeRemaining <= 0) {
            localStorage.removeItem('startTime');
            push('/unsuccess');
      }
    }, [timeRemaining]);

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
            <p className='text-red-600 '>
                {Math.floor(timeRemaining! / 60000).toString().padStart(2, '0')}:
                {Math.floor((timeRemaining! % 60000) / 1000).toString().padStart(2, '0')}
            </p>
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