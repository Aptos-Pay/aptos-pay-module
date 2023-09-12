import Link from 'next/link'
import Image from 'next/image'
import logo from "../Images/AptosPayLogo.png"

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-5 bg-black text-white ml-20">
            <div className="logo">
                <Image src={logo} width={128} height={77} alt='logo' />
            </div>
            <div className="space-x-8 font-bold text-xl mr-20">
                <Link href="/" className="hover:text-gray-300">Home</Link>
                <Link href="/docs" className="hover:text-gray-300">Docs</Link>
                <Link href="/github" className="hover:text-gray-300">Github</Link>
            </div>
        </nav>
    )
}
