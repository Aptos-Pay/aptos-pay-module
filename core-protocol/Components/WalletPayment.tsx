import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Types, AptosClient } from 'aptos';
import { log } from 'console';

// Create an AptosClient to interact with devnet.
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');


const WalletPayment = () => {
    const { push } = useRouter();
    const [address, setAddress] = useState<string | null>(null);
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const [amount, setAmount] = useState<string | null>("0");
    const [orderId, setOrderId] = useState<number | null>(null);
    const [paymentAddress, setPaymentAddress] = useState<string | null>(null);

    const init = async () => {
        const { address, publicKey } = await window.aptos.connect();
        setAddress(address);

        let amountJson = {
            amount: amount,
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

    const payNow = async () => {
        const transaction = {
            arguments: [paymentAddress, (Number(amount) * 10 ** 8).toString()],
            function: '0x1::coin::transfer',
            type: 'entry_function_payload',
            type_arguments: ['0x1::aptos_coin::AptosCoin'],
        };

        try {
            const pendingTransaction = await (
                window as any
            ).aptos.signAndSubmitTransaction(transaction);

            const client = new AptosClient('https://devnet.aptoslabs.com');
            const txn = await client.waitForTransactionWithResult(
                pendingTransaction.hash,
            );
            if (txn) {
                localStorage.removeItem('startTime');
                push(`/progress?orderId=${orderId}`);
            }
        } catch (error) {
            console.error("Error submitting transaction:", error)
            localStorage.removeItem('startTime');
            push('/unsuccess');
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


    useEffect(() => {
        setAmount('0.1'); //18 usd - 3.53
    }, []);

    const shoppingData = {
        shopName: 'Aptos Shop',
        cartPrice: '18.00',
        transactionFee: '0.025',
        usdPrice: '18.03',

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
                    <p className='text-xl'> ${shoppingData.cartPrice} </p>
                </div>

                <div className='flex justify-between'>
                    <p className='text-xl'> Transaction Fee </p>
                    <p className='text-xl'> ${shoppingData.transactionFee} </p>
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
                    address && paymentAddress &&
                    <>
                        <button disabled className='border text-black w-full border-gray-800 rounded-xl h-12 mb-2'>{address.substring(0, 4) + '...' + address.substring(address.length - 4)}</button>
                        <button onClick={payNow} className='text-white w-full bg-black rounded-xl h-12'> Pay now </button>
                    </>
                }
                {
                    address && !paymentAddress &&
                    <>
                        <div className='spinner'></div>
                    </>
                }
            </div>




        </div>

    )
}

export default WalletPayment