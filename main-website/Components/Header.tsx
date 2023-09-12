import Image from 'next/image'
import headerImage from "../Images/headerImage.jpg"

export default function Header() {
    return (
        <section className="flex justify-between items-center p-10 bg-black">
            <div className="text-left space-y-4">
                <h1 className="text-4xl font-bold">Main Text Here</h1>
                <p className="text-lg text-gray-600">This is a small description about the main content. You can provide more details or any other relevant information here.</p>
            </div>
            <div className="w-1/3">
                <Image src={headerImage} alt="Header Image" layout="responsive" width={500} height={300} />
            </div>
        </section>
    )
}
