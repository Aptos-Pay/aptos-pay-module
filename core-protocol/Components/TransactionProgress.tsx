'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Circle from './Circle';
import Connector from './Connector';

function statusHandler(status: string){
    switch(status){
        case 'SUBMITTED':
            return 0;
        case 'WAITING_FOR_PAYMENT':
            return 1;
        case 'PROCESSING':
            return 2;
        case 'COMPLETED':
            return 3;
        default:
            return 0;
    }
}

const TransactionProgress = () => {
    const { push } = useRouter();
    const [currentState, setCurrentState] = useState(0); 

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await fetch('api/checkPaymentStatus');
                const data = await response.json();

                setCurrentState(statusHandler(data.status));

                if(data.status === 'ERROR'){
                    clearInterval(interval);
                    push('/unsuccess');
                } else if (data.status === 'COMPLETED') {
                    clearInterval(interval);
                    setTimeout(() => {
                        push('/success');
                    }, 2000);
                }
            } catch (error) {
                console.error("Error fetching payment status:", error);
            }
        }, 10000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="max-w-screen-sm flex flex-wrap items-center justify-between mx-auto p-4 mt-4 md:mt-16">
            <div className='bg-white rounded-3xl w-full p-4 md:p-8'>
                <div className='text-center text-2xl'> 
                    Transaction in progress 
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full mt-5 md:mt-10 space-y-4 md:space-y-0"> 
                    <Circle isActive={currentState >= 0} isCompleted={currentState >= 0} isLoading={false} label="Submitted" />
                    {/*}<Connector isActive={currentState >= 1} />
                    <Circle isActive={currentState >= 1} isCompleted={currentState >= 1} isLoading={currentState === 0} label="Approving" />
                    {*/}
                    <Connector isActive={currentState >= 1} />
                    <Circle isActive={currentState >= 1} isCompleted={currentState >= 1} isLoading={currentState === 0} label="Processing" />
                    <Connector isActive={currentState >= 2} />
                    <Circle isActive={currentState >= 2} isCompleted={currentState == 2} isLoading={currentState === 1} label="Completing" /> 
                </div>

                <div className='center flex w-full justify-center mt-16'>
                     <button className='border text-black w-full border-gray-800 rounded-xl h-12 transition-all duration-800 ease-in-out hover:text-white hover:bg-black hover:rounderd-xl'> Cancel transaction </button>
                </div>
            </div>
        </div>
    );
}

export default TransactionProgress;