'use client';

import React, { useState } from 'react';
import Circle from './Circle';
import Connector from './Connector';

const TransactionProgress = () => {
    const [currentState, setCurrentState] = useState(2); 
    
    return (
        <div className="max-w-screen-sm flex flex-wrap items-center justify-between mx-auto p-4 mt-4 md:mt-16">
            <div className='bg-white rounded-3xl w-full p-4 md:p-8'>
                <div className='text-center text-sm md:text-l lg:text-2xl'> 
                    Transaction in progress 
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between w-full mt-5 md:mt-10 space-y-4 md:space-y-0"> 
                    <Circle isActive={currentState >= 0} isCompleted={currentState >= 0} isLoading={false} label="Submitted" />
                    <Connector isActive={currentState >= 1} />
                    <Circle isActive={currentState >= 1} isCompleted={currentState >= 1} isLoading={currentState === 0} label="Approving" />
                    <Connector isActive={currentState >= 2} />
                    <Circle isActive={currentState >= 2} isCompleted={currentState >= 2} isLoading={currentState === 1} label="Processing" />
                    <Connector isActive={currentState >= 3} />
                    <Circle isActive={currentState >= 3} isCompleted={currentState == 3} isLoading={currentState === 2} label="Completing" /> 
                </div>

                <div className='center flex w-full justify-center mt-16'>
                     <button className='border text-black w-full border-gray-800 rounded-xl h-12 transition-all duration-800 ease-in-out hover:text-white hover:bg-black hover:rounderd-xl'> Cancel transaction </button>
                </div>
            </div>
        </div>
    );
}

export default TransactionProgress;