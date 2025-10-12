import Footer from "@/app/components/Footer";
import { logo, text } from "@/app/styles/fonts";

export default function About() {
    return (
        <div className="flex flex-col min-h-full text-white">
            <div className="w-full md:w-5/12 mx-auto">
                <div className="container mx-auto px-10 py-10">
                    <div className="flex flex-col lg:flex-row gap-10 items-start">
                        {/* Left Column - About Text */}
                        <div className="flex-1 space-y-8">
                            <h1 className={`text-6xl font-bold ${logo.className}`}>
                                About
                            </h1>
                            <div className={`text-lg leading-relaxed ${text.className}`}>
                                <p>
                                    I am a MERN Developer and a Solana Dev writing Secure I am a •MERN Developer. and a Solana Dev writing Secure I am a MERN Developer and a Solana Dev writing Secure I am a MERN Developer and a Solana Dev writing •Secure
                                </p>
                            </div>
                            {/* Expertise Section */}
                            <div className="mt-16 space-y-6">
                                <h2 className={`text-3xl font-bold ${logo.className}`}>
                                    Expertise
                                </h2>
                                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                                    <div className="flex flex-wrap gap-3">
                                        {['React', 'JavaScript', 'React', 'JavaScript', 'JavaScript', 'React'].map((skill, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Tools and Technologies Section */}
                            <div className="mt-8 space-y-6">
                                <h2 className={`text-3xl font-bold ${logo.className}`}>
                                    Tools and Technologies
                                </h2>
                                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                                    <div className="flex flex-wrap gap-3">
                                        {['React', 'JavaScript', 'React', 'JavaScript', 'JavaScript', 'React'].map((tool, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}