import Image from 'next/image'
import headerImage from "../Images/headerImage.jpg"

export default function Header() {
    return (
        <section className="main-header flex flex-col md:flex-row justify-between items-center p-4 md:p-10 bg-black">
            <div className="flex-1 ml-4 md:ml-10 mb-6 md:mb-0">
                <div className="text-justify space-y-2 md:space-y-4">
                    <h1 className="header-text font-bold text-left">This is some random words</h1>
                    <p className="text-sm md:text-lg text-gray-600">This is a small description about the main content. You can provide more details or any other relevant information here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet facilisis urna. Praesent ac gravida libero. Donec non odio justo.</p>
                    
                    <div className="mt-4 md:mt-6 space-y-2 md:space-y-4">
                        <h2 className="text-xl md:text-2xl font-semibold">Get started with Aptos Pay on Shopify today</h2>
                        <div className="flex space-x-2 md:space-x-4">
                            <button className="border aptos-border aptos-green font-bold py-1 md:py-2 px-3 md:px-4 rounded transition duration-300 hover:bg-gray-900">Get Started</button>
                            <button className="aptos-green-background text-gray-800 font-bold py-1 md:py-2 px-3 md:px-4 rounded">Aptos Pay Docs</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 order-first md:order-none">
                <Image src={headerImage} alt="Header Image" layout="responsive" width={500} height={300} />
            </div>
        </section>
    )
}
