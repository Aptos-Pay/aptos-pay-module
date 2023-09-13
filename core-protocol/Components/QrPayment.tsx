import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode.react';

import Image from 'next/image';
import copyIcon from '../Images/copy.png'
import axios from 'axios';

const QrPayment = () => {
    const [copySuccess, setCopySuccess] = useState('');
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const [amount, setAmount] = useState<string | null>("0");
    const [orderId, setOrderId] = useState<string>("");
    const [paymentAddress, setPaymentAddress] = useState<string>("");
    const { push } = useRouter();

    useEffect(() => {
        setAmount('0.1');
    }, []);

    const shoppingData = {
        shopName: 'Aptos Shop',
        cartPrice: '16.00',
        transactionFee: '0.025',
        usdPrice: '16.03',
    }

    const init = async () => {

        let amountJson = {
            amount: '0.1'
        }

        const response = await fetch('api/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(amountJson),
        });

        const data = await response.json();

        let orderId = data.orderId;

        const paymentAddress = await fetch(`api/getPaymentAddressByUid?orderId=${data.orderId}`);
        const paymentAddressData = await paymentAddress.json();
        setPaymentAddress(paymentAddressData.paymentAddress);

        const interval = setInterval(async () => {
            try {
                const params = new URLSearchParams();
                params.append('orderId', orderId);
                const options = {
                    method: 'GET',
                    url: 'api/checkPaymentStatus',
                    params: params,
                    headers: {
                        accept: 'application/json',
                    },
                };
                const req = await axios.request(options)
                // const response = await fetch('api/checkPaymentStatus?orderId=' + orderId);
                const data = await req.data;


                if (data.status === 'COMPLETED') {
                    clearInterval(interval);
                    localStorage.removeItem('startTime');
                    push('/success');
                }
            } catch (error) {
                console.error("Error fetching payment status:", error);
            }
        }, 5000);

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
                {
                    paymentAddress && <QRCode value={paymentAddress} size={250} />
                }
                {
                    !paymentAddress && <div className='spinner'></div>
                }
            </div>
            <div className='place-content-center flex flex-col items-center'>
                {
                    paymentAddress &&
                    <div className="flex items-center mt-2 cursor-pointer" onClick={() => copyToClipboard(paymentAddress)}>
                        <p className="mr-2">{paymentAddress.substring(0, 4)}...{paymentAddress.substring(paymentAddress.length - 4)}</p>
                        <Image src={copyIcon} alt="copy" width={16} height={16} />
                    </div>
                }

                {copySuccess && <div className='text-sm text-green-500 mt-2'>{copySuccess}</div>}
            </div>



            <div className='p-2 mt-5'>
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