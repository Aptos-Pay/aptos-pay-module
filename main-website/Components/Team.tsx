import Image from 'next/image';

import DanielHigh from '../Images/danielhigh.png';
import DavidBailey from '../Images/david.jpg';
import Ali from '../Images/ali.jpg';

import Twitter from '../Images/xlogo.png';
import GitHub from '../Images/github.png';

export default function Team() {
    return (
        <div>
            <h1 className="header-text font-bold text-center mb-10">Our Team</h1>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-20 mb-10">
                {teamMembers.map((member) => (
                    <div key={member.name} className="flex flex-col items-center space-y-4 w-full md:w-auto">
                        {/* Image in a Circle */}
                        <div className="w-64 h-64 overflow-hidden rounded-full">
                            <Image src={member.image} alt={member.name} width={256} height={256} />
                        </div>

                        {/* Name */}
                        <h2 className="text-xl font-bold">{member.name}</h2>

                        {/* Socials */}
                        <div className="flex space-x-4">
                            <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                                <Image src={Twitter} alt="Twitter" className="w-6 h-6" />
                            </a>
                            <a href={member.github} target="_blank" rel="noopener noreferrer">
                                <Image src={GitHub} alt="GitHub" className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


const teamMembers = [
    {
        name: 'DavidBailey',
        image: DavidBailey,
        twitter: 'https://twitter.com/davidbailey_eth',
        github: 'https://github.com/davd-ops'
    },
    {
        name: '0xAli',
        image: Ali,
        twitter: 'https://twitter.com/0xAli_',
        github: 'https://github.com/0xAli0'
    },
    {
        name: 'DanielHigh',
        image: DanielHigh,
        twitter: 'https://twitter.com/dhigh_eth',
        github: 'https://github.com/DanielHighETH'
    }
];
