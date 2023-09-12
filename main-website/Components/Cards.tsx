export default function Cards() {
    const cardData = [
        { bgColor: 'bg-red-500', text: 'Small text test 1' },
        { bgColor: 'bg-blue-500', text: 'Small text test 2' },
        { bgColor: 'bg-green-500', text: 'Small text test test 3' },
        { bgColor: 'bg-yellow-500', text: 'Small text test 4' },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center mr-20 ml-20 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {cardData.map((card, index) => (
                    <div key={index} className={`w-128 h-128 p-8 rounded ${card.bgColor} flex flex-col justify-center items-left`}>
                        <p className="mb-8 text-white header-text tracking-widest">{card.text}</p>
                        <a href="#" className="aptos-green-background text-gray-800 font-bold py-1 md:py-2 px-3 md:px-4 rounded w-full text-center md:w-1/4">LEARN MORE</a>
                    </div>
                ))}
            </div>
        </div>
    );
}
