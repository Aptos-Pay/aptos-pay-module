import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const QrPayment = () => {
    const [copySuccess, setCopySuccess] = useState('');
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const [amount, setAmount] = useState<string | null>("0");
    const [orderId, setOrderId] = useState<number | null>(null);
    const [paymentAddress, setPaymentAddress] = useState<string | null>(null);
    const { push } = useRouter();

    const init = async () => {

        let amountJson = {
            amount: amount
        }

        const response = await fetch('api/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(amountJson),
        });

        const data = await response.json();
        setOrderId(data.orderId)

        const paymentAddress = await fetch(`api/getPaymentAddressByUid?orderId=${data.orderId}`);
        const paymentAddressData = await paymentAddress.json();
        setPaymentAddress(paymentAddressData.paymentAddress);

    }

    useEffect(() => {
        init()
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

    const shoppingData = {
        shopName: 'Aptos Shop',
        cartPrice: '16.00',
        transactionFee: '0.025',
        usdPrice: '16.03',

    }

    return (
        <div>
            <div className='flex justify-between'>
                <div className='text-l sm:text-2xl'>
                    Pay the {shoppingData.shopName}
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
                ${shoppingData.usdPrice}
            </div>

            <div className='text-sm sm:text-l'>
                ~{amount} APT
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
                    <p className='text-xl'> ${shoppingData.cartPrice} </p>
                </div>

                <div className='flex justify-between'>
                    <p className='text-xl'> Transaction Fee </p>
                    <p className='text-xl'> ${shoppingData.transactionFee} </p>
                </div>
            </div>

        </div>

    )
}

export default QrPayment