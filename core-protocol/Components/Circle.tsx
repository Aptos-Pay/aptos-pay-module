'use strict';

import React, { useState } from 'react';

type CircleProps = {
    isActive: boolean;    
    isLoading: boolean;
    label: string;
    isCompleted: boolean;
};

const Circle: React.FC<CircleProps> = ({ isActive, isLoading, label, isCompleted }) => {
    return (
        <div className="flex flex-col items-center mx-1 md:mx-2">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full relative ${isActive || isCompleted ? 'bg-black' : 'bg-gray-300'}`}>
                {isLoading && <div className="spinner absolute inset-0"></div>}
                {isCompleted && !isLoading && <span className="absolute inset-0 flex items-center justify-center text-white">✓</span>}
            </div>
            <div className="mt-1 text-xs text-center w-16 md:mt-2 md:text-sm md:w-20">{label}</div>
        </div>
    );
}

export default Circle;
