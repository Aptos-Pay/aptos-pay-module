export default function Features() {
    const featuresData = [
        { heading: 'Feature 1', text: 'Description for feature 1.', icon: '🚀' },
        { heading: 'Feature 2', text: 'Description for feature 2.', icon: '💡' },
        { heading: 'Feature 3', text: 'Description for feature 3.', icon: '🔒' },
        { heading: 'Feature 4', text: 'Description for feature 4.', icon: '🌍' },
    ];

    return (
        <div>
            <h1 className="header-text font-bold text-center mb-10">Our Features</h1>
            
            <div className="max-w-xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md aptos-border mb-20">
                {featuresData.map((feature, index) => (
                    <div 
                        key={index} 
                        className={`${index !== featuresData.length - 1 ? 'border-b' : ''} p-4 hover:bg-gray-700 transition duration-300 ease-in-out rounded hover:aptos-border ${index !== featuresData.length - 1 ? 'mb-4' : ''}`}
                    >
                        <div className="flex items-center mb-2">
                            <span className="text-5xl mr-4">{feature.icon}</span>
                            <h2 className="text-3xl font-bold">{feature.heading}</h2>
                        </div>
                        <p>{feature.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}