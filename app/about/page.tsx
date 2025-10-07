import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { logo, text } from "@/app/styles/fonts";
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="grid-background min-h-screen">
            <div className="container mx-auto px-10 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left Column - About Text */}
                    <div className="space-y-8">
                        <h1 className={`text-6xl font-bold ${logo.className}`}>
                            About
                        </h1>
                        <div className={`text-lg leading-relaxed ${text.className}`}>
                            <p>
                                I am a MERN Developer and a Solana Dev writing Secure I am a •MERN Developer. and a Solana Dev writing Secure I am a MERN Developer and a Solana Dev writing Secure I am a MERN Developer and a Solana Dev writing •Secure
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Profile Image */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="w-64 h-64 relative">
                            <div className="w-full h-full rounded-full bg-orange-400 flex items-center justify-center overflow-hidden">
                                <Image
                                    src="/images/pfp.png"
                                    alt="Profile"
                                    width={256}
                                    height={256}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
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
        <Footer />
    </div>
  );
}